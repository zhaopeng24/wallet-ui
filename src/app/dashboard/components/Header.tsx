"use client"
import Image from "next/image"
import ChainDropDown from "./ChainDropdown"

interface HeaderProps {
  userName?: string
  address?: string
}

export default function Header({ userName, address }: HeaderProps) {
  return (
    <div className="w-full flex justify-between mt-8">
      <div className="flex flex-grow gap-x-5 ml-6">
        <div className="flex items-center rounded-full">
          <Image src={'/imgs/user-icon.svg'} alt="user icon" width={24} height={24} />
        </div>

        <div className="flex flex-col">
          <div>New Friend</div>
          <div className="text-[#819DF580]">0x4F4aB...76e1B</div>
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-end mr-8">
        <ChainDropDown />
      </div>
    </div>
  )
} 