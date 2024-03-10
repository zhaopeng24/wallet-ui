import Link from "next/link";
import LinkArrowSVG from "@/components/Icons/LinkArrow";
import Image from "next/image";
import { IToken, ITokenBalance, useChains } from "@/store/useChains";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Holdings() {
  const { currentChain, currentBalance } = useChains((state) => state);

  const holdingList = useMemo(() => {
    if (currentBalance && currentChain) {
      const tokens = currentChain.tokens;
      const { NativeBalance, tokenBalance } = currentBalance;
      const list = [];
      if (NativeBalance) {
        const tokenId = NativeBalance.tokenId;
        const find = tokens.find((item) => item.tokenId === tokenId);
        if (find) {
          list.push({
            ...NativeBalance,
            ...find,
          });
        }
      }
      if (tokenBalance) {
        tokenBalance.forEach((item) => {
          const tokenId = item.tokenId;
          const find = tokens.find((item) => item.tokenId === tokenId);
          if (find) {
            list.push({
              ...item,
              ...find,
            });
          }
        });
      }
      return list;
    } else {
      return [];
    }
  }, [currentBalance]);
  console.log(holdingList);
  return (
    <div className="w-full px-2">
      {holdingList?.map((item, index) => (
        <Item key={index} data={item}></Item>
      ))}
    </div>
  );
}

function Item({ data }: { data: ITokenBalance & IToken }) {
  const { name, icon, amount, usdValue } = data;
  const route = useRouter();
  const formatValue = (s: string): string => {
    if (s.length > 5) {
      return s.slice(0, 5);
    }
    return s;
  };
  function handleToDetail() {
    route.push(`/holdings/${name}`);
  }
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center">
        <Image
          width={45}
          height={45}
          className="mr-4"
          src={icon}
          alt="chain logo"
        />
        <span className="text-md">{name}</span>
      </div>
      <div className="flex items-center" onClick={handleToDetail}>
        <div>
          <div>$ {formatValue(amount)} </div>
          <div className="text-sm text-[#819DF580]">
            {formatValue(usdValue)} usd
          </div>
        </div>
        <LinkArrowSVG />
      </div>
    </div>
  );
}
