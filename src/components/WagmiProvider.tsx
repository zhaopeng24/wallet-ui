"use client";

import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/config/wagmi/wagmi";

type Props = {
  children: React.ReactNode;
};
export default function WagmiProvider({ children }: Props) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
