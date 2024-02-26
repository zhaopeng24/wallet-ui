import { Response, AssetBalance } from "./types/hold"

export async function getAssetBalance(chainId: number, address: string): Promise<Response<AssetBalance>> {
  try {
    // const res = await fetch("", { cache: 'no-store' })
    const dataR = {
      chainId: { chainId },
      address: { address }
    }
    const res = await fetch("https://asset-dev.web3idea.xyz/api/v1/balance", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(dataR)
    })
    const data: Response<AssetBalance> = await res.json()
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getV1Config() {
  try {
    const res = await fetch("https://asset-dev.web3idea.xyz/api/v1/package");
    const data = await res.json()
    return data
  } catch (error) {
    console.log('get config error')
  }
}

export async function getTxDetail(chainId: number, address: string) {
  try {
    const dataR = {
      "chainId": 1,
      "address": "0x61f8a7B1634F3AfD82c13F01b995187432E85eEf",
    }
    const res = await fetch("https://asset-dev.web3idea.xyz/api/v1/tx/list", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(dataR),
      redirect: 'follow'
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(`this is get tx detail error ${error}`)
  }
}
export async function getTxList(chainId: number, address: string) {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Host", "asset-dev.web3idea.xyz");
  myHeaders.append("Connection", "keep-alive");

  var raw = JSON.stringify({
    "chainId": chainId,
    "address": "0x61f8a7B1634F3AfD82c13F01b995187432E85eEf"
  });


  const res = await fetch("https://asset-dev.web3idea.xyz/api/v1/tx/list", {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })

  const data = await res.json()
  return data
}