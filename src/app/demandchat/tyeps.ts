import { EOps } from "@/api/types/demand";

export enum EMessage {
  MSG = "msg",
  SWAP = "swap",
  TRANSFER = "chain-internal-transfer",
  CROSSCHAIN = "crossChainAbstraction",
}

export interface IConversations {
  content: string;
  msgType?: EMessage;
  response?: IResult["detail"];
}

export interface MessageItemProps extends IConversations {
  handleConfirmTx: (response: IResult["detail"]) => void;
  handleConfirmCrossChain: (response: IResult["detail"]) => void;
}
interface IOps {
  type: EOps;
  raw_response: string;
  amount: string;
  receiver: string;
  source_chain_id: number;
  source_chain_name: string;
  token: string;
  target_chain_id: number;
  target_chain_name: string;
}
export interface IResult {
  // category: EMessage;
  category: String;
  summary: String;
  detail: {
    reply: string;
    ops: IOps[];
  };
}
export enum Ecategory {
  CROSSCHAIN = "crossChainAbstraction",
}
