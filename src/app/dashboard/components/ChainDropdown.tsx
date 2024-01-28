"use client"
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";

export default function App() {
  const animals = [
    { label: "Mumbai", value: "mumbai", description: "polygon testnet", icon: "/imgs/polygon.png" },
    { label: "Polygon", value: "polygon", description: "polygon mainnet", icon: "/imgs/polygon.png" },
    { label: "Avalanche", value: "avalanche", description: "avalanche mainnet", icon: "/imgs/ava.png" },
    { label: "Fuji", value: "fuji", description: "avalanche testnet", icon: "/imgs/ava.png" },
  ];
  return (
    <Select
      items={animals}
      label=""
      placeholder="Select Chain"
      className="max-w-xs w-36"
    >
      {(animal) =>
        <SelectItem key={animal.value} className="flex flex-row">
          <div className="flex flex-row gap-x-2">
            <Image src={animal.icon} alt="chain icon" width={20} height={20} />
            <div className="truncate">{animal.label}</div>
          </div>
        </SelectItem>}
    </Select>
  );
}