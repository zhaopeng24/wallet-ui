"use client"
import React from "react"
import MainLayout from "@/components/basic/MainLayout"
import Header from "@/components/Header"
import { Menu } from "@/components/Menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname()
  return (
    <MainLayout className="">
      <Header title="My Transfer"></Header>
      <div className="flex flex-row justify-between gap-x-10  mb-8 text-lg">
        <Link href={'/transfer/active'}>
          <div className={`py-3 ${currentPath.includes("active") ? "text-white border-b-2 border-white" : "text-[#819DF580]"}`}>Active</div>
        </Link>
        <Link href={'/transfer/completed'}>
          <div className={`py-3 ${currentPath.includes("completed") ? "text-white border-b-2 border-white" : "text-[#819DF580]"}`}>Completed</div>
        </Link>
        <Link href={'/transfer/canceled'}>
          <div className={`py-3 ${currentPath.includes("canceled") ? "text-white border-b-2 border-white" : "text-[#819DF580]"}`}>Canceled</div>
        </Link>
      </div>
      <div className="flex flex-col w-full ">
        {children}
      </div>
      <div>
      <Menu/>
      </div>
    </MainLayout>
  )
}