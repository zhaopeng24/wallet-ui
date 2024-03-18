import { poppins700, poppins600, poppins500 } from "@/public/fonts";
import { formatAddress } from "@/utils/format";
interface Props {
  name: string;
  address: string;
}
export default function DirectPersonalAddress(props: Props) {
  return (
    <div className="flex-1 flex flex-col justify-around">
      <div
        className={`${poppins700.className} text-center text-lg leading-4 font-bold text-white`}
      >
        {props.name}
      </div>
      <div
        className={`${poppins500.className} rounded-xl py-1 px-2 bg-royalBlue text-center text-indigo-200 text-xs flex items-center justify-center `}
      >
        {formatAddress(props.address)}
      </div>
    </div>
  );
}
