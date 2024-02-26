import TriangleSvg from "@/components/Icons/TriangleSvg";

interface Props {
  transactionFee: string;
  transactionFeeCurrency: string;
  estTime: string;
  chainIconSrc: string;
}

const TransactionInfo = ({ transactionFee, transactionFeeCurrency, estTime, chainIconSrc }: Props) => {
  return (
    <div className="pl-7 pb-3">
      <div className="border-l-2 border-dashed border-white/50 flex justify-end items-center py-4 relative">

        {/*chain image*/}
        <div className="absolute left-0 -translate-x-1/2">
          <img className="rounded-full" src={chainIconSrc} alt=""/>
        </div>

        {/*svg triangle*/}
        <div className="absolute left-0 -bottom-2 -translate-x-1/2">
          <TriangleSvg />
        </div>

        {/*information copy*/}
        <div>
          <div>
            <span className="text-white/50 text-[10px]">Transaction fees:</span>
            <span className="text-[10px]">{transactionFee} {transactionFeeCurrency}</span>
          </div>
          <div>
            <span className="text-white/50 text-[10px]">Est. time:</span>
            <span className="text-[10px]"> {estTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfo;