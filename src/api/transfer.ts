import { Config } from "@/server/config/Config";
import { HttpUtils } from "@/server/utils/HttpUtils";

export function GetTransferList(address?: string, code?: string) {
  return HttpUtils.get("https://aa-tx-dev.web3idea.xyz" + "/api/v1/aa-tx?address=0xaD9F08B07acf3F64fAb52dD5C474D3999B6bD894");
}
