"use client";

import { getPackage } from "@/api/assets";
import FullScreenLoading from "@/components/FullScreenLoading";
import { Global } from "@/server/Global";
import { Config } from "@/server/config/Config";
import { useChains } from "@/store/useChains";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useRef, useState } from "react";

interface ILoadingContextProps {
  loading: boolean;
  setLoading: (loading: boolean, text?: string) => void;
}
export const LoadingContext = createContext<ILoadingContextProps>({
  loading: false,
  setLoading: () => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("loading...");
  const [inited, setInited] = useState(false);
  const router = useRouter();

  const { setChains } = useChains((state) => state);

  // todo 把loading状态放到zustand里面
  const setLoadingFn = useCallback((loading: boolean, text?: string) => {
    setLoading(loading);
    if (loading) {
      if (text) {
        setText(text);
      }
    } else {
      setText("Loading...");
    }
  }, []);

  useEffect(() => {
    async function init() {
      setLoading(true);
      setText("loading...");
      // 获取公共配置
      const data = await getPackage();
      const { chain, common } = data.body.result;
      const { config } = common;

      Config.init(config.url.mpc.wasm, config.url.storage);
      await Global.init({
        mpcWasmUrl: Config.MPC_WASM_URL,
        rpcUrl: "",
        authorization: "",
        backendApiUrl: Config.BACKEND_API,
        storageApiUrl: Config.DECENTRALIZE_STORAGE_API,
      });

      setChains(chain);
      localStorage.setItem("wallet_chains", JSON.stringify(chain));
      setLoading(false);
      setInited(true);
      // 如果未登录，先到首页去
      // if (!Global.authorization) {
      //   router.replace("/");
      // }
    }
    init();
  }, []);

  return (
    <NextUIProvider className="h-full">
      <LoadingContext.Provider value={{ loading, setLoading: setLoadingFn }}>
        {inited ? children : null}
        {loading ? <FullScreenLoading text={text} /> : null}
      </LoadingContext.Provider>
    </NextUIProvider>
  );
}
