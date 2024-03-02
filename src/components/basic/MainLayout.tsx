import React from "react";
import { cn } from "@/utils/util";
import { Menu } from "../Menu";

export default function MainLayout({
  className,
  children,
  activeMenu,
}: {
  className?: string;
  activeMenu?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "h-full overflow-hidden bg-[url(/imgs/bg.png)] bg-no-repeat flex flex-col",
        className
      )}
    >
      <div className="flex-1 overflow-auto">{children}</div>
      <Menu active={activeMenu} />
    </div>
  );
}
