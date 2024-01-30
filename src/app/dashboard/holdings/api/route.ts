export async function GET(request: Request) {
  try {
    // const res = await fetch("", { cache: 'no-store' })
    const dataR = {
      chainId: 1,
      address: "0x61f8a7B1634F3AfD82c13F01b995187432E85eEf"
    }
    const res = await fetch("https://asset-dev.web3idea.xyz/api/v1/balance", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(dataR)
    })
    const data = await res.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({})
  }
}