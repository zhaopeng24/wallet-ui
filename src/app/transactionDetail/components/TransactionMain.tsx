import { classNames } from "@/utils/classNames";
import Style from "./style.module.scss";
import { AddressText } from "@/components/AddressText";
import dayjs from "dayjs";

type AmountProps = { num: number | string } & StyleType;
type StatusProps = {
  type?: "success" | "fail" | "pending";
  time: string;
} & StyleType;
type TransferToProps = {} & StyleType;

const Status = ({ type = "success", time, className }: StatusProps) => {
  const map = {
    success: {
      style: Style.success,
      text: "Failed",
    },
    fail: {
      style: Style.fail,
      text: "Succeed",
    },
    pending: {
      style: Style.pending,
      text: "Pending",
    },
  };
  const { style, text } = map[type];
  return (
    <div className={classNames(className, Style.status, style)}>
      <div className={Style["text-left"]}>{text}</div>
      <div className={Style["text-right"]}>{time}</div>
    </div>
  );
};

const Amount = ({ num, className }: AmountProps) => {
  return (
    <div className={classNames(className, "flex flex-row items-center")}>
      <div className="mr-2 text-[24px] font-bold">-100.36 USDT</div>
      <div className=" text-[14px]">$100.36 USD</div>
    </div>
  );
};

const TransferTo = ({ className }: TransferToProps) => {
  return (
    <div
      className={classNames(
        className,
        "flex flex-row items-center justify-between"
      )}
    >
      <div className="flex flex-row items-center ">
        <span className="mr-2 text-[12px]">You</span>
        <AddressText
          text={"0x4F4aB4AdEd209820C0bcF55968DbEDc935f76e1B"}
        ></AddressText>
      </div>
      <div className="bg-[url(/imgs/arrow.png)] bg-cover w-[24px] h-[24px]"></div>
      <div className="flex flex-row items-center">
        <span className="mr-2 text-[12px]">Bone</span>
        <AddressText
          text={"0x4F4aB4AdEd209820C0bcF55968DbEDc935f76e1B"}
        ></AddressText>
      </div>
    </div>
  );
};

export const TransactionMain = () => {
  // 获取当前时间
  const currentTime = dayjs();

  // 格式化时间
  const formattedTime = currentTime.format("HH:mm MMM DD YYYY");
  return (
    <div className="pb-9 pt-3">
      <Status className="mb-4" type={"success"} time={formattedTime}></Status>
      <Amount className="mb-4"></Amount>
      <TransferTo></TransferTo>
    </div>
  );
};
