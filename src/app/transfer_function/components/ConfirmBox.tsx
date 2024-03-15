"use client";

import { ArrowIcon } from "./arrow";
import {
  Avatar,
  Button,
  Divider,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import DropArrow from "@/components/Icons/DropArrow";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAddress } from "@/store/useAddress";
import { IChain, useChains } from "@/store/useChains";
import { AATx, GetEstimateFee } from "@/api/aaTxRecord";
import Image from "next/image";
import { BundlerRpc } from "sw-fe-sdk";
import { classNames } from "@/utils/classNames";
import { ITransferParams, transfer } from "@/utils/transferUtils";
import { Global } from "@/server/Global";
import Toast from "@/utils/toast";
import { formatAddress } from "@/utils/format";
import Person from "@/components/Person";

function Tab({
  name,
  address,
  userAvatar,
  amount,
  coinValue,
}: {
  name: string;
  address: string;
  userAvatar?: string;
  amount: string;
  coinValue: string;
}) {
  return (
    <div className="flex-1 flex">
      <div className="flex flex-1">
        <Avatar src={userAvatar} className="mr-2"></Avatar>
        <div>
          <p className=" font-bold">{name}</p>
          <p className="text-[#819DF5] text-sm">{formatAddress(address)}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-[#819DF5] font-semibold">{amount} USDT</p>
        <p className="text-white/30 text-sm">${coinValue}</p>
      </div>
    </div>
  );
}

function GapLine() {
  return (
    <div className="flex flex-col relative">
      <div className="rotate-90 absolute top-[-10px] left-[-40px] scale-50">
        <ArrowIcon />
      </div>
      <Divider />
    </div>
  );
}

function AmountPlaneItem({
  title,
  isBold,
  amount,
  coinValue,
  needArrow,
  clickEvent,
}: {
  title: string;
  isBold: boolean;
  amount: string;
  coinValue: string;
  needArrow: boolean;
  clickEvent?: () => void;
}) {
  return (
    <div onClick={clickEvent} className="py-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <p
            className="text-mainPurpleBlue mr-2"
            style={{ fontWeight: isBold ? 700 : "normal" }}
          >
            {title}
          </p>
          {needArrow && <DropArrow />}
        </div>
        <p style={{ fontWeight: isBold ? 700 : "normal" }}>{amount}</p>
      </div>
      {coinValue ? (
        <div className="flex justify-end">
          <p className="text-sm text-white/50">${coinValue}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function ConfirmBox() {
  const { currentAddress, addressList } = useAddress();
  const { chains } = useChains();

  const [gasFeeList, setGasFeeList] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentGasFee, setCurrentGasFee] = useState<any>(null);

  const transferData = useMemo(() => {
    const amount = sessionStorage.getItem("transfer_amount");
    const address = sessionStorage.getItem("transfer_address") || "";
    const name = sessionStorage.getItem("transfer_name") || "";
    const tokenId = sessionStorage.getItem("transfer_tokenId");
    const chainId = sessionStorage.getItem("transfer_chainId");

    const findChain = chains.find((c: IChain) => c.ID === Number(chainId));
    const tokens = findChain?.tokens;
    const token = tokens?.find((t) => t.tokenId == +tokenId!);
    const chainAddress = addressList.find(
      (item) => item.chainId === Number(chainId)
    )?.walletAddress;

    return {
      amount,
      address,
      name,
      token,
      chain: findChain,
      chainId,
      chainAddress,
    };
  }, []);
  const gasPriceRef = useRef(0);
  useEffect(() => {
    async function get() {
      const res = await GetEstimateFee(transferData.chainId!);
      const { gasPrice, payFeeUsdValue, payFeeByToken } = res.body.result;
      setGasFeeList(payFeeByToken);
      gasPriceRef.current = gasPrice;
    }
    get();
  }, [transferData.chainId]);

  async function handleConfirm() {
    const entryPointAddress =
      transferData.chain?.erc4337ContractAddress.entrypoint!;
    const bundlerApi = transferData.chain?.bundlerApi!;
    const params: ITransferParams = {
      fromNative: transferData.token?.type !== 1,
      useNative: currentGasFee?.token?.type !== 1,
      walletAddress: transferData.chainAddress!,
      entryPointAddress: entryPointAddress,
      receiveAddress: transferData.address,
      amount: transferData.amount!,
      gasPrice: gasPriceRef.current + "",
      tokenPaymasterAddress: currentGasFee.token?.tokenPaymasterAddress || "",
      payGasFeeTokenAddress: currentGasFee?.token?.address || "",
      tokenAddress: transferData.token?.address || "",
    };
    // const rpc = Global.account.getBlockchainRpc();
    Global.account.setBlockchainRpc(transferData.chain?.rpcApi!);

    const op = await transfer(params);
    console.log("gooooood op", op);
    const res = await BundlerRpc.sendUserOperation(
      bundlerApi,
      op,
      entryPointAddress
    );
    console.log("res", res);
    if (res.body.result) {
      const opHase = res.body.result;
      const txParams = {
        chainid: +transferData.chainId!,
        txSource: 1,
        userOperationHash: opHase,
        extraData: {
          from: params.walletAddress,
          to: params.receiveAddress,
          amount: params.amount,
          tokenId: transferData.token?.tokenId,
          isDirectTransfer: true,
          toName: "test",
        },
      };
      const ares = await AATx(txParams);
    } else {
      Toast(res.body.error.message || "something wrong!");
    }

    // Global.account.setBlockchainRpc(rpc);
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-center border-b-1 border-gray-500/30 px-4 pb-4">
        <Person
          name={"You"}
          address={"0x876ffC3f41F20a4B5A78d375F5FA3a1299daD640"}
        />
        <div className="flex-1 flex flex-col items-center">
          <p className="text-[#4FAAEB] text-sm font-bold">{100} USDT</p>
          <ArrowIcon />
          <p className="text-[#819DF5] text-xs">Direct Transfer</p>
        </div>
        <Person
          name={"Other"}
          address={"0x876ffC3f41F20a4B5A78d375F5FA3a1299daD640"}
        />
      </div>

      <div className="my-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-4">
            <div className="w-[50px] text-center mr-2">From</div>
            <Tab
              name={"You"}
              address={"0x876ffC3f41F20a4B5A78d375F5FA3a1299daD640"}
              amount={"100"}
              coinValue={"100"}
            />
          </div>
          {/* <GapLine /> */}
          <div className="flex justify-between items-center">
            <div className="w-[50px] text-center mr-2">To</div>
            <Tab
              name={"Alice"}
              address={"0x876ffC3f41F20a4B5A78d375F5FA3a1299daD640"}
              amount={"100"}
              coinValue={"100"}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex bg-[#819DF533] rounded-xl flex-col px-4 py-2">
          <AmountPlaneItem
            title={"Transfer Amount"}
            isBold={false}
            needArrow={false}
            amount={""}
            coinValue={""}
          />
          <AmountPlaneItem
            title={"Gas Fee"}
            isBold={false}
            needArrow={true}
            clickEvent={() => {
              onOpen();
            }}
            amount={
              currentGasFee
                ? `${currentGasFee?.needAmount} ${currentGasFee?.token?.name}`
                : "0"
            }
            coinValue={""}
          />
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
                    Gas Fee
                  </ModalHeader>
                  <ModalBody className="px-4 pb-10">
                    <Listbox
                      items={gasFeeList}
                      aria-label="Dynamic Actions"
                      onAction={(key) => {
                        const find = gasFeeList.find(
                          (item: any) => item.token.tokenId == key
                        );
                        setCurrentGasFee(find);
                        onClose();
                      }}
                    >
                      {(item: any) => (
                        <ListboxItem
                          key={item.token.tokenId}
                          className={classNames(
                            "mb-4",
                            currentGasFee?.token.tokenId === item.token.tokenId
                              ? "text-[#4FAAEB]"
                              : ""
                          )}
                        >
                          <div className="flex items-center">
                            <Image
                              src={item.token.icon}
                              alt="logo"
                              width={40}
                              height={40}
                              className="mr-4"
                            />
                            <div className="flex-1 font-bold text-base">
                              {item.token.name}
                            </div>
                            <div>
                              <p>{item.needAmount}</p>
                              {/* <p>${item.usdValue}</p> */}
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
          <Divider className="my-2" />
          <AmountPlaneItem
            title={"Total Amount"}
            isBold={true}
            needArrow={false}
            amount={""}
            coinValue={""}
          />
        </div>
      </div>
      <div className="absolute bottom-8 left-8 right-8">
        <Button
          onClick={handleConfirm}
          fullWidth
          size="lg"
          className="bg-[#819DF5] rounded-3xl"
        >
          Confirm and Send
        </Button>
      </div>
    </div>
  );
}
