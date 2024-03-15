import { Arrow } from "@/components/Arrow";
import { truncateString } from "@/utils/util";
import { User } from "@nextui-org/react";
import dayjs from "dayjs";

type TransferUserInfoProps = {
  type?: "out" | "in" | "text";
};
type TransferDetailInfoProps = {
  type?: "success" | "pending";
  data?: {
    label: string;
    value: string;
  }[];
};

type SuccessCrossDetailProps = {} & StyleType;
type ErrorDetailProps = {} & StyleType;
type SuccessDetailProps = {} & StyleType;

const TransferUserInfo = ({ type = "out" }: TransferUserInfoProps) => {
  const map = {
    out: { img: "/imgs/out.png", color: "#FF8266" },
    in: { img: "/imgs/in.png", color: "#6FFF62" },
    text: { img: "/imgs/in.png" },
  };
  const { img, color } = map[type];
  return (
    <div className="flex flex-row items-center w-full bg-[#819DF533] justify-between px-4 py-2 rounded-lg">
      <User
        name="You"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          style: {
            width: "36px",
            height: "36px",
          },
        }}
      />
      <div className="text-[12px] flex flex-row items-center">
        {type === "text" && (
          <div className="max-w-[180px]">
            charged <em className="text-[#FF8266] not-italic">0.24 USDT</em> for
            cross-chain bridging
          </div>
        )}
        {type !== "text" && (
          <>
            <img className="w-4 mr-2" src={img} />{" "}
            <span style={{ color }}>100.36 USDT</span>
          </>
        )}
      </div>
    </div>
  );
};

const TransferDetailInfo = ({ type, data = [] }: TransferDetailInfoProps) => {
  // 获取当前时间
  const currentTime = dayjs();

  // 格式化时间
  const formattedTime = currentTime.format("HH:mm MMM DD YYYY");

  return (
    <div className="px-4 py-1 flex flex-row">
      <div className="w-9 mr-8 bg-cover flex justify-center items-center">
        <Arrow
          type={type}
          src={"https://i.pravatar.cc/150?u=a04258114e29026702d"}
        ></Arrow>
      </div>
      <div className="flex-1 flex flex-col items-center py-1">
        <div>
          {data.map((item, index) => (
            <div key={index} className="text-[10px] py-1">
              <span className="text-[#FFFFFF80] mr-1">{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ErrorDetail = ({}: ErrorDetailProps) => {};
export const SuccessDetail = ({ className }: SuccessDetailProps) => {
  // 获取当前时间
  const currentTime = dayjs();
  // 格式化时间
  const formattedTime = currentTime.format("HH:mm MMM DD YYYY");
  const data = [
    {
      label: "Transaction fees",
      value: "0.12 USDT",
    },
    {
      label: "Time",
      value: formattedTime,
    },
  ];
  return (
    <div className={className}>
      <TransferUserInfo></TransferUserInfo>
      <TransferDetailInfo data={data}></TransferDetailInfo>
      <TransferUserInfo type="in"></TransferUserInfo>
    </div>
  );
};
export const SuccessCrossDetail = ({ className }: SuccessCrossDetailProps) => {
  // 获取当前时间
  const currentTime = dayjs();

  // 格式化时间
  const formattedTime = currentTime.format("HH:mm MMM DD YYYY");
  const data = [
    {
      label: "Transaction fees",
      value: "0.12 USDT",
    },
    {
      label: "From",
      value: truncateString("0.12 USDT"),
    },
    {
      label: "To",
      value: truncateString("0.12 USDT"),
    },
    {
      label: "Time",
      value: formattedTime,
    },
  ];
  return (
    <div className={className}>
      <TransferUserInfo></TransferUserInfo>
      <TransferDetailInfo data={data}></TransferDetailInfo>
      <TransferUserInfo type="text"></TransferUserInfo>
      <TransferDetailInfo data={data}></TransferDetailInfo>
      <TransferUserInfo type="in"></TransferUserInfo>
    </div>
  );
};
