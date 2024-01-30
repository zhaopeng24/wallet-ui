interface AssetProps {
  balance: string
  income?: string
  PastDay: string
  InTotal: string
}

export default function Asset({ balance, PastDay, InTotal }: AssetProps) {
  return (
    <>
      <div className="mt-12 flex flex-col w-full px-6">
        <div className="flex flex-row gap-x-2">
          <div className="text-3xl">${balance ? balance.slice(0, 6) : '0'}</div>
          <div className=""><span>USD</span></div>
        </div>
        <div className="mt-2"><span className="text-[#6FFF62]">+$0 USD(+0%)</span> <span className="text-[#819DF580]"> Last Week</span></div>
        <div className="flex flex-row gap-x-4 mt-7">
          <div className="text-[#819DF580]">Past Day <span className="text-[#FF8266]">{parseFloat(PastDay) > 0 ? '+' : '-'} {PastDay.slice(0, 6)}</span></div>
          <div className="text-[#819DF580]">In Total <span className="text-[#6FFF62]">{parseFloat(InTotal) > 0 ? '+' : '-'} {InTotal.slice(0, 6)}</span></div>
        </div>
      </div>
    </>
  )
}