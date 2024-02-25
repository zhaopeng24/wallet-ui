import { poppins700, poppins600, poppins500 } from "@/public/fonts"
import Image from 'next/image';
import Arrow from "@/public/transfer/Arrow.svg"
import DirectPersonalAddress from "./DirectPersonalAddress";
import { ExtraDataType } from "../active/page"

export default function Progress({ extraData }: { extraData: ExtraDataType }) {
    return (
        <>
            <div className="flex flex-row  justify-around">
                <DirectPersonalAddress name="You" address={extraData.from} />
                <div className="flex-2 flex flex-col" >
                    <div className={`${poppins700.className} text-center text-sm leading-4 font-bold text-sky-500`}>{extraData.amount}USDT</div>
                    <div>
                        <Image src={Arrow} alt="Arrow" width={300} />
                    </div>
                    <div className={`${poppins500.className} text-center text-indigo-400  text-small`}>Direct Transfer</div>
                </div>
                <DirectPersonalAddress name={extraData.toName} address={extraData.to} />

            </div>
        </>
    )
}