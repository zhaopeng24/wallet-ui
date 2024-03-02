"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import Image from "next/image";
import MarkSVG from "@/components/Icons/MarkSVG";
import DropArrow from "@/components/Icons/DropArrow";
import { useChains } from "@/store/useChains";

interface IProps {
  address: string;
}
export default function ChainDropDown({ address }: IProps) {
  const { currentChain, chains, setCurrentChain } = useChains();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button size="sm" onClick={onOpen} className="p-1 rounded-3xl">
        <Image
          src={currentChain?.icon || "/imgs/chain.png"}
          alt="chain logo"
          width={20}
          height={20}
        />
        <div className="text-xs">{currentChain?.name}</div>
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
                setCurrentChain(+key);
              }}
            >
              {(item) => (
                <ListboxItem key={item.ID}>
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
                          item.ID === currentChain?.ID ? " text-[#819DF5]" : ""
                        }
                      >
                        {item.name}
                      </div>
                    </div>
                    <div
                      className={`${
                        item.ID === currentChain?.ID ? "" : "hidden"
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
