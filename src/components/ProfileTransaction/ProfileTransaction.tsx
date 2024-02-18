import Image from 'next/image';
import ArrowUpSVG from "@/components/Icons/ArrowUp";
import ArrowDownSVG from "@/components/Icons/ArrowDown"

interface Props {
  amount: number;
  currency: string;
  name: string;
  profileImageSrc: string;
  transactionIn?: boolean;
}

const ProfileTransaction = ({ amount, currency, name, profileImageSrc, transactionIn }: Props) => {
  return(
    <div className="flex items-center justify-between px-4 py-1 bg-[#819DF5]/10 rounded-lg">
      <div className="flex h-9 items-center">
        <Image src={profileImageSrc} alt={name} width={36} height={36} className="rounded-full" />
        <span className="ml-2 text-xs">{name}</span>
      </div>
      <div className="flex items-center">
        {transactionIn ? <ArrowDownSVG /> : <ArrowUpSVG />}
        <span className={`text-xs ml-1 font-bold text-[#${transactionIn ? "87FF28" : "FF8266"}]`}>{amount} {currency}</span>
      </div>
    </div>
  )
}

export default ProfileTransaction;