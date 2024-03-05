import { Global } from "@/server/Global";
import { Config } from "@/server/config/Config";
import { create } from "zustand";

interface Address {
  chainId: number;
  walletAddress: string;
}

interface IStore {
  mpcAddress: string;
  setMpcAddress: (address: string) => void;
  addressList: Address[];
  setAddressList: (data: Address[]) => void;
  currentAddress: string | null;
  setCurrentAddress: (chainId: number) => void;
}

export const useAddress = create<IStore>((set) => {
  return {
    mpcAddress: "",
    setMpcAddress: (address: string) => {
      set(() => {
        return {
          mpcAddress: address,
        };
      });
    },
    addressList: [],
    setAddressList: (data) => {
      set(() => {
        return {
          addressList: data,
        };
      });
    },
    currentAddress: null,
    setCurrentAddress: (chainId) => {
      set((store) => {
        return {
          currentAddress: store.addressList.find(
            (item) => item.chainId === chainId
          )?.walletAddress,
        };
      });
    },
  };
});
