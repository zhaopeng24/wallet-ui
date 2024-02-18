"use client";

import MainLayout from "@/components/basic/MainLayout";
import Header from "@/components/Header";
import React from "react";
import MessageWrapper from "@/app/chat/components/MessageWrapper";
import {Button} from "@nextui-org/button";
import ProfileTransaction from "@/components/ProfileTransaction/ProfileTransaction";
import TransactionInfo from "@/components/TransactionInfo/TransactionInfo";

const ChatPage = () => {
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <MainLayout>
      {currentStep === 0 && (
        <>
          <Header title="Chat" />
          <MessageWrapper>
            <p>Launch a transfer</p>
            <Button
              fullWidth
              size="lg"
              className="bg-[#819DF5]/10 rounded-3xl mt-4"
              onClick={() => setCurrentStep(1)}
            >
              Confirm
            </Button>
          </MessageWrapper>
        </>
      )}
      {currentStep === 1 && (
        <>
          <Header title="Best Solution" />
          <p>Sending 1000 USDC to Alice</p>
          <ProfileTransaction
            amount={1000}
            currency="USDC"
            name="Alice"
            profileImageSrc=""
          />
          <TransactionInfo
            chainIconSrc="https://picsum.photos/24"
            estTime="10s~30s"
            transactionFee="0.24~0.38"
            transactionFeeCurrency="USDC"
          />
          <ProfileTransaction
            amount={1000}
            currency="USDC"
            name="Alice"
            transactionIn
            profileImageSrc=""
          />
        </>
      )}
    </MainLayout>
  );
}

export default ChatPage