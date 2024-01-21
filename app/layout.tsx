import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { classNames } from "@/utils/classNames";
import { Menu } from "@/components/Menu";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smarter-Wallet",
  description: "Get your Smarter-Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className={"home h-full"}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
