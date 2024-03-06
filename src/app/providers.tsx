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
      console.log("layout init!!!");
      setLoading(true);
      setText("loading...");
      const data = await getPackage();
      const { chain, common } = data.body.result;
      const { config } = common;
      // 参数初始化 重要！
      Config.init(config.url.mpc.wasm, config.url.storage);
      await Global.init();
      setChains(chain);
      setLoading(false);
      setInited(true);
      // 当前路由不是login页，且没有登录态，跳转到登录页
      if (!Global.authorization) {
        router.replace("/");
      }
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
