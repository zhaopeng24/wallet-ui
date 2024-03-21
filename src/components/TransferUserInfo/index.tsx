import { Arrow } from "@/components/Arrow";
import { User } from "@nextui-org/react";

type TransferUserInfoProps = {
  type?: "out" | "in";
  amount: string;
  tokenName: string;
  usdt: string;
};

export const TransferUserInfo = ({ 
  type = "out",
  amount,
  tokenName,
  usdt
}: TransferUserInfoProps) => {
  const map = {
    out: { img: "/imgs/out.png", color: "#FF8266" },
    in: { img: "/imgs/in.png", color: "#6FFF62" },
  };
  const { img, color } = map[type];
  return (
    <div className="flex flex-row items-center w-full bg-[#819DF533] justify-between px-4 py-2 rounded-[15px]">
      <User
        name="You"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          style: {
            width: "36px",
            height: "36px"
          },
        }}
      />
      <div className="text-[12px] flex flex-row items-center">
        <div className="flex flex-col justify-end items-end">
          <div className="flex flex-row" style={{ color }}>
            <img className="w-4" src={img} />{" "}
            {amount} {tokenName}
          </div>
          <div >${usdt}</div>
        </div>
      </div>
    </div>
  );
};
  