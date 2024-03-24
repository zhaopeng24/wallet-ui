import { AATx, GetEstimateFee } from "@/api/aaTxRecord";
import { Swap } from "@/api/swap";
import { Global } from "@/server/Global";
import { IAddress } from "@/store/useAddress";
import { IChain } from "@/store/useChains";
import { BigNumber, ethers } from "ethers";
import { BundlerRpc } from "sw-fe-sdk";
import erc20Abi from "sw-fe-sdk/dist/data/IERC20";
import Toast from "./toast";

export async function complexTransfer(ops: any[]) {
  const params = [];

  const rpc = Global.account.getBlockchainRpc();

  let chainsData = localStorage.getItem("wallet_chains");
  let addressListData = localStorage.getItem("wallet_addressList");
  let bundlerApi = "";
  let _gasPrice = 0;
  let feeToken = null;
  let chainId = 0;

  let chains: IChain[] = [];
  if (chainsData) {
    chains = JSON.parse(chainsData);
  }
  let addresslist: IAddress[] = [];
  if (addressListData) {
    addresslist = JSON.parse(addressListData);
  }

  let walletAddress = "";
  let entryPointAddress = "";

  let tokenPaymasterAddress = "";
  let payGasFeeTokenAddress = "";
  debugger;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    // 根据source_token，target_token拿到它们的地址
    const { type } = op;

    if (type === "swap") {
      const { chain_id, source_token, target_token, swap_in, swap_out } = op;
      const findChain = chains.find((chain) => chain.ID == chain_id)!;
      const walletAddress = addresslist.find(
        (address) => address.chainId == chain_id
      )!.walletAddress;

      Global.account.setBlockchainRpc(findChain.rpcApi);

      const tokens = findChain.tokens;
      const finTokenIn = tokens.find((token) => token.name === source_token);
      const finTokenOut = tokens.find((token) => token.name === target_token);

      const swapParams = {
        chainId: chain_id,
        tokenIn: finTokenIn?.address!,
        tokenOut: finTokenOut?.address!,
        amount: swap_in,
        // recipient: walletAddress,
      };
      const swapOp = await Swap(swapParams);
      const p = swapOp.body.result;
      const { callContractAddress, calldata } = p;

      let fromNative = finTokenIn?.type !== 1;
      debugger;
      if (!fromNative) {
        params.push({
          ethValue: BigNumber.from(0),
          callContractAbi: erc20Abi,
          callContractAddress: finTokenIn?.address,
          callFunc: "approve",
          callParams: [callContractAddress, ethers.constants.MaxUint256],
        });
      }

      params.push({
        ethValue: BigNumber.from(0),
        callContractAddress,
        calldataHex: calldata,
      });
    }
    if (type === "chain-internal-transfer") {
      const { source_chain_id, token, amount, receiver } = op;

      // 目前仅支持用mumbai的swt作为手续费，若swt不足，则提示手续费不足，然后结束
      const res = await GetEstimateFee("1");
      const { gasPrice, payFeeByToken } = res.body.result;
      feeToken = payFeeByToken.find((t: any) => t.token.name === "SWT").token;
      _gasPrice = gasPrice;

      // 判断几种情况：
      const findChain = chains.find((chain) => chain.ID == source_chain_id)!;
      bundlerApi = findChain.bundlerApi;
      chainId = findChain.ID;

      walletAddress = addresslist.find(
        (address) => address.chainId == source_chain_id
      )!.walletAddress;
      entryPointAddress = findChain.erc4337ContractAddress.entrypoint;

      const tokens = findChain.tokens;
      const finTokenIn = tokens.find((t) => t.name == token);

      let fromNative = finTokenIn?.type !== 1;
      let useNative = feeToken?.type !== 1;

      if (fromNative) {
        params.push({
          ethValue: ethers.utils.parseEther(amount),
          toAddress: receiver,
        });
      } else {
        params.push({
          ethValue: BigNumber.from(0),
          callContractAbi: erc20Abi,
          callContractAddress: finTokenIn?.address,
          callFunc: "transfer",
          callParams: [receiver, ethers.utils.parseEther(amount)],
        });
      }

      if (useNative) {
        tokenPaymasterAddress = "";
        payGasFeeTokenAddress = "";
      } else {
        tokenPaymasterAddress = feeToken?.tokenPaymasterAddress;
        payGasFeeTokenAddress = feeToken?.address;
      }
    }
  }
  debugger;
  let op = await Global.account.buildTxCallContract(
    walletAddress,
    entryPointAddress,
    _gasPrice,
    params,
    tokenPaymasterAddress,
    payGasFeeTokenAddress
  );

  Global.account.setBlockchainRpc(rpc);

  const res = await BundlerRpc.sendUserOperation(
    bundlerApi,
    op,
    entryPointAddress
  );
  console.log("res", res);
  if (res.body.result) {
    const opHase = res.body.result;
    const txParams = {
      chainid: chainId!,
      txSource: 1,
      userOperationHash: opHase,
      extraData: {
        type: "swap test",
      },
    };
    const aares = await AATx(txParams);
    if (aares.body.result) {
      Toast("Transfer Success");
    }
  }
  // return op;
}
