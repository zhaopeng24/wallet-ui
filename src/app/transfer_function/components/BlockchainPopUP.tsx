import {
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { IChain, useChains } from "@/store/useChains";
import Image from "next/image";
import MarkSVG from "@/components/Icons/MarkSVG";

interface Props {
  isOpen: boolean
  chain?: IChain
  setChain: (chain: IChain) => void
  onOpenChange: () => void
}

export default function BlockchainPopUP({
  isOpen,
  chain,
  setChain,
  onOpenChange
}: Props) {
  const { chains } = useChains((state) => state);

  return <Modal
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
          <ModalBody className="px-4 pb-4">
            <Listbox
              items={chains}
              aria-label="Dynamic Actions"
              onAction={(key) => {
                const find = chains.find((item) => item.ID === +key);
                setChain(find!);
                onClose();
              }}
            >
              {(item) => (
                <ListboxItem key={item.ID} textValue={item.name} className="mb-4">
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
                      className={
                        `${item.ID === chain?.ID ? "" : "hidden"}`
                      }
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
}
