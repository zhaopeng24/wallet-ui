import { User } from "@nextui-org/react";

type TransferBridgeInfoProps = {
  source_chain: string;
  target_chain: string;
};

export const TransferBridgeInfo = ({ 
  source_chain,
  target_chain,
}: TransferBridgeInfoProps) => {
  return (
    <div className="flex flex-row items-center w-full bg-[#819DF533] justify-between px-4 py-2 rounded-[15px]">
      <User
        name="CCTP"
        avatarProps={{
          src: "/imgs/cctp.png",
          style: {
            width: "36px",
            height: "36px"
          },
        }}
      />
      <div className="text-[12px] flex flex-row items-center">
        <div className="flex flex-col justify-end items-end">
          <div>cross-chain bridging from </div>
          <div>{source_chain} to {target_chain}</div>
        </div>
      </div>
    </div>
  );
};
