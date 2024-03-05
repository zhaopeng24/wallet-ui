import { AccountInterface } from "./account/AccountInterface";
import { MPCManageAccount } from "./account/MPCManageAccount";

export class Global {
  public static account: AccountInterface;
  public static initialized: boolean = false;
  public static tempLocalPassword: string;
  public static authorization: string;

  public static async init() {
    let initData = null;
    this.account = new MPCManageAccount();
    await this.account.initAccount(initData);
    this.initialized = true;
  }
}
