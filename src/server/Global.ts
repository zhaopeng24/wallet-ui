import { MPCManageAccount, MPCKeyManage } from "sw-fe-sdk";

interface IInitParams {
  rpcUrl: string;
  mpcWasmUrl: string;
  authorization: string;
  backendApiUrl: string;
  storageApiUrl: string;
}
export class Global {
  public static account: MPCManageAccount;
  public static keyManage: MPCKeyManage;

  public static tempLocalPassword: string;
  public static authorization: string;

  public static async init(params: IInitParams) {
    const { rpcUrl, mpcWasmUrl, authorization, backendApiUrl, storageApiUrl } =
      params;

    const createWalletApiUrl = backendApiUrl + "/ca/create";

    this.account = new MPCManageAccount(
      rpcUrl,
      backendApiUrl,
      mpcWasmUrl,
      authorization,
      createWalletApiUrl
    );
    this.account.initAccount("");
    this.keyManage = new MPCKeyManage(backendApiUrl, storageApiUrl);
  }
}
