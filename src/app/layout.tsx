import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { classNames } from "@/utils/classNames";
import { Menu } from "@/components/Menu";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Smarter-Wallet",
  description: "Get your Smarter-Wallet",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en" className="dark min-h-[900px]">
      <body
        className={classNames(
          inter.className,
          "sm:flex sm:items-center sm:justify-center"
        )}
      >
        <div className={"sm:w-[400px] sm:min-h-[900px] h-full rounded-lg"}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
