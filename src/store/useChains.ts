import { Global } from "@/server/Global";
import { Config } from "@/server/config/Config";
import { create } from "zustand";

export interface IToken {
  tokenId: number;
  name: string;
  type: number;
  fee: number;
  address: string;
  decimal: number;
  icon: string;
  tokenPaymasterAddress?: string;
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

export interface ITokenBalance {
  amount: string;
  chainId: number;
  owner: string;
  tokenId: number;
  usdValue: string;
}

interface pastDay {
  percentage: string;
  value: string;
}
export interface IBalance {
  chainName: string;
  inTotal: string;
  owner: string;
  pastDay: pastDay;
  sumBalanceUSD: string;
  NativeBalance: ITokenBalance;
  tokenBalance: ITokenBalance[];
  past1Hour: pastDay;
  past7Day: pastDay;
}

interface IStore {
  chains: IChain[];
  setChains: (data: IChain[]) => void;
  currentChain?: IChain;
  setCurrentChain: (id: number) => void;
  balances: IBalance[];
  setBalances: (balances: IBalance[]) => void;
  currentBalance?: IBalance;
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
  currentChain: undefined,
  setCurrentChain: (id) => {
    set((store) => {
      const current = store.chains.find((item) => item.ID === id);
      Global.account.setBlockchainRpc(current?.rpcApi!);
      return {
        currentChain: current,
        currentBalance:
          store.balances.find(
            (item) =>
              item.chainName ===
              store.chains.find((item) => item.ID === id)?.name
          ) || undefined,
      };
    });
  },
  balances: [],
  setBalances: (balances) => {
    set((store) => {
      return {
        balances: balances,
        currentBalance:
          balances.find(
            (item) => item.chainName === store.currentChain?.name
          ) || undefined,
      };
    });
  },
  currentBalance: undefined,
}));
