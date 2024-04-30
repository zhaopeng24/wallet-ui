"use client";
import DropArrow from "@/components/Icons/DropArrow";
import {
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { FC } from "react";
import { IChain } from "@/store/useChains";
import BlockchainPopUP from "./BlockchainPopUP";

interface ISendProps {
  address?: string;
  chain?: IChain;
  setAddress: (address: string) => void;
  setChain: (chain: IChain) => void;
}
const Sent: FC<ISendProps> = (props) => {
  const { address, chain, setAddress, setChain } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-5 px-6">
      <div className="font-bold text-base">Send To</div>
      <div>
        <p className="text-sm mb-2">Address</p>
        <Input
          variant="bordered"
          label="Enter wallet address"
          value={address}
          classNames={{ input: ["purpleBlue"] }}
          onChange={(e) => setAddress(e.target.value)}
          isClearable
          onClear={() => setAddress("")}
        ></Input>
      </div>
      <div>
        <p className="text-sm mb-2">Blockchain</p>
        <Input
          isReadOnly
          endContent={<DropArrow />}
          value={chain?.name}
          variant="bordered"
          placeholder="Select the target chain"
          onClick={() => onOpen()}
          className="cursor-pointer"
        ></Input>
        <BlockchainPopUP
          chain={chain}
          isOpen={isOpen}
          setChain={setChain}
          onOpenChange={onOpenChange}
        />
      </div>
    </div>
  );
};
export default Sent;
