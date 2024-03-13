"use client";
import { Avatar } from "@nextui-org/react";
import Token from "../components/Token";
import { IChain, ITokenBalance, useChains } from "@/store/useChains";
import { useMemo } from "react";

export default function ChooseToken() {
  const { chains, balances } = useChains((state) => state);
  const transferData = useMemo(() => {
    const address = sessionStorage.getItem("transfer_address") || "";
    const name = sessionStorage.getItem("transfer_name") || "";
    const chainId = sessionStorage.getItem("transfer_chainId");
    const findChain = chains.find((c: IChain) => c.ID === Number(chainId));
    const balance = balances.find((b) => b.chainName === findChain?.name);
    const _banlance = [];
    if (balance) {
      if (balance.NativeBalance) {
        _banlance.push(balance.NativeBalance);
      }
      if (balance.tokenBalance) {
        _banlance.push(...balance.tokenBalance);
      }
    }
    return {
      address,
      name,
      chain: findChain,
      tokens: findChain?.tokens,
      balances: _banlance,
    };
  }, []);

  function formattedAddr(address: string | null) {
    return address?.substring(0, 7) + "..." + address?.substring(38);
  }

  return (
    <div className="p-6">
      <div className="font-bold mb-2">Send To</div>
      <div className="flex justify-bettwen items-center">
        <div className="flex items-center ">
          <Avatar className="mr-4"></Avatar>
          <div className="flex flex-col">
            <p className="">{transferData.name || "NoName"}</p>
            <p className="">{formattedAddr(transferData.address)}</p>
          </div>
        </div>
      </div>
      <Token tokens={transferData.tokens} balances={transferData.balances} />
    </div>
  );
}
