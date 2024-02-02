import { poppins700, poppins600, poppins500 } from "@/public/fonts"
import Image from 'next/image';
import DashedArrow from "@/public/transfer/DashedArrow.svg"
import UniswapLogo from "@/public/transfer/UniswapLogo.svg"
export default function Progress() {
    return (
        <>
            <div className="flex flex-row gap-x-5">
                <div className="flex flex-col">
                    <div className={`${poppins700.className} text-center text-sm leading-4 font-bold text-white`}>You</div>
                    <div className={`${poppins600.className} text-center text-sky-600 text-lg`}>0.5</div>
                    <div className={`${poppins500.className} text-center text-white text-small`}>ETH</div>
                </div>
                <div className="flex flex-col">
                    <div className={`${poppins700.className} text-center text-sm leading-4 font-bold text-white`}>Swap</div>
                    <div>
                        <div className="relative w-[60px] h-[28px]">
                            <div className="absolute top-3 inset-0 z-10">
                                <Image src={DashedArrow} alt="DashedArrow" />
                            </div>
                            <div className="absolute left-5 inset-0">
                                <Image src={UniswapLogo} alt="UniswapLogo" />
                            </div>
                        </div>
                    </div>
                    <div className={`${poppins500.className} text-white text-small`}>Uniswap</div>
                </div>
                <div className="flex flex-col">
                    <div className={`${poppins700.className} text-center text-sm leading-4 font-bold text-white`}>You</div>
                    <div className={`${poppins600.className} text-center text-sky-600 text-lg`}>1001</div>
                    <div className={`${poppins500.className} text-center text-white text-small`}>USDC</div>
                </div>
                <div className="flex flex-col">
                    <div className={`${poppins700.className} text-center text-sm leading-4 font-bold text-white`}>Bridge</div>
                    <div>
                        <div className="relative w-[60px] h-[28px]">
                            <div className="absolute top-3 inset-0 z-10">
                                <Image src={DashedArrow} alt="DashedArrow" />
                            </div>
                            <div className="absolute left-5 inset-0">
                                <Image src={UniswapLogo} alt="UniswapLogo" />
                            </div>
                        </div>
                    </div>
                    <div className={`${poppins500.className} text-center text-white text-small`}>CCTP</div>
                </div>
                <div className="flex flex-col">
                    <div className={`${poppins700.className} text-center text-sm leading-4 font-bold text-white`}>Alice</div>
                    <div className={`${poppins600.className} text-center text-sky-600 text-lg`}>1000</div>
                    <div className={`${poppins500.className} text-center text-white text-small`}>USDC</div>
                </div>
            </div>
        </>
    )
}