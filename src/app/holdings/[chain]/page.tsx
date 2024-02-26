"use client"
import { usePathname, useRouter } from "next/navigation"
import { TxItem } from "@/app/dashboard/components/Transactions"
import ArrowSVG from "@/components/Icons/ArrowSvg"
import BalanceItem from "../components/BalanceItem"

export default function Page() {
  const path = usePathname()
  const router = useRouter()
  return (
    <div className="">
      <div className="flex flex-row justify-center p-5 relative items-center">
        <div className="absolute left-3 top-5">
          <ArrowSVG className="hover:cursor-pointer" onClick={() => router.back()} />
        </div>
        <div>{path.slice(10, path.length)}</div>
        <div></div>
      </div>
      <div className="flex flex-col justify-center items-center text-white">
        <div className="text-2xl">666.6</div>
        <div>$999 USD</div>
      </div>

      <div className="mt-10 px-3">
        <div>Balance Variation</div>
        <div className="flex flex-row justify-between">
          <BalanceItem
            name="Past Day"
            amount="99"
            value="110"
          />
          <BalanceItem
            name="Past Week"
            amount="99"
            value="110"
          />
          <BalanceItem
            name="Past Month"
            amount="99"
            value="110"
          />
        </div>

      </div>

      <div className="mt-10 px-3">
        <div>Historical transactions</div>
        <div className="flex flex-col gap-y-4 mt-4">
          <TxItem            
            amount="100"
            currentAmount="600"
            status={1}
            tradeDirection={1}
            timeStamp={1702264205}
            chainName="Uniswap"
          />
          <TxItem            
            amount="100"
            currentAmount="600"
            status={1}
            tradeDirection={1}
            timeStamp={1702264205}
            chainName="Uniswap"
          />
          <TxItem            
            amount="100"
            currentAmount="600"
            status={1}
            tradeDirection={1}
            timeStamp={1702264205}
            chainName="Uniswap"
          />
        </div>
      </div>
    </div>
  )
}
