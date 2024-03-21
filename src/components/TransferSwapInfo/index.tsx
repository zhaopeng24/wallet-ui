import { User } from "@nextui-org/react";

type TransferSwapInfoProps = {
  swap_in: string;
  swap_out: string;
  source_token: string;
  target_token: string;
};

export const TransferSwapInfo = ({ 
  swap_in,
  swap_out,
  source_token,
  target_token
}: TransferSwapInfoProps) => {
  return (
    <div className="flex flex-row items-center w-full bg-[#819DF533] justify-between px-4 py-2 rounded-[15px]">
      <User
        name="Unisap"
        avatarProps={{
          src: "/imgs/uniswap.png",
          style: {
            width: "36px",
            height: "36px"
          },
        }}
      />
      <div className="text-[12px] flex flex-row items-center">
        <div className="flex flex-col justify-end items-end">
          <div>Swap {swap_in} {source_token}</div>
          <div>to {swap_out} {target_token}</div>
        </div>
      </div>
    </div>
  );
};