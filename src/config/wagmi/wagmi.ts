import { configureChains, createConfig } from "wagmi";
import {
  hardhat,
  polygon,
  polygonMumbai,
  avalanche,
  avalancheFuji,
  moonbaseAlpha,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  AVALANCHE_HTTP_RPC,
  AVALANCHEFUJI_HTTP_RPC,
  MOONBASE_HTTP_RPC,
} from "@/consts/rpc";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon,
    avalanche,
    ...(process.env.NEXT_PUBLIC_ENABLE_LOCAL_NETWORK ? [hardhat] : []),
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS
      ? [polygonMumbai, avalancheFuji, moonbaseAlpha]
      : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON! }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI! }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === 43114) return { http: AVALANCHE_HTTP_RPC };
        if (chain.id === 43113) return { http: AVALANCHEFUJI_HTTP_RPC };
        if (chain.id === 1287) return { http: MOONBASE_HTTP_RPC };
        return { http: MOONBASE_HTTP_RPC };
      },
    }),
    publicProvider(),
  ]
);

const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: true,
});

export { chains, wagmiConfig };
