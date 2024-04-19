"use client"
import React from "react"
import MainLayout from "@/components/basic/MainLayout"
import Header from "@/components/Header"
import AddIcon from "./components/Icon/Add";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {

  return (
    <MainLayout>
      <Header
        title="My Transfer"
        showBack={true}
        rightBtn={<AddIcon onClick={() => console.log("trigger rightBtn")} />}
      />
      <div className="flex flex-col w-full ">
        {children}
      </div>
      <div>
      </div>
    </MainLayout >
  )
}
