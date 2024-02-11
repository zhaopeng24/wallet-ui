"use client"
import React, { useEffect, useState } from "react"
import MainLayout from "@/components/basic/MainLayout"
import Header from "./components/Header"
import Asset from "./components/Asset"
import { getAssetBalance, getV1Config } from "@/api/hold"
import { useClientFetchData } from "@/lib/hooks/useClientFetchData"
import { Response, AssetBalance } from "@/api/types/hold"
import FullScreenLoading from "@/components/FullScreenLoading"
import { Global } from "@/server/Global"
import { MPCManageAccount } from "@/server/account/MPCManageAccount"
import Holdings from "./components/Holdings"
import Transactions from "./components/Transactions"

export default function DashBoardLayout() {
  const [address, setAddress] = useState<string>()
  const account = Global.account as MPCManageAccount;
  const [currentChainId, setCurrentChainId] = useState<number>(1)

  const { isLoading, result, resetFetch } = useClientFetchData<Response<AssetBalance>>(getAssetBalance, {
    chainId: currentChainId,
    address: address ? address : ""
  })
  const { isLoading: isLoadingConfig, result: configResult } = useClientFetchData<any>(getV1Config, {})
  const [isHoldings, setIsHoldings] = useState<boolean>(true)

  useEffect(() => {
    const fetchAdd = async () => {
      // const address = await account.calcContractWalletAddress()
      console.log(`this is address ${address}`)
      setAddress("xxx")
    }
    fetchAdd()
    console.log(`current chain id is ${currentChainId}`)
  }, [account, isLoading])

  useEffect(() => {
    if (!isLoadingConfig) {
      // console.log(`this is config result ${JSON.stringify(configResult, null, 2)}`)
    }
  }, [isLoadingConfig, configResult])

  return (
    <MainLayout className="">
      {/* <div className="flex flex-col w-full justify-center items-center">
        <Header address={address} setChainId={resetFetch} />
        {isLoading ? <FullScreenLoading /> : ""}
        <Asset
          balance={isLoading ? "0" : result.result.sumBalanceUSD}
          PastDay={isLoading ? "0" : result.result.pastDay}
          InTotal={isLoading ? "0" : result.result.inTotal}
        />
        <div className="flex flex-row gap-x-10 mt-12 mb-8 text-lg">
          <div
            className={`py-3 hover:cursor-pointer ${isHoldings ? "text-white border-b-2 border-white" : "text-[#819DF580]"}`}
            onClick={() => {
              if (!isHoldings) {
                setIsHoldings(true)
              }
            }}
          >Holdings</div>

          <div
            className={`py-3 hover:cursor-pointer ${isHoldings ? "text-[#819DF580]" : "text-white border-b-2 border-white"}`}
            onClick={() => {
              if (isHoldings) {
                setIsHoldings(false)
              }
            }}
          >Transactions</div>
        </div>
        {isHoldings ?
          <Holdings
            tokenBalance={result.result.tokenBalance}
          /> :
          <Transactions />}
      </div> */}
      {address ?
        <div className="flex flex-col w-full justify-center items-center">
          <Header address={address} setChainId={resetFetch} setCurrentChainId={setCurrentChainId} />
          {isLoading ? <FullScreenLoading /> : ""}
          <Asset
            balance={isLoading ? "0" : result.result.sumBalanceUSD}
            PastDay={isLoading ? "0" : result.result.pastDay}
            InTotal={isLoading ? "0" : result.result.inTotal}
          />
          <div className="flex flex-row gap-x-10 mt-12 mb-8 text-lg">
            <div
              className={`py-3 hover:cursor-pointer ${isHoldings ? "text-white border-b-2 border-white" : "text-[#819DF580]"}`}
              onClick={() => {
                if (!isHoldings) {
                  setIsHoldings(true)
                }
              }}
            >Holdings</div>

            <div
              className={`py-3 hover:cursor-pointer ${isHoldings ? "text-[#819DF580]" : "text-white border-b-2 border-white"}`}
              onClick={() => {
                if (isHoldings) {
                  setIsHoldings(false)
                }
              }}
            >Transactions</div>
          </div>
          {/* {!isLoadingConfig ?
            <div>
              {isHoldings ?
                <Holdings
                  tokenBalance={result?.result.tokenBalance}
                  chains={configResult.result.chain}
                /> :
                <Transactions />
              }              
            </div> : <div></div>
          } */}
          {!isLoadingConfig && isHoldings ?
            <Holdings
              tokenBalance={result?.result.tokenBalance}
              chains={configResult.result.chain}
            /> :
            <Transactions
              chainId={currentChainId}
              address={address}
            />}
        </div>
        : <FullScreenLoading />}

    </MainLayout>
  )
}