import { getTxDetail, getV1Config, getAssetBalance, getTxList } from "@/api/hold";

export async function GET(request: Request) {
  try {    
    const res = await getTxList(1, "")
    // const data = await res?.json()
    return Response.json(res)
  } catch (error) {

  }
}