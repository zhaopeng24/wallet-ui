export type Response<T> = {
  code: number;
  message: string;
  result: T;
};

export type AssetBalance = {
  chainName: string;
  Owner: string;
  sumBalanceUSD: string;
  nativeBalance: Balance;
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
