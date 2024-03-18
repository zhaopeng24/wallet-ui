import { IBalance } from "@/store/useChains";
import { cn } from "@/utils/util";

interface AssetProps {
  data?: IBalance;
}

export default function Asset(props: AssetProps) {
  const { data = {} } = props;
  const {
    sumBalanceUSD,
    pastDay = "0",
    past1Hour = "0",
    past7Day = "0",
  } = data as IBalance;

  const isGreaterThanZero = (s: string): boolean => {
    const n = parseFloat(s);
    if (n >= 0) return true;
    return false;
  };
  return (
    <div className="mt-8 ml-4 text-sm">
      <div className="flex">
        <div className="text-5xl font-bold">
          ${sumBalanceUSD ? sumBalanceUSD.slice(0, 6) : "0"}
        </div>
        <div className="ml-2">
          <span>USD</span>
        </div>
      </div>
      <div className="mt-2 mb-6">
        <span className="text-[#6FFF62] mr-2">+${past1Hour}</span>
        <span className="text-[#6FFF62] mr-4">+{past1Hour}%</span>
        <span className="text-[#819DF580]">Last Hour</span>
      </div>
      <div className="flex mt-2">
        <div className="text-[#819DF580]">
          <div
            className={cn({
              "text-[#6FFF62]": isGreaterThanZero(pastDay),
              "text-[#FF8266]": !isGreaterThanZero(pastDay),
            })}
          >
            <span className="mr-2">
              {isGreaterThanZero(pastDay) ? "+" : "-"}${pastDay.slice(0, 6)}
            </span>
            <span className="mr-2">+0%</span>
          </div>
          <div className="mr-1">Last Day</div>
        </div>
        <div className="text-[#819DF580] ml-2">
          <div
            className={cn({
              "text-[#6FFF62]": isGreaterThanZero(pastDay),
              "text-[#FF8266]": !isGreaterThanZero(pastDay),
            })}
          >
            <span className="mr-2">
              {isGreaterThanZero(pastDay) ? "+" : "-"}${pastDay.slice(0, 6)}
            </span>
            <span className="mr-2">+0%</span>
          </div>
          <div className="mr-1">Last Week</div>
        </div>
      </div>
    </div>
  );
}
