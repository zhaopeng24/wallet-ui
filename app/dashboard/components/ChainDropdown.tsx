"use client"
import React from "react";
import {Select, SelectItem} from "@nextui-org/react";


export default function App() {
  const animals = [
    {label: "Mumbai", value: "mumbai", description: "polygon testnet", icon: ""},
    {label: "Polygon", value: "polygon", description: "polygon mainnet", icon: ""},
    {label: "Avalanche", value: "avalanche", description: "avalanche mainnet", icon: ""},
    {label: "Fuji", value: "fuji", description: "avalanche testnet", icon: ""},    
  ];
  return (
    <Select
      items={animals}
      label=""
      placeholder="Select Chain"
      className="max-w-xs"
    >
      {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
    </Select>
  );
}
