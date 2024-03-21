"use client";
import { classNames } from "@/utils/classNames";
import Style from "./style.module.scss";
import { CrossDetail } from "./components/Detail";
import { Button } from "@nextui-org/button";
import MainLayout from "@/components/basic/MainLayout";
import Header from "@/components/Header";
import { useMemo } from "react";
import { ITx } from "../dashboard/page";
import dayjs from "dayjs";
import Person from "@/components/Person";
import Swap from "@/components/Swap";
import Bridge from "@/components/Bridge";



export default function TransactionDetail() {
  const transactionDetail = useMemo(() => {
    let _data = sessionStorage.getItem("transaction_detail") || '{}';
    if (_data) {
      return JSON.parse(_data) as ITx;
    }
    return undefined;
  }, []);

  // if (!transactionDetail) {
  //   return (
  //     <MainLayout showMenu={false}>
  //       <div className="flex flex-col h-full">
  //         <Header title="Transaction Detail" showBack />
  //         <div className="flex-1 flex justify-center items-center font-bold text-base">
  //           Please select a transaction
  //         </div>
  //       </div>
  //     </MainLayout>
  //   );
  // }

  const time = transactionDetail?.timeStamp
    ? dayjs(transactionDetail?.timeStamp * 1000).toLocaleString()
    : "";

  const handleConfirmSend = () => {
    console.log('handleConfirmSend')
  };

  return (
    <MainLayout showMenu={false}>
      <div className="flex flex-col h-full">
        <Header title="Best Solution" showBack />
        <div className={classNames(Style.transaction)}>
          <div className="">
            <div className="font-poppins text-lg font-bold leading-4 text-[#4FAAEB] mb-6">Swap then send cross-chain </div>
            <div className="flex items-center justify-between px-4 pb-4 gap-4">
              {/* <Person name={"You"} tokenName={"source_token"} amount={"swap_in"} /> */}
                <Person name={"You"} tokenName={"ETH"} amount={"0.5"} />
                <Swap />
                <Person name={"You"} tokenName={"USDC"} amount={"1000"} />
                <Bridge />
                <Person name={"Alice"} tokenName={"USDC"} amount={"1000"} />
            </div>
            <div className="flex flex-row  justify-between gap-2 text-[13px] mx-4">
              <div>
                Est. fees: 
                <span className="font-semibold"> $0.53~$0.76</span>
              </div>
              <div>
                Est. time:  
                <span className="font-semibold"> 10s~30s</span>
              </div>
            </div>
          </div>
          <div className="flex-1 my-8">
            <CrossDetail></CrossDetail>
            {/* <SuccessDetail></SuccessDetail> */}
          </div>
          <div className='w-auto flex mb-10'>
            <Button
              fullWidth
              size="lg"
              radius='md'
              className='bg-[#456ADE] text-white'
              onClick={handleConfirmSend}
            >
              Confirm and Send
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
