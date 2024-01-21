interface AssetProps {
  balance: string
  income: string
  pastday: string
  total: string
}

export default function Asset() {
  return (
    <>
      <div className="mt-12 flex flex-col w-full px-6">
        <div className="flex flex-row gap-x-2">
          <div className="text-3xl">$0</div>
          <div className=""><span>USD</span></div>
        </div>        
        <div className="mt-2"><span className="text-[#6FFF62]">+$0 USD(+0%)</span> <span className="text-[#819DF580]"> Last Week</span></div>
        <div className="flex flex-row gap-x-4 mt-7">
          <div className="text-[#819DF580]">Past Day <span className="text-[#FF8266]">-0</span></div>
          <div className="text-[#819DF580]">In Total <span className="text-[#6FFF62]">+0</span></div>
        </div>
      </div>
    </>
  )
}