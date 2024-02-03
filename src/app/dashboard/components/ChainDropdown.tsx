"use client"
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import Image from "next/image";
import MarkSVG from "@/components/Icons/MarkSVG";

type Chain = {
  label: string
  value: string
  id: string
  description: string
  icon: string  
  index: number
}

export default function App() {
  const chains: Chain[] = [
    { label: "Mumbai", value: "mumbai", id: "1", description: "polygon testnet", icon: "/imgs/polygon.png", index: 0 },
    { label: "Polygon", value: "polygon", id: "?", description: "polygon mainnet", icon: "/imgs/polygon.png", index: 1 },
    { label: "Avalanche", value: "avalanche", id: "?", description: "avalanche mainnet", icon: "/imgs/ava.png", index: 2 },
    { label: "Fuji", value: "fuji", id: "?", description: "avalanche testnet", icon: "/imgs/ava.png", index: 3 },
  ];
  const [currentChain, setCurrentChain] = useState<Chain>(chains[0]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();  
  const handleOnAction = (key: string) => {
    console.log(`selected value -> ${key}`)
  }
  return (
    <>
      <Button onPress={onOpen} className="max-w-fit">
        <Image src={currentChain.icon} alt="chain logo" width={20} height={20} />
        <div>{currentChain.label}</div>
      </Button>
      <Modal
        isOpen={isOpen}
        placement="bottom"
        onOpenChange={onOpenChange}
        className="text-white"
      >
        <ModalContent>
          <ModalHeader className="flex justify-center items-center">
            Network
          </ModalHeader>
          <ModalBody className="">
            <Listbox
              items={chains}
              aria-label="Dynamic Actions"
              onAction={(key) => {                
                const index = key as number
                const target = chains[index]                
                setCurrentChain(() => target)                
              }}
            >
              {(item) => (
                <ListboxItem
                  key={item.index}
                >
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                      <Image src={item.icon} alt="logo" width={20} height={20} />
                      <div>{item.label}</div>
                    </div>
                    <div className={`${item.value === currentChain.value ? "" : "hidden"}`}><MarkSVG /></div>
                  </div>
                </ListboxItem>
              )}
            </Listbox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );
}