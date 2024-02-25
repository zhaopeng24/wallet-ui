import { poppins700, poppins600, poppins500 } from "@/public/fonts"
interface Props {
    name: string,
    address: string,
}
export default function DirectPersonalAddress(props: Props) {
    function formatAddress(address: string): string {
        // 确保地址是有效的，即以0x开头且长度正确
        if (!address.startsWith('0x') || address.length !== 42) {
            throw new Error('Invalid Ethereum address');
        }

        // 获取前四位和后四位
        const start = address.substring(0, 6); // 包括0x，所以是前6个字符
        const end = address.substring(address.length - 4);
        return `${start}...${end}`;
    }
    return (
        <div className="flex-1 flex flex-col justify-around">
            <div className={`${poppins700.className} text-center text-lg leading-4 font-bold text-white`}>{props.name}</div>
            <div className={`${poppins500.className} rounded-xl py-1 px-2 bg-royalBlue text-center text-indigo-200 text-xs flex items-center justify-center `}>{formatAddress(props.address)}</div>
        </div>
    )
}