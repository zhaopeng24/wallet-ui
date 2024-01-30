import ArrowUpSVG from "@/components/Icons/ArrowUp"
import LinkArrowSVG from "@/components/Icons/LinkArrow"
import Link from "next/link"

export default function Transactions() {
  return (
    <div className="flex flex-row w-full justify-between px-8 py-5">
      <Item />
    </div>
  )
}
interface ItemProps {
  txType: "Sent" | "Receive" | "Failed"
  target?: string
  amount: string | number
  balance: string | number
}
function Item() {
  return (
    <>
      <div className="flex flex-row gap-x-3">
        <div className="flex justify-center items-center">
          <ArrowUpSVG />
        </div>
        <div className="flex flex-col">
          <div>Sent to Uniswap</div>
          <div className="text-[#819DF580]">5 hours ago</div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg">- $503.12 </div>
          <div className="text-[#819DF580] text-sm">$999,999.000</div>
        </div>
        <div className="">
          <LinkArrowSVG />
        </div>
      </div>
    </>
  )
}