import { HttpUtils } from "@/server/utils/HttpUtils";

const HOST = "https://asset-dev.web3idea.xyz";

export function getPackage() {
  return HttpUtils.get(`${HOST}/api/v1/package`);
}
export function getBalance() {
  return HttpUtils.get(`${HOST}/api/v1/balance`);
}
export function getTxDetail() {
  return HttpUtils.get(`${HOST}/api/v1/tx/list`);
}
