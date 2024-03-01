"use client";
import Header from "@/components/Header";
import DropArrow from "@/components/Icons/DropArrow";
import { Popup } from "@/components/Popup";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { BlockchainPopUp } from "./Sent";
import { useRouter } from "next/navigation";

function formattedAddr(address: string) {
  return address.substring(0, 7) + "..." + address.substring(38);
}

function ContactItem({
  avatarUrl,
  name,
  address,
  blockChain,
  blockChainAvatarUrl,
  clickEvent,
}: {
  avatarUrl: string;
  name: string;
  address: string;
  blockChain: string
  blockChainAvatarUrl: string;
  clickEvent: (address: string, blockchain: string, name: string) => void;
}) {
  return (
    <div
      className="flex justify-between items-center hover:cursor-pointer hover:bg-gray-500/30 transition-all rounded-lg p-2"
      onClick={() => clickEvent(address,blockChain,name)}
    >
      <Avatar size="lg" src={avatarUrl}></Avatar>
      <p>{name}</p>
      <p className="text-purpleBlue/50">{formattedAddr(address)}</p>
      <Avatar size="sm" src={blockChainAvatarUrl}></Avatar>
    </div>
  );
}

function ContactBox({
  clickEvent,
}: {
  clickEvent: (address: string, blockchain: string, name: string) => void;
}) {
  return (
    <div className=" max-h-[420px] overflow-y-auto">
      <div className="flex flex-col gap-y-4">
        <ContactItem
          avatarUrl={""}
          name={"Jaden"}
          address={"0x07de349505E858EEF3d1B797326f78eB0fE457b5"}
          blockChainAvatarUrl={""}
          clickEvent={clickEvent} blockChain={"Ethereum"}        />
      </div>
    </div>
  );
}

export default function Contact() {
  const [isPopup, showPopup] = useState(false);
  const [isBlockChainPopup, showBlockChainPopup] = useState(false);
  const [nameValue, updateNameValue] = useState<string>("");
  const [addressValue, updateAddressValue] = useState<string>("");
  const [blockchainValue, pickBlockchain] = useState<string>("");
  const router = useRouter();
  function hanldeGo(address: string, blockchain: string, name: string) {
    router.push(
      `transfer_function/choosetoken?address=${address}}&blockchain=${blockchain}&name=${name}`
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="font-bold">Or Choose Contact</h1>
        <button
          onClick={() => {
            console.log("31");
            showPopup(true);
          }}
        >
          +
        </button>
      </div>
      <ContactBox clickEvent={hanldeGo} />
      <Popup position={"bottom"} open={isPopup}>
        <Header title="Add Contact"></Header>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p>Name</p>
            <Input
              placeholder="Input the name"
              variant="bordered"
              width="lg"
              value={nameValue}
              onChange={(e) => updateNameValue(e.target.value)}
              isClearable
              onClear={() => updateNameValue("")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Address</p>
            <Input
              placeholder="Input the address"
              variant="bordered"
              width="lg"
              value={addressValue}
              onChange={(e) => updateAddressValue(e.target.value)}
              isClearable
              onClear={() => updateAddressValue("")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Blockchain</p>
            <Input
              placeholder="Pick the Blockchain"
              variant="bordered"
              endContent={<DropArrow />}
              value={blockchainValue}
              onClick={() => showBlockChainPopup(true)}
            />
            <BlockchainPopUp
              isPopup={isBlockChainPopup}
              pickBlockchain={pickBlockchain}
              clickEvent={() => {
                showBlockChainPopup(false);
              }}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              className="w-36 bg-[#819DF54D]"
              size="lg"
              onClick={() => {
                showPopup(!isPopup);
                updateNameValue("");
                updateAddressValue("");
              }}
            >
              Cancel
            </Button>
            <Button className="w-36 bg-[#456ADE]" size="lg">
              Add
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
