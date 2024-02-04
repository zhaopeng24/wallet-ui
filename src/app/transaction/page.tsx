"use client";
import { classNames } from "@/utils/classNames";
import Style from "./style.module.scss";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import { TransactionMain } from "./components/TransactionMain";
import { SuccessCrossDetail } from "./components/Detail";
import { Bridge } from "@/components/Bridge";
import { useState } from "react";

const ViewOnBrower = () => {
  return (
    <div className="text-[#819DF5] cursor-pointer flex flex-row items-center">
      <div> View on browser</div>
      <img className="w-6 pt-[2px]" src={"/imgs/arrow-left-back.png"} />
    </div>
  );
};

const TransactionDetail = () => {
  return (
    <div className={classNames("py-4 px-8")}>
      <TransactionMain></TransactionMain>
      <div className="flex-1">
        <div className="my-5">
          {/* <SuccessCrossDetail></SuccessCrossDetail> */}
          <SuccessCrossDetail></SuccessCrossDetail>
          {/* <SuccessDetail></SuccessDetail> */}
        </div>
        <ViewOnBrower></ViewOnBrower>
      </div>
    </div>
  );
};

export default function Transaction() {
  const [open,setOpen] = useState(false);
  return (
    <div className={classNames(Style.transaction)}>
      <Navbar title={"Transaction History"}></Navbar>
      <TransactionDetail></TransactionDetail>
      <Menu></Menu>
      <Bridge open={open} onClose={()=>setOpen(false)}></Bridge>
      <button onClick={()=>setOpen(true)}>xxx</button>
    </div>
  );
}
