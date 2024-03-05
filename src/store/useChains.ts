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

interface IStore {
  address: string;
  chains: IChain[];
  setChains: (data: IChain[]) => void;
  currentChain: IChain | null;
  setCurrentChain: (id: number) => void;
}

export const useChains = create<IStore>((set) => ({
  address: "",
  chains: [],
  setChains: (data) => {
    set((store) => {
      // 把第一个设置为当前链
      const first = data[0];
      Config.flush(first);
      // todo 遍历每个chain生成地址map
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
}));
