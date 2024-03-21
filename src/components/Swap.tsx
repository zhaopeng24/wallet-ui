import { Arrow } from '@/components/Arrow'
import { Image } from '@nextui-org/react';

export default function Swap({
  swapIcon,
  swapName,
}: {
  swapIcon?: any;
  swapName?: string
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-poppins text-base font-bold leading-6 text-center">Swap</p>
      <div className="flex justify-center items-center ">
        <div className="h-1 border-b border-dashed border-white border-opacity-60 w-[20px]"></div>
        { swapIcon 
          ? swapIcon 
          : <Image className="w-25 mx-1" src="/imgs/uniswap.png" alt="Unisap" /> }
        
        <div className="h-1 border-b border-dashed border-white border-opacity-60 w-[20px] ml-1"></div>

        <svg
          className="rotate-0 mt-[3px] opacity-60"
          width="8"
          height="10"
          viewBox="0 0 8 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5L0.5 9.33013L0.5 0.669872L8 5Z" fill="white" />
        </svg>
      </div>
      <p className="font-poppins text-xs font-normal leading-6 text-white opacity-80">{swapName ? swapName : "Unisap"}</p>
    </div>
  );
}
