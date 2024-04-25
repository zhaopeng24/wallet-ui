export default function BalanceItem({ name, amount, value }: { name: string, amount: string|number, value: string|number }) {
  return (
    <>
      <div className="flex flex-row justify-between mt-3">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <div className="text-[#819DF580]">{name}</div>
          <div className="text-[#FF8266]">{value}</div>
          <div className="">${amount} USD</div>
        </div>
      </div>
    </>
  )
}