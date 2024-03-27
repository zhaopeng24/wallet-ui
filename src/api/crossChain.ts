import { HttpUtils } from "@/server/utils/HttpUtils";

const HOST = "https://cc-dev.web3idea.xyz";

interface ICrossTxParams {
  crossChainConfigId: number;
  sourceChainUserOperationHash: string;
  crossChainDetails: any;
}
export function CrossTx(params: ICrossTxParams) {
  return HttpUtils.post(`${HOST}/api/v1/cross-tx`, params);
}
