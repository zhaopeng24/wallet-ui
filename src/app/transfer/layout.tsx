"use client"
import React from "react"
import MainLayout from "@/components/basic/MainLayout"
import Header from "@/components/Header"
import AddIcon from "./components/Icon/Add";
import { useRouter } from "next/navigation";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <MainLayout>
      <Header
        title="My Transfer"
        showBack={true}
        rightBtn={<AddIcon onClick={() => router.push("/transfer_function")} />}
      />
      <div className="flex flex-col w-full ">
        {children}
      </div>
      <div>
      </div>
    </MainLayout >
  )
}
