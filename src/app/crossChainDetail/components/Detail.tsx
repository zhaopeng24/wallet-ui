import { TransferUserInfo } from '@/components/TransferUserInfo'
import { TransferSwapInfo } from '@/components/TransferSwapInfo'
import { TransferBridgeInfo } from '@/components/TransferBridgeInfo'
import { TransferCrossInfo } from '@/components/TransferCrossInfo'

type CrossDetailProps = {} & StyleType;

export const CrossDetail = ({ className }: CrossDetailProps) => {

  return (
    <div className={className}>
      <TransferUserInfo type="out" amount={"1000.36"} tokenName={"USDT"} usdt={"1000"}></TransferUserInfo>
      <TransferCrossInfo fee={"0.23-0.35"} time={"28s-57s"}/>
      <TransferSwapInfo swap_in={"0.5"} source_token={"ETH"} swap_out={"1001"} target_token={"USDT"}/>
      <TransferCrossInfo fee={"0.23-0.35"} time={"28s-57s"}/>
      
      <TransferBridgeInfo source_chain={"Ethereum"} target_chain={"Avalance"} />
      <TransferCrossInfo fee={"0.23-0.35"} time={"28s-57s"}/>

      <TransferUserInfo type="in" amount={"0.5"} tokenName={"ETH"} usdt={"100.1"}></TransferUserInfo>
    </div>
  );
};
