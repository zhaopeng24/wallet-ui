"use client"
import { useEffect, useState } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import TransferCardList from "./components/TransferCardList"
import { useClientFetchData } from "@/lib/hooks/useClientFetchData";
import { GetTransferList } from "@/api/transfer";
import { TransferItem } from "@/api/types/transfer";
import { useAddress } from "@/store/useAddress";

export default function TransferPage() {

  const [activeList, setActiveList] = useState<TransferItem[]>([]);
  const [completedList, setCompletedList] = useState<TransferItem[]>([]);
  const [canceledList, setCanceledList] = useState<TransferItem[]>([]);
  const { currentAddress } = useAddress(state => state)
  const { isLoading, result } = useClientFetchData<any>(() => GetTransferList(currentAddress!), {})

  useEffect(() => {
    if (!result) return
    const list: TransferItem[] = result.body.result;
    const [activeArr, completedArr, canceledArr]: TransferItem[][] = [[], [], []]

    list.forEach((item) => {
      if (item.status === 1) {
        activeArr.push(item)
      } else if (item.status === 2) {
        completedArr.push(item)
      } else if (item.status === 3) {
        canceledArr.push(item)
      }
    })

    setActiveList(activeArr);
    setCompletedList(completedArr);
    setCanceledList(canceledArr);
  }, [result])

  const chipBaseCls = isLoading ? "animate-pulse" : "group-data-[selected=true]:text-white group-data-[selected=true]:bg-[#456ADE] bg-[#819DF51A] text-[#819DF580]";

  return <div className="flex w-full flex-col">
    <Tabs
      aria-label="Options"
      color="primary"
      variant="underlined"
      classNames={{
        tabList: "gap-6 w-full relative rounded-none p-0 px-5 border-b border-[#819DF530]",
        cursor: "w-full bg-white",
        tab: "w-1/3 px-0 h-12 text-red",
        tabContent: "text-[#819DF580] group-data-[selected=true]:text-white",
        panel: "p-0"
      }}
    >
      <Tab
        key="Active"
        title={
          <div className="flex items-center space-x-2">
            <span>Active</span>
            <Chip
              size="sm"
              className="min-w-4 h-4 px-0 rounded-sm flex justify-center !ml-1"
              classNames={{
                base: chipBaseCls,
              }}>
              {isLoading ? "" : activeList.length}
            </Chip>
          </div>
        }
      >
        <TransferCardList listData={activeList} />
      </Tab>
      <Tab
        key="Completed"
        title={
          <div className="flex items-center space-x-2">
            <span>Completed</span>
            <Chip
              size="sm"
              className="min-w-4 h-4 px-0 rounded-sm flex justify-center !ml-1"
              classNames={{
                base: chipBaseCls,
              }}>
              {isLoading ? "" : completedList.length}
            </Chip>
          </div>
        }
      >
        <TransferCardList listData={completedList} />
      </Tab>
      <Tab
        key="Canceled"
        title={
          <div className="flex items-center space-x-2">
            <span>Canceled</span>
            <Chip
              size="sm"
              className="min-w-4 h-4 px-0 rounded-sm flex justify-center !ml-1"
              classNames={{
                base: chipBaseCls,
              }}>
              {isLoading ? "" : canceledList.length}
            </Chip>
          </div>
        }
      ></Tab >
    </Tabs >
  </div >
}
