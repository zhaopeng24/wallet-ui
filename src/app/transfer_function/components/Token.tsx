"use client";
import { Arrow } from "@/components/Arrow";
import Header from "@/components/Header";
import DropArrow from "@/components/Icons/DropArrow";
import EthSVG from "@/components/Icons/EthSVG";
import { Popup } from "@/components/Popup";
import { Avatar, Button, Input, Link, Select } from "@nextui-org/react";
import { useState } from "react";

export function TokenItem({
  tokenAvatarUrl,
  tokenName,
  tokenLabel,
  amount,
  price,
  isChosen,
  pickToken,
  clickEvent,
}: {
  tokenAvatarUrl: string;
  tokenName: string;
  tokenLabel: string;
  amount: string;
  price: string;
  isChosen: boolean;
  pickToken: (token) => void;
  clickEvent: () => void;
}) {
  return (
    <div
      className="flex justify-between items-center hover:bg-slate-500/30 cursor-pointer p-2 rounded-lg"
      style={{ color: isChosen ? "#4FAAEB" : "white" }}
      onClick={() => { 
        pickToken(tokenName)
        clickEvent()
      }}
    >
      <div className="flex gap-2 items-center">
        <Avatar radius="sm" src={tokenAvatarUrl}></Avatar>
        <div className="">
          <p>{tokenName}</p>
          <p>{tokenLabel}</p>
        </div>
      </div>

      <div className=" opacity-0">gap</div>
      <div>
        <p>{amount}</p>
        <p>${price}</p>
      </div>
    </div>
  );
}

export default function Token() {
  const [isPopup, showPopup] = useState<boolean>(false);
  const [token, pickToken] = useState<string>("");
  const [amount, updateAmount] = useState<string>("");
  return (
    <div className="flex flex-col gap-6">
      <h1>Token</h1>
      <Input
        variant="bordered"
        value={token}
        onClick={() => showPopup(true)}
        startContent={<EthSVG />}
        endContent={<DropArrow />}
      />
      <Input
        label="Amount"
        variant="bordered"
        value={amount}
        onChange={(e) => {
          updateAmount(e.target.value);
        }}
      ></Input>
      <div className="flex items-center gap-4">
        <p className="text-sm">$0 USD</p>
        <p className="text-sm">
          <b>Balance:</b>9.9909 ETH
        </p>
        <Button size="sm" className=" bg-mainPurpleBlue/30 text-mainPurpleBlue" >Transfer all</Button>
      </div>
      <Button className=" bg-[#456ADE]" size="lg" as={Link} href="confirmation">Next</Button>
      <Popup position={"bottom"} open={isPopup}>
        <Header title="Token" />
        <div className="overflow-y-auto h-[350px] max-h-[350px]">
          <div className="px-8 flex flex-col gap-5">
            <TokenItem
              tokenAvatarUrl={""}
              tokenName={"ETH"}
              tokenLabel={"Ethereum"}
              amount={"9.0807"}
              price={"4,498.65"}
              isChosen={true}
              clickEvent={() => showPopup(false)}
              pickToken={pickToken}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
}
