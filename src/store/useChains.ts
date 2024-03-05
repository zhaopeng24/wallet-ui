import { Global } from "@/server/Global";
import { Config } from "@/server/config/Config";
import { create } from "zustand";

interface IToken {
  tokenId: number;
  name: string;
  type: number;
  address: string;
  decimal: number;
  icon: string;
}

export interface IChain {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  netWorkId: number;
  name: string;
  tokens: IToken[];
  icon: string;
  apiType: number;
  blockScanUrl: string;
  bundlerApi: string;
  createWalletApi: string;
  erc4337ContractAddress: {
    entrypoint: string;
    simpleAccountFactory: string;
    tokenPaymaster: {
      swt: string;
    };
  };
  produceBlock24h: number;
  rpcApi: string;
}

interface ITokenBalance {
  amount: string;
  chainId: number;
  owner: string;
  tokenId: number;
  usdValue: string;
}

export interface IBalance {
  chainName: string;
  inTotal: string;
  owner: string;
  pastDay: string;
  sumBalanceUSD: string;
  NativeBalance: ITokenBalance;
  tokenBalance: ITokenBalance[];
}

interface IStore {
  chains: IChain[];
  setChains: (data: IChain[]) => void;
  currentChain: IChain | null;
  setCurrentChain: (id: number) => void;
  balances: IBalance[];
  setBalances: (balances: IBalance[]) => void;
  currentBalance: IBalance | null;
}

export const useChains = create<IStore>((set) => ({
  chains: [],
  setChains: (data) => {
    set((store) => {
      // 把第一个设置为当前链
      const first = data[0];
      Config.flush(first);
      return {
        chains: data,
        currentChain: data[0],
      };
    });
  },
  currentChain: null,
  setCurrentChain: (id) => {
    set((store) => {
      return {
        currentChain: store.chains.find((item) => item.ID === id),
      };
    });
  },
  balances: [],
  setBalances: (balances) => {
    set((store) => {
      return {
        balances: balances,
        currentBalance: balances.find(
          (item) => item.chainName === store.currentChain?.name
        ),
      };
    });
  },
  currentBalance: null,
}));
