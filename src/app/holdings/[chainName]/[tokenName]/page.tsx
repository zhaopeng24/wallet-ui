"use client";
import { TxItem } from "@/app/dashboard/components/Transactions";
import BalanceItem from "../../components/BalanceItem";
import MainLayout from "@/components/basic/MainLayout";
import Header from "@/components/Header";
import { useMemo } from "react";
import { ITx } from "@/app/dashboard/page";
import { IToken, ITokenBalance } from "@/store/useChains";
import { formatValue } from "@/utils/format";

export default function Page(params: {
  params: { chainName: string; tokenName: string };
}) {
  console.log(params);

  const chainName = params.params.chainName;
  const TokenName = params.params.tokenName;

  const historyList = useMemo(() => {
    const list = sessionStorage.getItem("txList");
    let _list = [] as ITx[];
    if (list) {
      _list = JSON.parse(list);
    }
    return _list.filter(
      (item: any) =>
        item.chainName === chainName && item.tokenName === TokenName
    );
  }, []);

  const tokenDetail = useMemo(() => {
    let detail = sessionStorage.getItem("holding_token");
    if (detail) {
      return JSON.parse(detail) as ITokenBalance & IToken;
    }
    return undefined;
  }, []);

  return (
    <MainLayout showMenu={false}>
      <div className="flex flex-col h-full">
        <Header title={TokenName} showBack />
        <div className="px-6">
          <div className="flex flex-col justify-center items-center text-white">
            <div className="text-2xl font-bold mb-2">
              {tokenDetail?.amount ? formatValue(tokenDetail?.amount) : "0"}
            </div>
            <div className="text-xs">
              {tokenDetail?.usdValue ? formatValue(tokenDetail?.usdValue) : "0"}{" "}
              USD
            </div>
          </div>
          <div className="mt-10">
            <div className="text-2xl text-[#819DF5] font-bold">
              Balance Variation
            </div>
            <div className="flex flex-row justify-between">
              <BalanceItem name="Past Day" amount="99" value="110" />
              <BalanceItem name="Past Week" amount="99" value="110" />
              <BalanceItem name="Past Month" amount="99" value="110" />
            </div>
            <div className="text-2xl text-[#819DF5] font-bold mt-10">
              Historical transactions
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-6">
          <div className="flex flex-col gap-y-4 mt-4">
            {historyList.map((item, index) => (
              <TxItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
