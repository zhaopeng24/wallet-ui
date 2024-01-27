import Link from "next/link"
import EthSVG from "@/components/Icons/EthSVG"
import LinkArrowSVG from "@/components/Icons/LinkArrow"

interface ItemProps {
  icon: React.ReactNode
  chain: string
  symbol: string
  amount: string
  dollar: string
}

export default function Holdings() {
  const chains = [
    {
      icon: <EthSVG />,
      chain: "Ethereum",
      symbol: "ETH",
      amount: "100",
      dollar: "240000"
    }
  ]
  return (
    <div className="w-full px-8">

      {chains.map((item, index) => (
        <Item key={index}
          icon={item.icon}
          chain={item.chain}
          symbol={item.symbol}
          amount={item.amount}
          dollar={item.dollar}
        />
      ))}
    </div>
  )
}


function Item({ icon, chain, symbol, amount, dollar }: ItemProps) {
  return (
    <>
      <div className="flex flex-row justify-between py-5">
        <div className="flex flex-row gap-x-5">
          <div>{icon}</div>
          <div className="flex flex-col">
            <span className="text-md">{chain}</span>
            <span className="text-[#819DF580]">{symbol}</span>
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          <div>
            <div>$ {dollar} </div>
            <div className="text-sm text-[#819DF580]">{amount} {symbol}</div>
          </div>
          <div className="flex items-center justify-center">
            <Link href={`/holdings/${chain}`} className="w-full h-full">
              <LinkArrowSVG />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}