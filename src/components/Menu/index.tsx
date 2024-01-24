import { useMenu } from "@/store/useMenu";
import { useEffect } from "react";
import { WalletSvg, SettingSvg, TransferSvg } from "../Icons";

export const Menu = ({ menu = "setting" }) => {
  const { currentMenu, setMenu } = useMenu((state) => state);
  const menus = [
    { key: "wallet", icon: WalletSvg },
    { key: "transfer", icon: TransferSvg },
    { key: "setting", icon: SettingSvg },
  ];
  useEffect(() => {
    setMenu(menu);
  }, [menu]);
  return (
    <div className="fixed bottom-0 w-[400px] border-t-[0.5px] border-solid	border-[rgba(255,255,255,0.2)]">
      <div className="flex flex-row justify-around">
        {menus.map((item) => (
          <div
            key={item.key}
            className="cursor-pointer py-[14px] w-[40px] flex justify-center"
            onClick={() => setMenu(item.key)}
          >
            <item.icon
              fill={currentMenu === item.key ? "white" : undefined}
            ></item.icon>
          </div>
        ))}
      </div>
    </div>
  );
};
