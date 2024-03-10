"use client";
import ChainDropDown from "./ChainDropdown";

interface HeaderProps {
  userName?: string;
  address: string;
  setChainId: (params: any) => void;
  setCurrentChainId: (params: any) => void;
}

export default function Header({ address }: HeaderProps) {
  const formatAddress = (s: string) => {
    if (s) {
      const head = s.slice(0, 7);
      const tail = s.slice(s.length - 4, s.length);
      return head + "..." + tail;
    }
    return "...";
  };

  return (
    <div className="w-full flex items-center mt-4">
      <div className="p-2 rounded-full bg-black mr-2 border border-white border-opacity-20">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_204_4507)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 4H12L4 12H12L4 20H12L20 12L12 12L20 4Z"
              fill="white"
            />
            <path
              d="M12 12H20L12 20H4L12 12Z"
              fill="url(#paint0_linear_204_4507)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_204_4507"
              x1="12"
              y1="12"
              x2="15.24"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="0.812517" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_204_4507">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="flex-1 flex flex-col mr-2 overflow-hidden">
        <div className="text-base">New Friend</div>
        <div className="w-full text-[#819DF580] text-ellipsis">
          {formatAddress(address)}
        </div>
      </div>
      <ChainDropDown address={address} />
    </div>
  );
}
