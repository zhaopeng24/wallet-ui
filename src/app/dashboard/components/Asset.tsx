import { cn } from "@/utils/util"
interface AssetProps {
  balance: string
  income?: string
  PastDay: string
  InTotal: string
}

export default function Asset({ balance, PastDay, InTotal }: AssetProps) {
  const isGreaterThanZero = (s: string): boolean => {
    const n = parseFloat(s)
    if (n >= 0) return true
    return false
  }
  return (
    <>
      <div className="mt-12 flex flex-col w-full px-6">
        <div className="flex flex-row gap-x-2">
          <div className="text-3xl">${balance ? balance.slice(0, 6) : '0'}</div>
          <div className=""><span>USD</span></div>
        </div>
        <div className="mt-2"><span className="text-[#6FFF62]">+$0 USD(+0%)</span> <span className="text-[#819DF580]"> Last Week</span></div>
        <div className="flex flex-row gap-x-4 mt-7">
          <div className="text-[#819DF580]">Past Day <span className={cn({
            'text-[#6FFF62]': isGreaterThanZero(PastDay),
            'text-[#FF8266]': !isGreaterThanZero(PastDay)
          })}>{isGreaterThanZero(PastDay) ? '+' : '-'} {PastDay.slice(0, 6)}</span></div>
          <div className="text-[#819DF580]">In Total <span className={cn({
            'text-[#6FFF62]': isGreaterThanZero(PastDay),
            'text-[#FF8266]': !isGreaterThanZero(PastDay)
          })}>{isGreaterThanZero(InTotal) ? '+' : '-'} {InTotal.slice(0, 6)}</span></div>
        </div>
      </div>
    </>
  )
}