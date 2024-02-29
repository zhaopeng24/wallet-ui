"use client";
import React, { useContext, useMemo, useState } from "react";
import MainLayout from "@/components/basic/MainLayout";
import Header from "./components/Header";
import Asset from "./components/Asset";
import { getAssetBalance, getV1Config } from "@/api/hold";
import { useClientFetchData } from "@/lib/hooks/useClientFetchData";
import { Response, AssetBalance } from "@/api/types/hold";
import Holdings from "./components/Holdings";
import Transactions from "./components/Transactions";
import { LoadingContext } from "../providers";
import { cn } from "@/utils/util";

export default function DashBoardLayout() {
  const { setLoading } = useContext(LoadingContext);
  const address = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("walletAddress")!;
    }
    return "";
  }, []);
  const [currentChainId, setCurrentChainId] = useState<number>(1);

  const {
    isLoading,
    result = {
      result: {
        sumBalanceUSD: "0",
        inTotal: "0",
        pastDay: "0",
        tokenBalance: [],
      },
    },
    resetFetch,
  } = useClientFetchData<Response<AssetBalance>>(getAssetBalance, {
    chainId: currentChainId,
    address: address ? address : "",
  });
  const {
    isLoading: isLoadingConfig,
    result: configResult = { result: { chain: [] } },
  } = useClientFetchData<any>(getV1Config, {});
  const [isHoldings, setIsHoldings] = useState<boolean>(true);

  return (
    <MainLayout activeMenu="dashboard">
      <div className="px-2">
        <Header
          address={address}
          setChainId={resetFetch}
          setCurrentChainId={setCurrentChainId}
        />
        <Asset
          balance={isLoading ? "0" : result?.result.sumBalanceUSD}
          PastDay={isLoading ? "0" : result.result.pastDay}
          InTotal={isLoading ? "0" : result?.result.inTotal}
        />
        <div className="flex mt-8 text-base border-b-1 border-b-slate-500 border-opacity-30">
          <div
            className="flex-1 text-center cursor-pointer"
            onClick={() => {
              if (!isHoldings) {
                setIsHoldings(true);
              }
            }}
          >
            <div
              className={cn(
                "mx-4 p-3 relative bottom-[-1px]",
                !isHoldings
                  ? "text-[#819DF580] p-3"
                  : "text-white border-b-2 border-white py-3"
              )}
            >
              Holdings
            </div>
          </div>
          <div
            className="flex-1 text-center cursor-pointer"
            onClick={() => {
              if (isHoldings) {
                setIsHoldings(false);
              }
            }}
          >
            <div
              className={cn(
                "mx-4 p-3 relative bottom-[-1px]",
                isHoldings
                  ? "text-[#819DF580] p-3"
                  : "text-white border-b-2 border-white py-3"
              )}
            >
              Transactions
            </div>
          </div>
        </div>
        {isHoldings ? (
          <Holdings
            tokenBalance={result?.result.tokenBalance || []}
            chains={configResult?.result.chain || []}
          />
        ) : (
          <Transactions chainId={currentChainId} address={address} />
        )}
      </div>
    </MainLayout>
  );
}
