import ArrowUpSVG from "@/components/Icons/ArrowUp"
import ArrowDownSVG from "@/components/Icons/ArrowDown"
import FailSVG from "@/components/Icons/FailSVG"
import LinkArrowSVG from "@/components/Icons/LinkArrow"
import { getTxList } from "@/api/hold"
import { useClientFetchData } from "@/lib/hooks/useClientFetchData"
import { useEffect } from "react"
import { timeToNow } from "@/utils/days"

export default function Transactions({ chainId, address }: { chainId: number, address: string }) {
  const { isLoading, result, resetFetch } = useClientFetchData<any>(getTxList, {
    chainId: chainId,
    address: address
  })
  const details = {
    "code": 200,
    "message": "success",
    "result": [
      {
        "chainName": "mumbai",
        "tokenId": 3,
        "tokenName": "USDC",
        "blockNumber": 43428574,
        "timeStamp": 1702264205,
        "txHash": "0xa25dff7553f28e4610abc22d2762f21cc0f21de7079a688368affe28b07befde",
        "from": "0x61f8a7b1634f3afd82c13f01b995187432e85eef",
        "to": "0x4eb8c2c39bf1baa0850bab49eef5a6d874e68b08",
        "value": "0.1",
        "amount": "0.10003",
        "currentAmount": "3.996162",
        "status": 1,
        "gasFee": {
          "tokenId": 3,
          "amount": "0.003141",
          "usdValue": "0"
        },
        "transactionType": 2,
        "tradeDirection": 1,
        "extraInfo": ""
      },
      {
        "chainName": "mumbai",
        "tokenId": 3,
        "tokenName": "USDC",
        "blockNumber": 43407695,
        "timeStamp": 1702216547,
        "txHash": "0xa284784e7b755b5c95c290083d5b164256a7f8bd6ca0657451fd091df2462f2a",
        "from": "0x61f8a7b1634f3afd82c13f01b995187432e85eef",
        "to": "0x4eb8c2c39bf1baa0850bab49eef5a6d874e68b08",
        "value": "0.1",
        "amount": "0.10003",
        "currentAmount": "3.999303",
        "status": 1,
        "gasFee": {
          "tokenId": 3,
          "amount": "0.001897",
          "usdValue": "0"
        },
        "transactionType": 2,
        "tradeDirection": 1,
        "extraInfo": ""
      },
      {
        "chainName": "mumbai",
        "tokenId": 3,
        "tokenName": "USDC",
        "blockNumber": 43404956,
        "timeStamp": 1702209731,
        "txHash": "0x1392f4c536091d40c2a2192644e74b0569672b485a3e98dd742f154fd075cb70",
        "from": "0x27a01491d86f3f3b3085a0ebe3f640387dbdb0ec",
        "to": "0x61f8a7b1634f3afd82c13f01b995187432e85eef",
        "value": "4",
        "amount": "4.0012",
        "currentAmount": "4.0012",
        "status": 1,
        "gasFee": null,
        "transactionType": 2,
        "tradeDirection": 2,
        "extraInfo": ""
      },
      {
        "chainName": "mumbai",
        "tokenId": 0,
        "tokenName": "",
        "blockNumber": 43404932,
        "timeStamp": 1702209681,
        "txHash": "0x3a187b5d2dce70f75061146ecb6296dab574680fb91b8662ebc74a9567f19287",
        "from": "0x57811fb5ea260740244fc81f421a5ca156c78060",
        "to": "",
        "value": "0",
        "amount": "0",
        "currentAmount": "0",
        "status": 1,
        "gasFee": null,
        "transactionType": 3,
        "tradeDirection": 1,
        "extraInfo": ""
      }
    ]
  }

  useEffect(() => {
    console.log(`switch chain id is ${chainId}`)
    resetFetch({
      chainId: chainId,
      address: address
    })
  }, [chainId])
  return (
    <div className="flex flex-col w-full justify-center items-center px-4 py-5 gap-y-8">
      {!isLoading ?
        details.result.map((item, index) => (
          <TxItem
            key={index}
            amount={item.amount}
            currentAmount={item.currentAmount}
            status={item.status}
            tradeDirection={item.tradeDirection}
            timeStamp={item.timeStamp}
            chainName={item.chainName}
          />
        ))
        :
        <div>Loading...</div>
      }

    </div>
  )
}
export interface ItemProps {
  amount: string | number
  currentAmount: string
  status: number
  tradeDirection: number
  timeStamp: number
  chainName: string
}
export function TxItem({ amount, currentAmount, status, tradeDirection, timeStamp, chainName }: ItemProps) {    
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row gap-x-3">
        <div className="flex justify-center items-center">
          {status === 1 && tradeDirection === 1 ? <ArrowUpSVG /> : ""}
          {status === 1 && tradeDirection === 2 ? <ArrowDownSVG /> : ""}
          {status === 0 ? <ArrowUpSVG /> : ""}
        </div>
        <div className="flex flex-col">
          <div>Sent on {chainName}</div>
          <div className="text-[#819DF580]">{timeToNow(timeStamp)}</div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg">{tradeDirection === 1 ? "-" : "+"} ${amount} </div>
          <div className="text-[#819DF580] text-sm">${currentAmount}</div>
        </div>
        <div className="">
          <LinkArrowSVG />
        </div>
      </div>
    </div>
  )
}