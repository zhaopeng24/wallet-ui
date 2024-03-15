import { formatAddress } from "@/utils/format";

export default function Person({
  name,
  address,
}: {
  name: string;
  address: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-base p-1 font-mono">{name}</p>
      <p className="bg-[#819DF54D] text-[#819DF5] rounded-full text-xs px-2 py-1">
        {formatAddress(address)}
      </p>
    </div>
  );
}
