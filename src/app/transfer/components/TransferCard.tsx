import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from "@nextui-org/react";
import IndirectTransferInfo from "./IndirectTransferInfo";
import DirectTransferInfo from "./DirectTransferInfo";
import { ExtraDataType, TransferStatus } from "@/api/types/transfer"
import { IInternalTransferData, ITransactionRecord, TxTypeEnum } from "@/api/types/transactionRecord";
import { formatDate } from "@/utils/format";

interface PropsType {
  UpdatedAt: string
  transferStatus: TransferStatus
  extraData: ExtraDataType
}

const STATUS_MAP = {
  [TransferStatus.SUCCESS]: { style: "bg-[#33AA5C]", text: 'Completed' },
  [TransferStatus.FAILED]: { style: "bg-[#CC4425]", text: 'Failed' },
  [TransferStatus.PENDING]: { style: "bg-[#4FAAEB]", text: 'Ongoing' },
  // 4: { style: "bg-[#FFCF36] text-black", text: 'Paused' },
};

function StatusBadge({ status }: { status: TransferStatus }) {

  const { style = "", text = "" } = STATUS_MAP[status];

  return (
    <div className={`min-w-20 text-center text-xs bg-[#33AA5C] absolute top-0 right-0 rounded-bl-lg px-3 py-2 ${style}`}>{text}</div>
  );
}

export default function MyCard(props: PropsType) {

  const { extraData } = props

  const isDirectTransfer = extraData.length == 1 && extraData[0].type === TxTypeEnum.INTERNAL_TRANSFER;

  return (
    <Card className="bg-[#456ADE80]">
      <CardHeader className="relative py-4">
        <div className="text-xs text-[#FFFFFF80]">{formatDate(props.UpdatedAt)}</div>
        <StatusBadge status={props.transferStatus} />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 flex flex-col space-y-6">
        {
          isDirectTransfer ?
            <DirectTransferInfo extraData={props.extraData as [IInternalTransferData]} /> :
            <IndirectTransferInfo status={props.transferStatus} extraData={props.extraData as ITransactionRecord[]} />
        }
        <Divider className="px-4 !mt-3 bg-[#819DF530]" />
      </CardBody>
      <CardFooter className="gap-3 px-6">
        <div className="flex flex-row justify-between gap-x-5 w-full">
          <div className="flex flex-grow justify-center">
            <Button
              className="w-full h-11 rounded-[8px] bg-[#819DF530] text-foreground"
              color="primary"
            >
              View
            </Button>
          </div>
          <div className="flex flex-grow justify-center ">
            <Button radius="md" className="w-full h-11 rounded-[8px] bg-green-600 text-white shadow-lg">
              Resend
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
