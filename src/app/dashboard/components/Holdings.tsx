import Link from "next/link"
import LinkArrowSVG from "@/components/Icons/LinkArrow"
import Image from "next/image"

interface ItemProps {
  chain: string
  symbol: string
  amount: string
  usdValue: string
  children: React.ReactNode
}

export default function Holdings({ tokenBalance, chains }: { tokenBalance: any[], chains?: any[] }) {
  // const chainx = [
  //   {
  //     "ID": 1,
  //     "CreatedAt": "0001-01-01T00:00:00Z",
  //     "UpdatedAt": "0001-01-01T00:00:00Z",
  //     "DeletedAt": null,
  //     "netWorkId": 80001,
  //     "name": "mumbai",
  //     "tokens": [
  //       {
  //         "tokenId": 1,
  //         "name": "Matic",
  //         "fee": 1,
  //         "decimal": 18,
  //         "icon": "https://decentralized-storage-01.web3idea.xyz/key-dev/e5050c88-aa09-11ee-8ed7-3a18f1674f7f"
  //       },
  //       {
  //         "tokenId": 2,
  //         "name": "SWT",
  //         "type": 1,
  //         "fee": 1,
  //         "address": "0x4B63443E5eeecE233AADEC1359254c5C601fB7f4",
  //         "decimal": 18,
  //         "icon": "https://decentralized-storage-01.web3idea.xyz/key-dev/e5050c88-aa09-11ee-8ed7-3a18f1674f7f"
  //       },
  //       {
  //         "tokenId": 3,
  //         "name": "USDC",
  //         "type": 1,
  //         "address": "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97",
  //         "decimal": 6,
  //         "icon": "https://decentralized-storage-01.web3idea.xyz/key-dev/e5050c88-aa09-11ee-8ed7-3a18f1674f7f"
  //       }
  //     ],
  //     "erc4337ContractAddress": {
  //       "simpleAccountFactory": "0x57811fb5ea260740244fc81f421a5Ca156c78060",
  //       "tokenPaymaster": {
  //         "swt": "0x0F1499cBB313492a164e93f2c5a35a35246d030E"
  //       },
  //       "entrypoint": "0xD79b0817A1Aeb55042d7b10bD25f99F17239333a"
  //     },
  //     "rpcApi": "https://mumbai-rpc.web3idea.xyz",
  //     "bundlerApi": "https://bundler.web3idea.xyz/mumbai",
  //     "blockScanUrl": "https://mumbai.polygonscan.com/tx/",
  //     "apiType": 1,
  //     "produceBlock24h": 28800
  //   },
  //   {
  //     "ID": 2,
  //     "CreatedAt": "0001-01-01T00:00:00Z",
  //     "UpdatedAt": "0001-01-01T00:00:00Z",
  //     "DeletedAt": null,
  //     "netWorkId": 43113,
  //     "name": "fuji",
  //     "tokens": [
  //       {
  //         "tokenId": 1,
  //         "name": "AVAX",
  //         "fee": 1,
  //         "decimal": 18,
  //         "icon": "https://decentralized-storage-01.web3idea.xyz/key-dev/e5050c88-aa09-11ee-8ed7-3a18f1674f7f"
  //       },
  //       {
  //         "tokenId": 2,
  //         "name": "SWT",
  //         "type": 1,
  //         "fee": 1,
  //         "address": "0x4B63443E5eeecE233AADEC1359254c5C601fB7f4",
  //         "decimal": 18,
  //         "icon": "https://decentralized-storage-01.web3idea.xyz/key-dev/e5050c88-aa09-11ee-8ed7-3a18f1674f7f"
  //       },
  //       {
  //         "tokenId": 3,
  //         "name": "USDC",
  //         "type": 1,
  //         "address": "0x5425890298aed601595a70AB815c96711a31Bc65",
  //         "decimal": 6,
  //         "icon": "https://decentralized-storage-01.web3idea.xyz/key-dev/e5050c88-aa09-11ee-8ed7-3a18f1674f7f"
  //       }
  //     ],
  //     "erc4337ContractAddress": {
  //       "simpleAccountFactory": "0xc3E0A55109c032328F67202c020f7Da2Fddd8B8a",
  //       "tokenPaymaster": {
  //         "swt": "0x188cEaFf80D32373C52837e162A52c82484D3A6b"
  //       },
  //       "entrypoint": "0x4B63443E5eeecE233AADEC1359254c5C601fB7f4"
  //     },
  //     "rpcApi": "https://api.avax-test.network/ext/C/rpc",
  //     "bundlerApi": "https://bundler.web3idea.xyz/fuji",
  //     "blockScanUrl": "https://testnet.snowtrace.io/tx/",
  //     "apiType": 2,
  //     "produceBlock24h": 28800
  //   }
  // ]
  const chainList = chains?.reduce((acc, chain) => {
    acc[chain.ID] = chain.tokens.reduce((tokenAcc, token) => {
      tokenAcc[token.tokenId] = {
        name: token.name,
        icon: token.icon,
      };
      return tokenAcc;
    }, {} as { [key: number]: any });
    return acc;
  }, {});
  // console.log(`the obj is ${JSON.stringify(chainList, null, 2)}`)
  return (
    <div className="w-full px-8">
      {tokenBalance?.map((item, index) => (

        <Item key={index}
          chain={chainList[item.chainId as number][item.tokenId as number].name}
          symbol={"---"}
          amount={item.amount}
          usdValue={item.usdValue}
        >
          <Image width={45} height={45} src={chainList[item.chainId as number][item.tokenId as number]?.icon} alt="chain logo" />
        </Item>        
      ))}      
    </div>
  )
}


function Item({ chain, symbol, amount, usdValue, children }: ItemProps) {
  return (
    <>
      <div className="flex flex-row justify-between py-5">
        <div className="flex flex-row gap-x-5">
          {children}
          <div className="flex flex-col">
            <span className="text-md">{chain}</span>
            <span className="text-[#819DF580]">{symbol}</span>
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          <div>
            <div>$ {usdValue.slice(0, 5)} </div>
            <div className="text-sm text-[#819DF580]">{amount.slice(0, 5)} usd</div>
          </div>
          <div className="flex items-center justify-center">
            <Link href={`/holdings/${chain}`} className="w-full h-full">
              <LinkArrowSVG />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}