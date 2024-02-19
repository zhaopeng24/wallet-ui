export type Response<T> = {
  code: number;
  message: string;
  result: T;
};

export type AssetBalance = {
  chainName: string;
  owner: string;
  sumBalanceUSD: string;
  NativeBalance: Balance;
  tokenBalance: Balance[];
  pastDay: string;
  inTotal: string;
};

export type Balance = {
  chainId: number;
  owner: string;
  tokenId: number;
  amount: string;
  usdValue: string;
};

export type Config = {
  common: Common;
  chain: Chain;
};

export type Common = {
  ID: number;
  CreateAt: string;
  UpdateAt: string;
  DeletedAt: string | null;
  name: string;
  version: string;
  config: subConfig;
};

export type subConfig = {
  url: any;
  contractAddress: any;
};

export type Chain = {};
