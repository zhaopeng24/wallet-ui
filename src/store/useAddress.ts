import { Global } from "@/server/Global";
import { Config } from "@/server/config/Config";
import { create } from "zustand";

export interface IAddress {
  chainId: number;
  walletAddress: string;
}

interface IStore {
  mpcAddress: string;
  setMpcAddress: (address: string) => void;
  addressList: IAddress[];
  setAddressList: (data: IAddress[]) => void;
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
        localStorage.setItem("wallet_addressList", JSON.stringify(data));
        return {
          addressList: data,
        };
      });
    },
    currentAddress: null,
    setCurrentAddress: (chainId) => {
      set((store) => {
        const address = store.addressList.find(
          (item) => item.chainId === chainId
        )?.walletAddress;
        if (address) {
          Global.account.deployContractWalletIfNotExist(chainId, address);
          localStorage.setItem("wallet_currentAddress", address);
        } else {
          console.error("Address not found");
          localStorage.setItem("wallet_currentAddress", "");
        }
        return {
          currentAddress: address,
        };
      });
    },
  };
});
