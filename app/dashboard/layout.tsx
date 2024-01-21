"use client"
import React from "react"
import MainLayout from "@/components/basic/MainLayout"
import Header from "./components/Header"
import Asset from "./components/Asset"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname()
  return (
    <MainLayout className="">
      <div className="flex flex-col w-full justify-center items-center">
        <Header />
        <Asset />                
        <div className="flex flex-row gap-x-10 mt-12 mb-8 text-lg">
          <Link href={'/dashboard/holdings'}>
            <div className={`py-3 ${currentPath.includes("holdings") ? "text-white border-b-2 border-white" : "text-[#819DF580]"}`}>Holdings</div>
          </Link>
          <Link href={'/dashboard/transactions'}>
            <div className={`py-3 ${currentPath.includes("transactions") ? "text-white border-b-2 border-white" : "text-[#819DF580]"}`}>Transactions</div>
          </Link>
        </div>
        {children}
      </div>
    </MainLayout>
  )
}
