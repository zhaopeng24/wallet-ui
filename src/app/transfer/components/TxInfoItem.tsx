import { poppins700, poppins600, poppins500 } from "@/public/fonts"
import { formatAddress, formatToShortenNumber } from "@/utils/format"

export default function TxInfoItem({
  name,
  amount,
  token,
  address
}: {
  name: string
  amount?: string
  token?: string
  address?: string
}) {

  return <div className="flex flex-col">
    <div className={`${poppins700.className} text-center min-h-4 text-sm leading-4 font-bold text-white`}>{name || "NoName"}</div>
    {
      amount &&
      <div className={`${poppins600.className} mt-1 overflow-hidden text-lg grid place-items-center text-[#8197F5] min-h-7`}>{formatToShortenNumber(amount)}</div>
    }
    {
      token &&
      <div className={`${poppins500.className} text-center text-[#FFFFFF80] text-xs`}>{token}</div>
    }
    {
      address &&
      <div className={`${poppins500.className} rounded-xl py-1 px-2 bg-royalBlue text-center text-[#819DF5] text-xs flex items-center justify-center `}>{formatAddress(address)}</div>
    }
  </div>
}
