"use client";
import React from "react";
import MainLayout from "@/components/basic/MainLayout";
import Header from "./components/Header";
import Asset from "./components/Asset";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAssetBalance } from "@/api/hold";
import { useClientFetchData } from "@/lib/hooks/useClientFetchData";
import { Response, AssetBalance } from "@/api/types/hold";
import FullScreenLoading from "@/components/FullScreenLoading";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const { isLoading, result } = useClientFetchData<Response<AssetBalance>>(
    getAssetBalance,
    {
      chainId: 1,
      address: "0x04Bf2c992376Eda3D597048dEc297255590131A3",
    }
  );
  return (
    <MainLayout className="">
      <div className="flex flex-col w-full justify-center items-center">
        <Header />
        {isLoading ? <FullScreenLoading /> : ""}
        <Asset
          balance={isLoading ? "0" : result.result.sumBalanceUSD}
          PastDay={isLoading ? "0" : result.result.pastDay}
          InTotal={isLoading ? "0" : result.result.inTotal}
        />
        <div className="flex flex-row gap-x-10 mt-12 mb-8 text-lg">
          <Link href={"/dashboard/holdings"}>
            <div
              className={`py-3 ${
                currentPath.includes("holdings")
                  ? "text-white border-b-2 border-white"
                  : "text-[#819DF580]"
              }`}
            >
              Holdings
            </div>
          </Link>
          <Link href={"/dashboard/transactions"}>
            <div
              className={`py-3 ${
                currentPath.includes("transactions")
                  ? "text-white border-b-2 border-white"
                  : "text-[#819DF580]"
              }`}
            >
              Transactions
            </div>
          </Link>
        </div>
        {children}
      </div>
    </MainLayout>
  );
}
