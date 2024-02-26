"use client"
import { usePathname } from "next/navigation"

export default function Page() {
  const chain = usePathname()  
  return (
    <>
      {chain}
    </>
  )
}