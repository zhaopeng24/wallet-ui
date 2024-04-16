"use client";
import React from "react";
import TransferCard from "./TransferCard";
import { ListboxItem, Listbox } from "@nextui-org/react";
import { TransferItem } from "@/api/types/transfer"

interface PropsType {
  listData: TransferItem[];
}

export default function CardList(props: PropsType) {

  return (
    <div className="w-full">
      <Listbox
        aria-label="Transfer List"
        classNames={{
          base: "w-full p-0",
          list: "py-2 px-3 max-h-[calc(100vh-175px)] overflow-scroll",
        }}
        emptyContent={null}
        items={props.listData}
      >
        {(item) => {
          return (
            <ListboxItem
              classNames={{
                wrapper: "flex justify-center",
              }}
              key={item.ID}
              textValue={item.txHash}
            >
              <TransferCard
                transferStatus={item.status}
                UpdatedAt={item.UpdatedAt}
                extraData={item.extraData}
              />
            </ListboxItem>
          );
        }}
      </Listbox>
    </div>
  );
}
