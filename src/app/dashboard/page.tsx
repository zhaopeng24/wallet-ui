"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import MainLayout from "@/components/basic/MainLayout";
import Header from "./components/Header";
import Asset from "./components/Asset";
import { useClientFetchData } from "@/lib/hooks/useClientFetchData";
import { Response, AssetBalance } from "@/api/types/hold";
import Holdings from "./components/Holdings";
import Transactions from "./components/Transactions";
import { cn } from "@/utils/util";
import { IBalance, useChains } from "@/store/useChains";
import { useAddress } from "@/store/useAddress";
import { LoadingContext } from "../providers";
import { getBalance } from "@/api/assets";

export default function DashBoardLayout() {
  const { currentChain, chains, setBalances, currentBalance } = useChains();
  const { currentAddress, addressList } = useAddress();
  const { setLoading } = useContext(LoadingContext);

  console.log(currentChain, currentAddress, currentBalance);

  function setCurrentChainId() {}
  function resetFetch() {}

  const [isHoldings, setIsHoldings] = useState<boolean>(true);

  async function getChainBalance(chainId: number, address: string) {
    const res = await getBalance(chainId, address);
    const data = res.body.result as IBalance;
    return data;
  }
  useEffect(() => {
    async function init() {
      // todo 获取每个链的余额
      const arr = [];
      setLoading(true);
      for (let i = 0; i < chains.length; i++) {
        const chain = chains[i];
        const address = addressList.find(
          (item) => item.chainId === chain.ID
        )?.walletAddress;
        if (!address) {
          continue;
        }
        const balance = await getChainBalance(chains[i].ID, address);
        arr.push(balance);
        console.log(balance);
      }
      setBalances(arr);
      setLoading(false);
    }
    init();
  }, []);

  return (
    <MainLayout activeMenu="dashboard">
      <div className="px-2">
        <Header
          address={currentAddress!}
          setChainId={resetFetch}
          setCurrentChainId={setCurrentChainId}
        />
        <Asset
          balance={currentBalance?.sumBalanceUSD || "0"}
          PastDay={currentBalance?.pastDay || "0"}
          InTotal={currentBalance?.inTotal || "0"}
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
            tokenBalance={currentBalance?.tokenBalance || []}
            chains={chains}
          />
        ) : (
          <Transactions chainId={currentChain?.ID} address={currentAddress} />
        )}
      </div>
    </MainLayout>
  );
}
