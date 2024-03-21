import { Arrow } from "@/components/Arrow";
import dayjs from "dayjs";

type TransferCrossInfoProps = {
  fee: string;
  time: string;
};

export const TransferCrossInfo = ({fee, time }: TransferCrossInfoProps) => {
  // 获取当前时间
  const currentTime = dayjs();

  // 格式化时间
  const formattedTime = currentTime.format("HH:mm MMM DD YYYY");

  return (
    <div className="px-4 py-1 flex flex-row justify-between">
      <div className="w-9 mr-8 bg-cover flex justify-center items-center">
        <Arrow
          type={"success"}
          src={"https://i.pravatar.cc/150?u=a04258114e29026702d"}
        ></Arrow>
      </div>
      <div className="flex-1 flex flex-col py-1 ml-8">
        <div className="text-[10px] py-1 ">
          <span className="text-[#FFFFFF80] mr-1">Transaction fees:</span>
          <span> { fee } USDT</span>
        </div>
        <div className="text-[10px] py-1">
          <span className="text-[#FFFFFF80] mr-1">Processing Time:</span>
          <span> { time } </span>
        </div>
      </div>
    </div>
  );
};