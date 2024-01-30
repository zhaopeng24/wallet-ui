export type Response<T> = {
  code: number 
  message: string
  result: T  
}

export type AssetBalance = {
  chainName: string,
  Owner: string,
  SumBalanceUSD: string,
  NativeBalance: Balance,
  TokenBalance: Balance[],
  PastDay: string,
  Intotal: string
}

export type Balance = {
  chainId: number,
  owner: string,
  tokenId: number,
  amount: string,
  usdValue: string,
}