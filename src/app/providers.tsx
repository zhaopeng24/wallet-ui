"use client";

import FullScreenLoading from "@/components/FullScreenLoading";
import { Global } from "@/server/Global";
import { Config } from "@/server/config/Config";
import { NextUIProvider } from "@nextui-org/react";
import { createContext, useCallback, useEffect, useState } from "react";
const polygonConfig = require("@/config/" +
  Config.DEFAULT_NETWORK.toLowerCase() +
  ".json");

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
    function init() {
      Config.init(JSON.stringify(polygonConfig)).then(async () => {
        await Global.changeAccountType(2);
      });
    }
    init();
  }, []);

  return (
    <NextUIProvider className="h-full">
      <LoadingContext.Provider value={{ loading, setLoading: setLoadingFn }}>
        {children}
        {loading ? <FullScreenLoading text={text} /> : null}
      </LoadingContext.Provider>
    </NextUIProvider>
  );
}
