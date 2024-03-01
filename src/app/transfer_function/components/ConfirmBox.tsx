"use client";

import { ArrowIcon } from "./arrow";
import { Avatar, Button, Divider } from "@nextui-org/react";
import DropArrow from "@/components/Icons/DropArrow";
import { useState } from "react";
import { Popup } from "@/components/Popup";
import Header from "@/components/Header";
import { TokenItem } from "./Token";

function formattedAddr(formatNum: number, address: string | null) {
  return address?.substring(0, formatNum) + "..." + address?.substring(38);
}

function AmountDetail({amount} : {amount:string}) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[#4FAAEB] font-mono">{amount} USDT</p>
      <ArrowIcon />
      <p className="text-[#819DF5] text-xs">Direct Transfer</p>
    </div>
  );
}

function Person({ name, address} : { name: string, address: string}) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-base p-1 font-mono">{name && true ? 'You' : 'other'}</p>
      <p className="bg-[#819DF54D] text-[#819DF5] rounded-full text-xs px-2 py-1">
        {formattedAddr(4, address)}
      </p>
    </div>
  );
}

function Tab({name, address, userAvatar ,amount, coinValue} : { name : string, address: string, userAvatar?:string, amount:string, coinValue:string}) {
  return (
    <div className="flex">
      <div className="flex gap-2">
        <Avatar src={userAvatar}></Avatar>
        <div>
          <p className=" font-bold">{name}</p>
          <p className="text-[#819DF5] text-sm">
            {formattedAddr(7, address)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-[#819DF5] font-semibold">{amount} USDT</p>
        <p className="text-white/30 text-sm">${coinValue}</p>
      </div>
    </div>
  );
}

function GapLine() {
  return (
    <div className="flex flex-col relative">
      <div className="rotate-90 absolute top-[-10px] left-[-50px] scale-50">
        <ArrowIcon />
      </div>
      <Divider />
    </div>
  );
}

function TransactionDetail() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="pb-2">From</p>
        </div>
        <Tab name={""} address={""} amount={""} coinValue={""} />
      </div>
      <GapLine />
      <div className="flex justify-between items-center">
        <div>
          <p className="p-1 pt-4">To</p>
        </div>
        <Tab name={""} address={""} amount={""} coinValue={""} />
      </div>
    </div>
  );
}

function AmountPlaneItem({
  title,
  isBold,
  amount,
  coinValue,
  needArrow,
  havePopup,
  clickEvent,
}: {
  title: string;
  isBold: boolean;
  amount: string;
  coinValue: string;
  needArrow: boolean;
  havePopup: boolean;
  clickEvent?: () => void;
}) {
  return (
    <div
      style={{ cursor: havePopup ? "pointer" : "default" }}
      onClick={clickEvent}
    >
      <div className="flex justify-between">
        <div className="flex">
          <p
            className="text-mainPurpleBlue"
            style={{ fontWeight: isBold ? 700 : "normal" }}
          >
            {title}
          </p>
          {needArrow && <DropArrow />}
        </div>
        <p style={{ fontWeight: isBold ? 700 : "normal" }}>{amount} USDT</p>
      </div>
      <div className="flex justify-end">
        <p className="text-sm text-white/50">${coinValue}</p>
      </div>
    </div>
  );
}

function AmountPlane() {
  const [isPopup, showPopup] = useState(false);
  const [token, pickToken] = useState<string>("");
  return (
    <div className="flex bg-[#819DF533] rounded-xl flex-col gap-5 p-5">
      <AmountPlaneItem
        title={"Transfer Amount"}
        isBold={false}
        needArrow={true}
        havePopup={false} amount={""} coinValue={""}      />
      <AmountPlaneItem
        title={"Gas Fee"}
        isBold={false}
        needArrow={true}
        havePopup={true}
        clickEvent={() => {
          console.log("107,");
          showPopup(true);
        } } amount={""} coinValue={""}      />
      <Divider />
      <AmountPlaneItem
        title={"Total Amount"}
        isBold={true}
        needArrow={false}
        havePopup={false} amount={""} coinValue={""}      />
      <Popup position="bottom" open={isPopup}>
        <Header title="Gas Fee"></Header>
        <TokenItem
          tokenAvatarUrl={""}
          tokenName={"ETH"}
          tokenLabel={"ETHereum"}
          amount={"23232"}
          price={"22323"}
          isChosen={false}
          pickToken={pickToken}
          clickEvent={() => showPopup(false)}
        />
      </Popup>
    </div>
  );
}

export default function ConfirmBox() {
  return (
    <div className="flex flex-col justify-between gap-y-5">
      <div className="flex items-center justify-center border-b-1 border-gray-500/30 px-20 pb-2">
        <Person name={""} address={""} />
        <AmountDetail amount={""} />
        <Person name={""} address={""} />
      </div>
      <div>
        <TransactionDetail />
      </div>
      <div>
        <AmountPlane />
      </div>
      <div className=" opacity-0 h-36">gap</div>
      <div className="">
        <Button className="w-full bg-[#456ADE] text-white px-4 py-3" size="lg">
          Confirm and Send
        </Button>
      </div>
    </div>
  );
}
