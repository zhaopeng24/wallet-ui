import { AccountInterface } from "./account/AccountInterface";
import { MPCManageAccount } from "./account/MPCManageAccount";

// 当前只有MPC账号了，其他代码没用删掉了
export class Global {
  public static account: AccountInterface;
  public static initialized: boolean = false;
  public static tempLocalPassword: string;
  public static authorization: string;

  public static async init() {
    let initData = null;
    if (this.account) {
      initData = this.account.initData;
    }
    this.account = new MPCManageAccount();
    this.account.initAccount(initData);
    this.initialized = true;
  }
}
