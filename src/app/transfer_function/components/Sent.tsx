"use client";
import DropArrow from "@/components/Icons/DropArrow";
import {
  Input,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FC } from "react";
import { IChain, useChains } from "@/store/useChains";
import Image from "next/image";
import MarkSVG from "@/components/Icons/MarkSVG";

interface ISendProps {
  address?: string;
  chain?: IChain;
  setAddress: (address: string) => void;
  setChain: (chain: IChain) => void;
}
const Sent: FC<ISendProps> = (props) => {
  const { address, chain, setAddress, setChain } = props;
  const { chains } = useChains((state) => state);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-5">
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
        <Modal
          isOpen={isOpen}
          placement="bottom"
          className="text-white"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex justify-center items-center text-base">
                  Blockchain
                </ModalHeader>
                <ModalBody className="px-4 pb-10">
                  <Listbox
                    items={chains}
                    aria-label="Dynamic Actions"
                    onAction={(key) => {
                      const find = chains.find((item) => item.ID === +key);
                      setChain(find);
                      onClose();
                    }}
                  >
                    {(item) => (
                      <ListboxItem key={item.ID} className="mb-4">
                        <div className="flex items-center">
                          <div className="flex-1 flex items-center">
                            <Image
                              src={item.icon}
                              alt="logo"
                              width={20}
                              height={20}
                              className="mr-4"
                            />
                            <div
                              className={
                                item.ID === chain?.ID ? " text-[#819DF5]" : ""
                              }
                            >
                              {item.name}
                            </div>
                          </div>
                          <div
                            className={`${
                              item.ID === chain?.ID ? "" : "hidden"
                            }`}
                          >
                            <MarkSVG />
                          </div>
                        </div>
                      </ListboxItem>
                    )}
                  </Listbox>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
export default Sent;
