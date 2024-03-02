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
        <div className="text-2xl font-bold">
          ${balance ? balance.slice(0, 6) : "0"}
        </div>
        <div className="ml-1">
          <span>USD</span>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-[#6FFF62]">+$0 USD(+0%)</span>{" "}
        <span className="text-[#819DF580]"> Last Week</span>
      </div>
      <div className="flex mt-2">
        <div className="text-[#819DF580]">
          <span className="mr-1">Past Day</span>
          <span
            className={cn({
              "text-[#6FFF62]": isGreaterThanZero(PastDay),
              "text-[#FF8266]": !isGreaterThanZero(PastDay),
            })}
          >
            {isGreaterThanZero(PastDay) ? "+" : "-"} {PastDay.slice(0, 6)}
          </span>
        </div>
        <div className="text-[#819DF580] ml-2">
          <span className="mr-1">In Total</span>
          <span
            className={cn({
              "text-[#6FFF62]": isGreaterThanZero(PastDay),
              "text-[#FF8266]": !isGreaterThanZero(PastDay),
            })}
          >
            {isGreaterThanZero(InTotal) ? "+" : "-"} {InTotal.slice(0, 6)}
          </span>
        </div>
      </div>
    </div>
  );
}
