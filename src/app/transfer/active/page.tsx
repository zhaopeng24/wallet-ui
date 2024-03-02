"use client";
import React, { useEffect, useState } from "react";
import MyCard from "../components/MyCard";
import { GetTransferList } from "@/api/transfer";
interface TransferItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  chainId: number;
  blockHash: string;
  blockNumber: number;
  txHash: string;
  sender: string;
  entryPointAddress: string;
  userOperationHash: string;
  userOperation: UserOperation;
  userOperationJson: any | null; // 根据实际情况替换为更具体的类型
  extraData: ExtraDataType;
  txSource: number;
  status: number;
}

interface UserOperation {
  sender: string;
  nonce: string;
  initCode: string;
  callData: string;
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  paymasterAndData: string;
  signature: string;
}

export interface ExtraDataType {
  from: string;
  to: string;
  toName: string;
  amount: string;
  tokenId: string;
  isDirectTransfer: boolean;
}
export default function Page() {
  const [TransferList, setTransferList] = useState<TransferItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetTransferList();
        setTransferList(response.body.result);
        console.log(response, "666666*****");
      } catch (error) {
        console.error("Failed to fetch transfer list:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {TransferList?.map((item: TransferItem, index: number) => {
        return (
          <MyCard
            key={index}
            UpdatedAt={item.UpdatedAt}
            extraData={item.extraData}
          />
        );
      })}
    </div>
  );
}
