import { HttpUtils } from "@/server/utils/HttpUtils";

export function GetTransferList(address: string) {
  return HttpUtils.get("https://aa-tx-dev.web3idea.xyz" + `/api/v1/aa-tx?address=${address}`);
}
