"use client"
import Image from "next/image"
import ChainDropDown from "./ChainDropdown"

interface HeaderProps {
  userName?: string
  address: string
  setChainId: (params: any) => void
  setCurrentChainId: (params: any) => void
}

export default function Header({ userName, address, setChainId, setCurrentChainId }: HeaderProps) {
  const formatAddress = (s: string) => {
    if (s) {
      const head = s.slice(0, 4)
      const tail = s.slice(s.length - 4, s.length)
      return head + "..." + tail
    }
    return "..."
  }
  return (
    <div className="w-full flex justify-between mt-8">
      <div className="flex flex-grow gap-x-5 ml-6">
        <div className="flex items-center rounded-full">
          <Image src={'/imgs/user-icon.svg'} alt="user icon" width={24} height={24} />
        </div>

        <div className="flex flex-col">
          <div>New Friend</div>
          <div className="text-[#819DF580]">{formatAddress(address)}</div>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-end mr-8">
        <ChainDropDown 
        setChainId={setChainId} 
        address={address}
        setCurrentChainId={setCurrentChainId}
        />
      </div>
    </div>
  )
} 