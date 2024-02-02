"use client"
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";

export default function App() {
  const chains = [
    { label: "Mumbai", value: "mumbai", description: "polygon testnet", icon: "/imgs/polygon.png" },
    { label: "Polygon", value: "polygon", description: "polygon mainnet", icon: "/imgs/polygon.png" },
    { label: "Avalanche", value: "avalanche", description: "avalanche mainnet", icon: "/imgs/ava.png" },
    { label: "Fuji", value: "fuji", description: "avalanche testnet", icon: "/imgs/ava.png" },
  ];
  return (
    <Select
      items={chains}
      label="Select a Chain"
      placeholder=""
      className="max-w-xs w-36"
      radius="full"
      defaultSelectedKeys={chains[0].label}
    >
      {chains.map((item, index) => (
        <SelectItem key={item.value} className="flex flex-row" value={item.label}>
          <div className="flex flex-row gap-x-2">
            <Image src={item.icon} alt="chain icon" width={20} height={20} />
            <div className="truncate">{item.label}</div>
          </div>
        </SelectItem>
      ))}
      {/* <SelectItem key={item.value} className="flex flex-row" value={item.label}>
          <div className="flex flex-row gap-x-2">
            <Image src={item.icon} alt="chain icon" width={20} height={20} />
            <div className="truncate">{item.label}</div>
          </div>
        </SelectItem> */}
    </Select>
  );
}