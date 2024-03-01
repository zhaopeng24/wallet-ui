"use client";
import Header from "@/components/Header";
import DropArrow from "@/components/Icons/DropArrow";
import EthSVG from "@/components/Icons/EthSVG";
import { Popup } from "@/components/Popup";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function formattedAddr(address: string | null) {
  return address?.substring(0, 7) + "..." + address?.substring(38);
}

export function PersonComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const address = searchParams.get('address')
  const blockchain = searchParams.get('blockchain')
  const name = searchParams.get('name')

  function handleBack() {
    router.back();
  }
  return (
    <div className="flex justify-bettwen items-center">
      <div className="flex gap-4 items-center ">
        <Avatar className="" size="lg"></Avatar>
        <div className="flex flex-col">
          <p className="">{name ? name : 'Alice'}</p>
          <p className="">
            {formattedAddr(address)}
          </p>
        </div>
      </div>
      <div className="w-28 opacity-0">gap</div>
      <Button className=" bg-transparent" isIconOnly onClick={ handleBack }>
        X
      </Button>
    </div>
  );
}

function BlockChainItem({
  blockChainLogoUrl,
  blockChainLabel,
  clickEvent,
}: {
  blockChainLogoUrl: string;
  blockChainLabel: string;
  clickEvent: (blockchain) => void;
}) {
  return (
    <div
      className="flex justify-start cursor-pointer hover:bg-slate-500/30 rounded transition-all p-2"
      onClick={() => {
        clickEvent(blockChainLabel);
      }}
    >
      <div className="flex gap-2 items-center">
        <Avatar radius="sm" src={blockChainLogoUrl}></Avatar>
        <div className="">
          <p>{blockChainLabel}</p>
        </div>
      </div>
    </div>
  );
}

export function BlockchainPopUp({
  isPopup,
  pickBlockchain,
  clickEvent,
}: {
  isPopup: boolean;
  pickBlockchain: (blockchain) => void;
  clickEvent: (booleanValue) => void;
}) {
  return (
    <Popup position={"bottom"} open={isPopup}>
      <Header title="Blockchain"></Header>
      <div className=" overflow-y-auto h-[350px] max-h-[350px]">
        <div className="flex flex-col gap-4 p-4">
          <BlockChainItem
            clickEvent={(blockchain) => {
              pickBlockchain(blockchain);
              clickEvent(false);
            }}
            blockChainLogoUrl={""}
            blockChainLabel={"Ethereum"}
          />
          <BlockChainItem
            clickEvent={(blockchain) => {
              pickBlockchain(blockchain);
              clickEvent(false);
            }}
            blockChainLogoUrl={""}
            blockChainLabel={"Polkchat"}
          />
        </div>
      </div>
    </Popup>
  );
}

function InfoComponent({
  isPopup,
  clickEvent,
  addressValue,
  inputAddress,
  blockchainValue,
  pickBlockchain,
}: {
  isPopup: boolean;
  clickEvent: (booleanValue) => void;
  addressValue: string;
  inputAddress: (addr) => void;
  blockchainValue: string;
  pickBlockchain: (blockchain) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Address</p>
        <Input
          variant="bordered"
          label="Enter wallet address"
          value={addressValue}
          classNames={{ input: ["purpleBlue"] }}
          onChange={e => inputAddress(e.target.value)}
          isClearable
          onClear={() => inputAddress('')}
        ></Input>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Blockchain</p>
        <Input
          startContent={<EthSVG />}
          endContent={<DropArrow />}
          value={blockchainValue}
          variant="bordered"
          placeholder="Select the target chain"
          onClick={() => clickEvent(true)}
          className=" cursor-pointer"
        ></Input>
        <BlockchainPopUp isPopup={isPopup} pickBlockchain={pickBlockchain} clickEvent={clickEvent} />
      </div>
    </>
  );
}

export default function Sent() {
  const [isPopup, showPopup] = useState(false);
  const [addressValue, inputAddress] = useState<string>("");
  const [blockchainValue, pickBlockchain] = useState<string>("");
  const router = useRouter();
  function handleGo() {
    if(addressValue !== "" && blockchainValue !== "") {
      router.push(`/transfer_function/choosetoken?address=${addressValue}&blockchain=${blockchainValue}`)
    }
  }
  useEffect(() => {
    handleGo();
  },[addressValue, blockchainValue])
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-bold">Send To</h1>
      <InfoComponent
        isPopup={isPopup}
        clickEvent={(booleanValue) => {
          showPopup(booleanValue);
        }}
        addressValue={addressValue}
        inputAddress={(addr) => inputAddress(addr)}
        blockchainValue={blockchainValue}
        pickBlockchain={(blockchain) => pickBlockchain(blockchain)}
      />
    </div>
  );
}
