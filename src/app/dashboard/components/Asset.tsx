import { cn } from "@/utils/util";
interface AssetProps {
  balance: string;
  income?: string;
  PastDay: string;
  InTotal: string;
}

export default function Asset({ balance, PastDay, InTotal }: AssetProps) {
  const isGreaterThanZero = (s: string): boolean => {
    const n = parseFloat(s);
    if (n >= 0) return true;
    return false;
  };
  return (
    <div className="mt-8 ml-4 text-sm">
      <div className="flex">
        <div className="text-5xl font-bold">
          ${balance ? balance.slice(0, 6) : "0"}
        </div>
        <div className="ml-2">
          <span>USD</span>
        </div>
      </div>
      <div className="mt-2 mb-6">
        <span className="text-[#6FFF62] mr-2">+$0</span>
        <span className="text-[#6FFF62] mr-4">+0%</span>
        <span className="text-[#819DF580]">Last Hour</span>
      </div>
      <div className="flex mt-2">
        <div className="text-[#819DF580]">
          <div
            className={cn({
              "text-[#6FFF62]": isGreaterThanZero(PastDay),
              "text-[#FF8266]": !isGreaterThanZero(PastDay),
            })}
          >
            <span className="mr-2">
              {isGreaterThanZero(PastDay) ? "+" : "-"}${PastDay.slice(0, 6)}
            </span>
            <span className="mr-2">+0%</span>
          </div>
          <div className="mr-1">Last Day</div>
        </div>
        <div className="text-[#819DF580] ml-2">
          <div
            className={cn({
              "text-[#6FFF62]": isGreaterThanZero(PastDay),
              "text-[#FF8266]": !isGreaterThanZero(PastDay),
            })}
          >
            <span className="mr-2">
              {isGreaterThanZero(InTotal) ? "+" : "-"}${InTotal.slice(0, 6)}
            </span>
            <span className="mr-2">+0%</span>
          </div>
          <div className="mr-1">Last Week</div>
        </div>
      </div>
    </div>
  );
}
