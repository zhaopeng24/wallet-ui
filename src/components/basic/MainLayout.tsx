import React from "react";
import { cn } from "@/utils/util";
import { Menu } from "../Menu";

export default function MainLayout({
  className,
  children,
  activeMenu,
  showMenu = true,
}: {
  className?: string;
  activeMenu?: string;
  showMenu?: boolean;
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
      {showMenu ? <Menu active={activeMenu} /> : null}
    </div>
  );
}
