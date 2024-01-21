import React from "react"
import { cn } from "@/utils/util"

export default function MainLayout({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn("container h-full bg-[url(/imgs/bg.png)] bg-no-repeat px-4 py-8", className)}>
      {children}
    </div>
  )
}
