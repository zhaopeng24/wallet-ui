"use client";
import Sent from "./components/Sent";
import Contact from "./components/Contact";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { IChain } from "@/store/useChains";
import { useRouter } from "next/navigation";

export default function Transfer_Function() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState<IChain>();
  const router = useRouter();

  function handleNext() {
    if (address && chain) {
      sessionStorage.setItem("transfer_address", address);
      sessionStorage.setItem("transfer_chainId", chain.ID + "");
      router.push("/transfer_function/chooseToken");
    }
  }
  return (
    <div className="p-6">
      <Sent
        address={address}
        chain={chain}
        setAddress={setAddress}
        setChain={setChain}
      />
      <Contact />
      <div className="absolute bottom-8 left-8 right-8">
        <Button
          onClick={handleNext}
          fullWidth
          size="lg"
          className="bg-[#819DF5] rounded-3xl"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
