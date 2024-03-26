export type BalanceInfo = {
  symbol: string;
  balance: string | number;
};

export type ChainBalances = {
  [chain: string]: BalanceInfo[];
};

export type CtxBalanceReq = {
  address: string;
  baseChain: string;
  balances: ChainBalances;
};

export enum ECategory {
  MSG = "msg",
  TRANSFER = "transferAbstraction",
  CROSSCHAIN = "crossChainAbstraction",
}

// ops 有三种类型 swap 链内 跨链
export enum EOps {
  SWAP = "msg",
  INTERNAL = "chain-internal-transfer",
  CROSSCHAIN = "cross-chain-transfer",
}
// export interface IConversations {
// 	summary: string;
// 	category?: ECategory;
// 	detail?: IResult;
// }

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
export interface IChatRes {
  // category: EMessage;
  category: ECategory;
  summary: string;
  detail: {
    reply: string;
    ops: IOps[];
  };
}

export interface MessageItemProps extends IChatRes {
  handleConfirmTx: () => void;
  handleConfirmCrossChain: () => void;
}
