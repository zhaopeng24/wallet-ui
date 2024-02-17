"use client";

import MainLayout from "@/components/basic/MainLayout";
import Header from "@/components/Header";
import React from "react";
import MessageWrapper from "@/app/chat/components/MessageWrapper";

const ChatPage = () => {
  return (
    <MainLayout>
      <Header title="Chat" />
      <MessageWrapper>
        test
      </MessageWrapper>
    </MainLayout>
  );
}

export default ChatPage