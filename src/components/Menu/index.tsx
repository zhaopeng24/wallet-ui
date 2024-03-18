// import { useMenu } from "@/store/useMenu";
import { WalletSvg, SettingSvg, TransferSvg } from "../Icons";
import { useRouter } from "next/navigation";

export const Menu = ({ active = "dashboard" }) => {
  const router = useRouter();
  const menus = [
    { key: "dashboard", icon: WalletSvg, url: "/dashboard" },
    { key: "demand", icon: TransferSvg, url: "/demand" },
    { key: "setting", icon: SettingSvg, url: "" },
  ];

  return (
    <div className="border-t-1 border-solid	border-[rgba(255,255,255,0.2)] w-full py-2 pb-4">
      <div className="flex">
        {menus.map((item) => (
          <div
            key={item.key}
            className="cursor-pointer flex text-center flex-1 justify-center"
            onClick={() => {
              if (item.key !== active) {
                router.replace(item.url);
              }
            }}
          >
            <item.icon
              fill={active !== item.key ? "white" : undefined}
            ></item.icon>
          </div>
        ))}
      </div>
    </div>
  );
};
