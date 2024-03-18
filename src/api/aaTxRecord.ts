import { HttpUtils } from "@/server/utils/HttpUtils";

const HOST = "https://aa-tx-dev.web3idea.xyz";

export function GetEstimateFee(chainId: string) {
  return HttpUtils.get(`${HOST}/api/v1/aa-tx/estimate-fee?chainId=${chainId}`);
}

interface IAATxParams {
  chainid: number;
  txSource: number;
  userOperationHash: string;
  extraData: any;
}
export function AATx(params: IAATxParams) {
  return HttpUtils.post(`${HOST}/api/v1/aa-tx`, params);
}
