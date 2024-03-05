import { HttpUtils } from "@/server/utils/HttpUtils";

const HOST = "https://asset-dev.web3idea.xyz";

export function getPackage() {
  return HttpUtils.get(`${HOST}/api/v1/package`);
}
export function getBalance(chainId: number, address: string) {
  return HttpUtils.post(`${HOST}/api/v1/balance`, {
    chainId,
    address,
  });
}
export function getTxDetail(chainId: number, address: string) {
  return HttpUtils.post(`${HOST}/api/v1/tx/list`, {
    chainId,
    address,
  });
}
