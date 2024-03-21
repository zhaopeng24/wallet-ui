import { Global } from "@/server/Global";
import { ethers } from "ethers";

export async function complexTransfer(params: ITransferParams) {
  const {
    fromNative,
    useNative,
    walletAddress,
    entryPointAddress,
    gasPrice,
    receiveAddress,
    amount,
    tokenPaymasterAddress,
    payGasFeeTokenAddress,
    tokenAddress,
  } = params;
  let op;

  const _gasPrice = ethers.utils.parseEther(gasPrice);
  const _amount = ethers.utils.parseEther(amount);

  console.log("gasPrice", _gasPrice.toString());
  console.log("amount", _amount.toString());
  if (fromNative) {
    if (useNative) {
      op = await Global.account.buildTxTransferNativeToken(
        walletAddress,
        entryPointAddress,
        gasPrice,
        receiveAddress,
        _amount
      );
    } else {
      op = await Global.account.buildTxTransferNativeToken(
        walletAddress,
        entryPointAddress,
        gasPrice,
        receiveAddress,
        _amount,
        tokenPaymasterAddress,
        payGasFeeTokenAddress
      );
    }
  } else {
    if (useNative) {
      op = await Global.account.buildTxTransferERC20Token(
        walletAddress,
        entryPointAddress,
        gasPrice,
        receiveAddress,
        _amount,
        tokenAddress
      );
    } else {
      op = await Global.account.buildTxTransferERC20Token(
        walletAddress,
        entryPointAddress,
        gasPrice,
        receiveAddress,
        _amount,
        tokenAddress,
        tokenPaymasterAddress,
        payGasFeeTokenAddress
      );
    }
  }
  return op;
}
