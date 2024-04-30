"use client";
import Header from "@/components/Header";
import HistoryIcon from "@/components/Icons/History";
import MainLayout from "@/components/basic/MainLayout";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout showMenu={false}>
      <Header title="Transfer" showBack rightBtn={
        <Link href="transfer">
          <HistoryIcon />
        </Link>
      }></Header>
      {children}
    </MainLayout>
  );
}
