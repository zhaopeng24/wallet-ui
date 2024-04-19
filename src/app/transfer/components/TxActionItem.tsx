import { poppins500 } from "@/public/fonts"
import SmallArrow from "./Icon/SmallArrow"
import React from "react";


export default function OperationDisplay({
  name,
  icon,
  operation
}: {
  name: string
  operation: string
  icon?: React.ReactNode
}) {

  return <div className="flex flex-col">
    <div className={`${poppins500.className} text-center text-xs leading-4 text-white translate-y-[-2px]`}>{operation}</div>
    <div className="mt-1">
      <div className="relative h-[28px] flex items-center justify-center">
        <SmallArrow />
        <div className="absolute left-[calc(50%-12.5px)] flex items-center inset-0">
          {icon || null}
        </div>
      </div>
    </div>
    <div className={`${poppins500.className} text-center text-[#FFFFFF80] text-xs`}>{name}</div>
  </div>
}
