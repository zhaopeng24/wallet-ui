export default function Person({
  name,
  amount,
  tokenName,
}: {
  name: string;
  amount: string
  tokenName: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-poppins text-base font-bold leading-6 text-center">{name}</p>
      <p className="font-poppins text-lg font-semibold leading-6 text-center text-[#8197F5]">{amount}</p>
      <p className="font-poppins text-xs font-normal leading-6 text-white opacity-80">{tokenName}</p>
    </div>
  );
}
