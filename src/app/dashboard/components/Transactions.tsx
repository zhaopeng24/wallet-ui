import ArrowUpSVG from "@/components/Icons/ArrowUp";
import ArrowDownSVG from "@/components/Icons/ArrowDown";
import LinkArrowSVG from "@/components/Icons/LinkArrow";
import { useContext, useEffect, useState } from "react";
import { timeToNow } from "@/utils/days";
import { useAddress } from "@/store/useAddress";
import { useChains } from "@/store/useChains";
import { getTxDetail } from "@/api/assets";
import { LoadingContext } from "@/app/providers";

interface ITx {
  chainName: string;
  tokenId: number;
  tokenName: string;
  blockNumber: number;
  timeStamp: number;
  txHash: string;
  from: string;
  to: string;
  value: string;
  amount: string;
  currentAmount: string;
  status: number;
  gasFee: {
    tokenId: number;
    amount: string;
    usdValue: string;
  };
  transactionType: number;
  tradeDirection: number;
  extraInfo: string;
}

export default function Transactions() {
  const { currentAddress } = useAddress((state) => state);
  const { currentChain } = useChains((state) => state);
  const { setLoading } = useContext(LoadingContext);
  const [list, setList] = useState<ITx[]>([]);
  console.log(currentChain, currentAddress);

  useEffect(() => {
    async function init() {
      if (currentChain && currentAddress) {
        setLoading(true);
        const res = await getTxDetail(currentChain?.ID, currentAddress);
        const data = res.body.result || [];
        setList(data);
        setLoading(false);
      }
    }
    init();
  }, [currentAddress]);

  return (
    <div className="flex flex-col w-full justify-center items-center px-4 py-5 gap-y-8">
      {list.map((item, index) => (
        <TxItem
          key={index}
          amount={item.amount}
          currentAmount={item.currentAmount}
          status={item.status}
          tradeDirection={item.tradeDirection}
          timeStamp={item.timeStamp}
          chainName={item.chainName}
        />
      ))}
    </div>
  );
}
export interface ItemProps {
  amount: string | number;
  currentAmount: string;
  status: number;
  tradeDirection: number;
  timeStamp: number;
  chainName: string;
}
export function TxItem({
  amount,
  currentAmount,
  status,
  tradeDirection,
  timeStamp,
  chainName,
}: ItemProps) {
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row gap-x-3">
        <div className="flex justify-center items-center">
          {status === 1 && tradeDirection === 1 ? <ArrowUpSVG /> : ""}
          {status === 1 && tradeDirection === 2 ? <ArrowDownSVG /> : ""}
          {status === 0 ? <ArrowUpSVG /> : ""}
        </div>
        <div className="flex flex-col">
          <div>Sent on {chainName}</div>
          <div className="text-[#819DF580]">{timeToNow(timeStamp)}</div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg">
            {tradeDirection === 1 ? "-" : "+"} ${amount}{" "}
          </div>
          <div className="text-[#819DF580] text-sm">${currentAmount}</div>
        </div>
        <div className="">
          <LinkArrowSVG />
        </div>
      </div>
    </div>
  );
}
