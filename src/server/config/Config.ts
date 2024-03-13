import { IChain } from "@/store/useChains";

export interface Asset {
  name: string;
  address: string | null;
  type: number;
  icon: string;
  sort: number;
  decimals: number;
}

export class Config {
  public static ADDRESS_SIMPLE_ACCOUNT_FACTORY: string;
  public static ADDRESS_TOKEN_PAYMASTER: string;
  public static BUNDLER_API: string;
  public static RPC_API: string;
  public static BACKEND_API: string;
  public static CREATEWALLET_API: string;
  public static BLOCKCHAIN_SCAN: string;

  public static DECENTRALIZE_STORAGE_API: string;
  public static MPC_WASM_URL: string;
  // 常量
  public static LOCAL_STORAGE_MPC_KEY1 = "smarter-wallet-mpc-key1-v01";
  public static LOCAL_STORAGE_MPC_KEY3_HASH =
    "smarter-wallet-mpc-key3-hash-v01";
  // 启动默认网络
  public static TOKEN_PAYMASTER_TOKEN_NAME = "USDC";

  // todo 这部分接口应该可以不用这样写
  public static async init(mpcUrl: string, storageApi: string) {
    this.MPC_WASM_URL =
      "https://decentralized-storage-01.web3idea.xyz/package/mpc/wasm/v0_2/mpc.wasm";
    // this.MPC_WASM_URL = mpcUrl;
    this.DECENTRALIZE_STORAGE_API = storageApi;
    this.BACKEND_API = "https://auth-dev.web3idea.xyz/api/v1";
  }

  // 切换网络时调用
  public static async flush(networkData: IChain) {
    const configData = networkData;
    // 这里尽量保留旧代码的了，因为怕修改成新的会对代码有影响；注释掉的是查无使用的
    this.ADDRESS_SIMPLE_ACCOUNT_FACTORY =
      configData.erc4337ContractAddress.simpleAccountFactory;
    // this.ADDRESS_TOKEN_PAYMASTER = configData.erc4337ContractAddress.tokenPaymaster.swt;
    this.BUNDLER_API = configData.bundlerApi;
    this.RPC_API = configData.rpcApi;
    this.CREATEWALLET_API = configData.createWalletApi;
    this.BLOCKCHAIN_SCAN = configData.blockScanUrl;
  }
}
