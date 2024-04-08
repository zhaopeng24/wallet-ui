import { ITransactionRecord } from "./transactionRecord";

export enum TransferStatus {
  PENDING = 1,
  SUCCESS = 2,
  FAILED = 3
}

export interface TransferItem {
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
  txType: number;
  status: TransferStatus;
}

export interface UserOperation {
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

export type ExtraDataType = ITransactionRecord[]
