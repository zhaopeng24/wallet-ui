import Link from "next/link";
import LinkArrowSVG from "@/components/Icons/LinkArrow";
import Image from "next/image";

interface ItemProps {
  chain: string;
  symbol: string;
  amount: string;
  usdValue: string;
  children: React.ReactNode;
}

export default function Holdings({
  tokenBalance,
  chains,
}: {
  tokenBalance: any[];
  chains?: any[];
}) {
  const chainList = chains?.reduce((acc, chain) => {
    acc[chain.ID] = chain.tokens.reduce((tokenAcc, token) => {
      tokenAcc[token.tokenId] = {
        name: token.name,
        icon: token.icon,
      };
      return tokenAcc;
    }, {} as { [key: number]: any });
    return acc;
  }, {});
  return (
    <div className="w-full px-2">
      {tokenBalance?.map((item, index) => (
        <Item
          key={index}
          chain={chainList[item.chainId as number][item.tokenId as number].name}
          symbol={"---"}
          amount={item.amount}
          usdValue={item.usdValue}
        >
          <Image
            width={45}
            height={45}
            className="mr-4"
            src={
              chainList[item.chainId as number][item.tokenId as number]?.icon
            }
            alt="chain logo"
          />
        </Item>
      ))}
    </div>
  );
}

function Item({ chain, symbol, amount, usdValue, children }: ItemProps) {
  const formatValue = (s: string): string => {
    if (s.length > 5) {
      return s.slice(0, 5);
    }
    return s;
  };
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex">
        {children}
        <div className="flex flex-col">
          <span className="text-md">{chain}</span>
          <span className="text-[#819DF580]">{symbol}</span>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <div>$ {formatValue(usdValue)} </div>
          <div className="text-sm text-[#819DF580]">
            {formatValue(amount)} usd
          </div>
        </div>
        <Link href={`/holdings/${chain}`}>
          <LinkArrowSVG />
        </Link>
      </div>
    </div>
  );
}
