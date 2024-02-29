"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Listbox,
  ListboxSection,
  ListboxItem,
} from "@nextui-org/react";
import Image from "next/image";
import MarkSVG from "@/components/Icons/MarkSVG";
import DropArrow from "@/components/Icons/DropArrow";

type Chain = {
  label: string;
  value: string;
  id: number;
  description: string;
  icon: string;
  index: number;
};

export default function App({
  setChainId,
  address,
  setCurrentChainId,
}: {
  setChainId: (param: any) => void;
  address: string;
  setCurrentChainId: (param: any) => void;
}) {
  const chains: Chain[] = [
    {
      label: "Mumbai",
      value: "mumbai",
      id: 1,
      description: "polygon testnet",
      icon: "/imgs/polygon.png",
      index: 0,
    },
    {
      label: "Polygon",
      value: "polygon",
      id: 3,
      description: "polygon mainnet",
      icon: "/imgs/polygon.png",
      index: 1,
    },
    {
      label: "Avalanche",
      value: "avalanche",
      id: 4,
      description: "avalanche mainnet",
      icon: "/imgs/ava.png",
      index: 2,
    },
    {
      label: "Fuji",
      value: "fuji",
      id: 2,
      description: "avalanche testnet",
      icon: "/imgs/ava.png",
      index: 3,
    },
  ];
  const [currentChain, setCurrentChain] = useState<Chain>(chains[0]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(isOpen);
  return (
    <div>
      <Button size="sm" onPress={onOpen} className="p-1 rounded-3xl">
        <Image
          src={currentChain.icon}
          alt="chain logo"
          width={20}
          height={20}
        />
        <div className="text-xs">{currentChain.label}</div>
        <DropArrow />
      </Button>
      <Modal
        isOpen={isOpen}
        placement="bottom"
        className="text-white"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex justify-center items-center text-base">
            Network
          </ModalHeader>
          <ModalBody className="px-4 pb-10">
            <Listbox
              items={chains}
              aria-label="Dynamic Actions"
              onAction={(key) => {
                const index = key as number;
                const target = chains[index];
                setCurrentChain(() => target);
                setChainId({
                  chainId: target.id,
                  address: address,
                });
                setCurrentChainId(target.id);
              }}
            >
              {(item) => (
                <ListboxItem key={item.index}>
                  <div className="flex items-center">
                    <div className="flex-1 flex items-center">
                      <Image
                        src={item.icon}
                        alt="logo"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <div
                        className={
                          item.value === currentChain.value
                            ? " text-[#819DF5]"
                            : ""
                        }
                      >
                        {item.label}
                      </div>
                    </div>
                    <div
                      className={`${
                        item.value === currentChain.value ? "" : "hidden"
                      }`}
                    >
                      <MarkSVG />
                    </div>
                  </div>
                </ListboxItem>
              )}
            </Listbox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
