"use client"
import UniswapLogo from "./Icon/UniswapLogo"
import CCTPLogo from "./Icon/CCTPLogo"
import { Spinner } from "@nextui-org/react";
import { ITransactionRecord } from "@/api/types/transactionRecord";
import React, { ReactElement } from "react";
import { TransferStatus } from "@/api/types/transfer"
import { formatToShortenNumber } from "@/utils/format"
import CircleSuccess from "./Icon/CircleSuccess"
import TxInfoItem from "./TxInfoItem"
import TxActionItem from "./TxActionItem"

interface PropsType {
  extraData: ITransactionRecord[]
  status: TransferStatus
}

const fmn = formatToShortenNumber

interface StepMsg {
  title: string;
  desc: string;
  loading: boolean;
}

export default function IndirectTransferInfo(props: PropsType) {
  const stepMsg: StepMsg[] = [];

  const stepComps: ReactElement[] = [];
  const isPending = props.status == TransferStatus.PENDING;

  if (Array.isArray(props.extraData)) {
    const isOnly = props.extraData.length === 1;

    props.extraData.forEach((item, index) => {
      const tempComps: Array<ReactElement | null> = [];
      const isLast = index == props.extraData.length - 1

      if (item.type == "crossChain") {
        const { source_chain_amount, source_chain_name, target_chain_name, token_name, to_name, amount, fee } = item
        const { amount: fee_amount, token_name: fee_token_name } = fee

        tempComps.push(
          <TxInfoItem name="You" amount={source_chain_amount} token={token_name} />,
          <TxActionItem operation="Bridge" name="CCTP" icon={<CCTPLogo />} />,
          isOnly ? <TxInfoItem name={to_name} amount={amount} token={token_name} /> : null
        )


        if (isPending) stepMsg.push({
          title: `Transfer from ${source_chain_name} to ${target_chain_name} via CCTP`,
          desc: `transaction fees about ${fmn(fee_amount)} ${fee_token_name}`,
          loading: isLast
        }, {
          title: `${to_name} recevies ${fmn(amount)} ${token_name}`,
          desc: `transaction fees about ${fmn(fee_amount)} ${fee_token_name}`,
          loading: isLast
        })

      } else if (item.type == "swap") {
        const { swap_in, swap_out, source_token_name, target_token_name, fee } = item
        const { amount: fee_amount, token_name: fee_token_name } = fee

        tempComps.push(
          <TxInfoItem name="You" amount={swap_in} token={source_token_name} />,
          <TxActionItem name="Uniswap" operation="Swap" icon={<UniswapLogo />} />,
          <TxInfoItem name="You" amount={swap_out} token={target_token_name} />
        )

        if (isPending) stepMsg.push({
          title: `You send ${fmn(swap_in)} ${source_token_name} to Uniswap`,
          desc: `transaction fees about ${fmn(fee_amount)} ${fee_token_name}`,
          loading: isLast
        }, {
          title: `Swap ${source_token_name} to ${target_token_name} via Uniswap`,
          desc: `Estimated transaction fees: ${fmn(fee_amount)} ${fee_token_name}`,
          loading: isLast
        })

      } else if (item.type == "internalTransfer") {
        const { to_name, token_name, amount, fee, chain_name } = item
        const { amount: fee_amount, token_name: fee_token_name } = fee

        tempComps.push(
          isOnly ? <TxInfoItem name="You" amount={amount} token={token_name} /> : null,
          <TxActionItem name={chain_name} operation="Transfer" />,
          <TxInfoItem name={to_name} amount={amount} token={token_name} />
        )

        if (isPending) stepMsg.push({
          title: `You send ${fmn(amount)} ${token_name} to ${to_name}`,
          desc: `transaction fees about ${fmn(fee_amount)} ${fee_token_name}`,
          loading: isLast
        }, {
          title: `${to_name} recevies ${fmn(amount)} ${token_name}`,
          desc: `Estimated transaction fees: ${fmn(fee_amount)} ${fee_token_name}`,
          loading: isLast
        })
      }

      stepComps.push(...tempComps.filter((comp): comp is ReactElement => comp !== null))
    })
  }

  return (
    <>
      <div className={`flex justify-around`}>
        {stepComps.map((comp, index) => React.cloneElement(comp, { key: index }))}
      </div>
      {
        isPending && <div className="flex flex-col gap-y-3">
          {
            stepMsg.map(msg => {
              return <div
                key={msg.title}
                className="flex truncate justify-start px-3 w-full">
                {
                  msg.loading ?
                    <Spinner
                      classNames={{
                        wrapper: "w-5 h-5",
                        circle1: "border-b-white",
                        circle2: "border-b-white",
                      }}
                      size="sm"
                    />
                    : <CircleSuccess />
                }
                <div className="text-xs ml-5">
                  <div className="text-white font-bold">{msg.title}</div>
                  <div className="text-xxs">{msg.desc}</div>
                </div>
              </div>
            })
          }
        </div>
      }
    </>
  )
}
