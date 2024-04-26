"use client";
import Header from "@/components/Header";
import MainLayout from "@/components/basic/MainLayout";
import { Avatar } from "@nextui-org/react";
import Token from "../transfer_function/components/Token";
import { IBalance, IChain, ITokenBalance, useChains } from "@/store/useChains";
import { useMemo } from "react";
import { formatAddress } from "@/utils/format";

const crossChainSwt = (banlance: ITokenBalance[], balance: IBalance | undefined) => {
  if (!balance) return;
  const _banlance = [];
  if (balance.NativeBalance) _banlance.push(balance.NativeBalance);
  if (balance.tokenBalance) _banlance.push(...balance.tokenBalance);
  const currentSwt = _banlance.find(({tokenId}) => tokenId === 2);
  if (!currentSwt) return;
  const index = banlance.findIndex((b) => b.tokenId === 2);
  if (index!== -1) banlance.splice(index, 1, currentSwt);
}

export default function ChooseToken() {
  const { chains, balances, currentChain } = useChains((state) => state);
  const transferData = useMemo(() => {
    const address = sessionStorage.getItem("transfer_address") || "";
    const name = sessionStorage.getItem("transfer_name") || "";
    const chainId = sessionStorage.getItem("transfer_chainId");
    const findChain = chains.find((c: IChain) => c.ID === Number(chainId));
    const balance = balances.find((b) => b.chainName === findChain?.name);
    const isCrossChain = currentChain?.ID !== Number(chainId)
    const _banlance = [];
    if (balance) {
      if (balance.NativeBalance) {
        _banlance.push(balance.NativeBalance);
      }
      if (balance.tokenBalance) {
        _banlance.push(...balance.tokenBalance);
      }
    }
    // crossChain
    if (isCrossChain) crossChainSwt(_banlance, balances.find((b) => b.chainName === currentChain?.name))

    return {
      address,
      name,
      tokens: findChain?.tokens,
      balances: _banlance,
    };
  }, []);

  return (
    <MainLayout showMenu={false}>
      <Header title="Transfer" showBack></Header>
      <div className="p-6">
        <div className="font-bold mb-2">Send To</div>
        <div className="flex justify-bettwen items-center">
          <div className="flex items-center ">
            <Avatar className="mr-4" src="/imgs/icon.png"></Avatar>
            <div className="flex flex-col">
              <p className="">{transferData.name || "New Friend"}</p>
              <p className="">{formatAddress(transferData.address)}</p>
            </div>
          </div>
        </div>
        <Token tokens={transferData.tokens} balances={transferData.balances} />
      </div>
    </MainLayout>
  );
}
