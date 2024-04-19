import { poppins700, poppins500 } from "@/public/fonts"
import RightArrow from "./Icon/RightArrow";
import { formatAddress } from "@/utils/format";
import { IInternalTransferData } from "@/api/types/transactionRecord";

function DirectPersonalAddress(props: {
  name: string,
  address: string,
}) {

  return (
    <div className="flex-1 flex flex-col justify-around">
      <div className={`${poppins700.className} text-center text-lg leading-4 font-bold text-white`}>{props.name}</div>
      <div className={`${poppins500.className} rounded-xl py-1 px-2 bg-royalBlue text-center text-[#819DF5] text-xs flex items-center justify-center `}>{formatAddress(props.address)}</div>
    </div>
  )
}

export default function DirectTransferInfo({ extraData }: { extraData: [IInternalTransferData] }) {

  const [data] = extraData

  return (
    <>
      <div className="flex flex-row  justify-around">
        <DirectPersonalAddress name="You" address={data.from_address} />
        <div className="flex-2 flex flex-col" >
          <div className={`${poppins700.className} justify-center max-w-[8rem] flex text-sm leading-4 font-bold text-sky-500`}>
            <span className="truncate">{data.amount}</span>
            {data.token_name}
          </div>
          <div className="w-[8rem] h-6 flex justify-center items-center">
            <RightArrow />
          </div>
          <div className={`${poppins500.className} text-center text-[#819DF5]  text-xs`}>Direct Transfer</div>
        </div>
        <DirectPersonalAddress name={data.to_name} address={data.to_address} />
      </div>
    </>
  )
}
