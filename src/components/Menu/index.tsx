// import { useMenu } from "@/store/useMenu";
import Toast from "@/utils/toast";
import { WalletSvg, SettingSvg, TransferSvg } from "../Icons";
import { useRouter } from "next/navigation";
import { classNames } from "@/utils/classNames";

export const Menu = ({ active = "dashboard" }) => {
  const router = useRouter();
  const menus = [
    { key: "dashboard", icon: WalletSvg, url: "/dashboard", label: "Wallet" },
    { key: "demand", icon: TransferSvg, url: "/demand", label: "Demand" },
    { key: "setting", icon: SettingSvg, url: "", label: "Settings" },
  ];

  return (
    <div className="border-t-1 border-solid	border-[rgba(255,255,255,0.2)] w-full py-2 pb-4">
      <div className="flex">
        {menus.map((item) => (
          <div
            key={item.key}
            className="cursor-pointer flex text-center flex-1 justify-center flex-col items-center"
            onClick={() => {
              if (!item.url) {
                Toast("Coming soon");
              }
              if (item.key !== active) {
                router.push(item.url);
              }
            }}
          >
            <item.icon
              fill={active !== item.key ? "white" : undefined}
            ></item.icon>
            <div className={classNames(active === item.key && "text-[#819DF5]",
              "font-normal text-xs leading-6"
            )}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
