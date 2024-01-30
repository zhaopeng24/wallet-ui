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

}