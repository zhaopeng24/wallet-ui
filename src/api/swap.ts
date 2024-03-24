import { HttpUtils } from "@/server/utils/HttpUtils";

const HOST = "https://swap-dev.web3idea.xyz";

interface ISwapProps {
  chainId: number;
  tokenIn: string;
  tokenOut: string;
  amount: number;
  // recipient: string;
}
export function Swap(params: ISwapProps) {
  return HttpUtils.post(`${HOST}/api/v1/uniswap`, params);
}
