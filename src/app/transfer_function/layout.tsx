import { classNames } from "@/utils/classNames";
import { Navbar } from "@nextui-org/react";
import Style from "./style.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classNames(Style.transaction, "p-6 flex flex-col gap-5")}>
      <Navbar title="Transfer"></Navbar>
      <div className="flex flex-col gap-4">
      {children}
      </div>
    </div>
  );
}
