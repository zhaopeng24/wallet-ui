'use client';
import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import Header from '@/components/Header';
import { classNames } from '@/utils/classNames';
import { LoadingContext } from '@/app/providers';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import FullScreenLoading from '@/components/FullScreenLoading';
import { Image, Textarea } from '@nextui-org/react';
import { IConversations, EMessage, IResult } from './tyeps';
import DefaultMessage from './components/DefaultMessage';
import MessageItem from './components/MessageItem';
import { chatInitApi, chatApi, vertifyWalletBalanceApi } from '@/api/demand';
import { CtxBalanceReq, ChainBalances, BalanceInfo } from '@/api/types/demand';
import { useChains } from '@/store/useChains';
import { useAddress } from '@/store/useAddress';

const CIDNAME = 'X-Smartwallet-Cid';

const DemandChatPage = () => {
	const router = useRouter();
	const { setLoading } = useContext(LoadingContext);
	const msgContainerRef = useRef<HTMLDivElement>(null);
	// 输入的信息
	const [inputDemand, setInputDemand] = useState<string>('');

	const [chatHeader, setChatHeader] = useState<{ [CIDNAME]: string }>({ [CIDNAME]: '' });
	const { chains, balances } = useChains((state) => state);
	const { currentAddress, addressList } = useAddress((state) => state);
	const [assetBalance, setAssetBalance] = useState<ChainBalances>({}); // 资产余额
	const cacheChainMap = new Map();

	// const balances: ChainBalances = useMemo(() => {});

	const getTokenName = (chainName: string, tokenId: number) => {
		const cacheTokenName = cacheChainMap.get(`${chainName}-${tokenId}`);
		if (cacheTokenName) return cacheTokenName;
		// 做个缓存
		const targetChain = chains.find((chain) => chain.name == chainName);
		if (!targetChain) return '';
		const targetToken = targetChain.tokens.find((token) => token.tokenId == tokenId);
		if (!targetToken) return '';
		cacheChainMap.set(`${chainName}-${tokenId}`, targetToken.name);
		return targetToken.name;
	};
	const convert2balances = () => {
		const _balances: ChainBalances = {};
		// 找当前链的
		balances.forEach((chain) => {
			const chainName = chain.chainName;
			const _tokenList: BalanceInfo[] = [];
			chain.tokenBalance.forEach((token) => {
				// 获取每个chain的balance
				// 根据 chainName 和 tokenid 找到 tokenname
				const tokenName = getTokenName(chainName, token.tokenId);
				_tokenList.push({
					balance: Number(token.amount),
					symbol: tokenName
				});
				_balances[chainName] = _tokenList;
				// 将balance转换成 ChainBalance 类型
			});
		});
		setAssetBalance(_balances);
		console.log(_balances, '_balances');
		return _balances;
	};
	// 获取evm地址
	const vertifyWalletBalance = async () => {
		if (!currentAddress) return false;
		const param: CtxBalanceReq = {
			address: currentAddress || '',
			// 目前固定写死 mumbai
			baseChain: 'mumbai',
			balances: assetBalance
		};
		console.log(chatHeader, 'header');
		const { status, body } = await vertifyWalletBalanceApi(param, chatHeader);
		console.log(status, 'status');
		console.log(body, 'body');
		if (status && status === 200) {
			return true;
		} else {
			return false;
		}
	};
	useEffect(() => {
		initChatCid();
		console.log(chains, 'chains chains');
		console.log(balances, 'balances balances');
		console.log(currentAddress, 'currentAddress currentAddress');
		setTimeout(() => {
			convert2balances();
		}, 100);
	}, [chains, balances]);

	// const defaultMessage = ''
	const [conversation, setConversation] = useState<IConversations[]>([]);

	const initChatCid = async () => {
		const { status, body } = await chatInitApi();
		console.log(body!.cid, 'body!.cid');
		setChatHeader({
			[CIDNAME]: body!.cid
		});
	};

	const handleRequest = async (inputDemandText: string) => {
		const res = await vertifyWalletBalance();
		
		if (!res) return false;
		const { status, body } = await chatApi(inputDemandText, chatHeader);
		console.log(status, 'handleRequest status');
		console.log(body, 'handleRequest body');
		const { category, detail } = body as IResult;
		
	// 	const detail1 = {
	// 			"reply": "Ok I will transfer 30 USDC to 0x5134F00C95b8e794db38E1eE39397d8086cee7Ed on mumbai",
	// 			"ops": [
	// 					{
	// 							"type": "chain-internal-transfer",
	// 							"raw_response": "",
	// 							"source_chain": "mumbai",
	// 							"token": "USDC",
	// 							"amount": "30",
	// 							"receiver": "0x5134F00C95b8e794db38E1eE39397d8086cee7Ed",
	// 							"target_chain": "mumbai"
	// 					}
	// 			]
	// 	}
	// 	const detail2 = {
	// 		"type": "swap",
	// 		"raw_response": null,
	// 		"source_token": "MATIC",
	// 		"target_token": "SWT",
	// 		"dex": "uniswap",
	// 		"swap_in": "",
	// 		"swap_out": "1"
	// }

	// const detail = detail1;
		const { ops, reply} = detail;

		if (!ops || !ops.length) {
			const newMsg = { content: reply, msgType: EMessage.MSG, response: detail };
			setConversation((pre) => [...pre, newMsg]);
		} else {
			// 目前只考虑第一种策略
			const targetOp = ops[0];
			let msgType;
			switch (targetOp.type) {
				case EMessage.SWAP:
					msgType = EMessage.SWAP;
					break;
				case EMessage.TRANSFER:
					msgType = EMessage.TRANSFER;
					break;
				case EMessage.CROSSCHAIN:
					msgType = EMessage.CROSSCHAIN;
					break;
				default:
					// 处理未知类型
					break;
			}
			const newMsg = { content: reply, msgType: msgType, response: detail  };
			setConversation((pre) => [...pre, newMsg]);
		}
		
	};
	const handleCommandCb = (command: string) => {
		const commandMsg = { content: command };
		setConversation((pre) => [...pre, commandMsg]);
		setTimeout(() => {
			console.log(conversation, 'conversation');
			handleRequest(command);
		}, 500);
	};

	const handleEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		// event.preventDefault();
		if (!inputDemand.trim()) return false;

		if (event.key === 'Enter') {
			const question = { content: inputDemand };
			const user = inputDemand.match(/to (\w+)$/);
			const inputWithoutName = inputDemand.match(/^(.*?) to \w+$/);

			setInputDemand('');
			setConversation((pre) => [...pre, question]);
			handleRequest(inputDemand);
		}
	};

	const handleCommingSoon = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		toast((t) => <span className='text-xs text-[#1C2F04]'>Comming soon...</span>, {
			style: { borderRadius: '10px', marginTop: '20px' },
			duration: 2000
		});
	};

	const confirmTx = async (detail: IResult["detail"]) => {
		const tagetOp = detail.ops && detail.ops[0];
		const targetChain = chains.find((chain) => chain.name == tagetOp.source_chain);
		if (!targetChain) return '';
		const targetToken = targetChain.tokens.find((token) => token.name == tagetOp.token);
		if (!targetToken) return '';

		sessionStorage.setItem("transfer_amount", tagetOp.amount); // 转账数量
		sessionStorage.setItem("transfer_address", tagetOp.receiver); // 转账地址
		sessionStorage.setItem("transfer_name", ""); // 转账名称
		sessionStorage.setItem("transfer_tokenId", targetToken.tokenId.toString()); // 转账tokenId
		sessionStorage.setItem("transfer_chainId", targetChain.ID.toString()); // 转账chainId
		// 这里主要逻辑为跳转
		const routerQuery = {};
		setTimeout(() => {
				router.push('/transfer_function/confirmation', routerQuery);
		}, 100);
	};

	const confirmCrossChain = async () => {
		// 这里主要逻辑为跳转
	};

	useEffect(() => {
		if (msgContainerRef.current) {
			msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
		}
	}, [inputDemand, conversation]);

	return (
		<div className='h-full flex flex-col bg-[url(/imgs/bg.png)]'>
			<Header title='Chat' showBack={true} />
			{/* {isLoading ? <FullScreenLoading /> : ''} */}
			<div className={`mian rounded-lg  overflow-y-auto pb-[60px] flex-1`} ref={msgContainerRef}>
				<DefaultMessage commandCb={handleCommandCb} />

				<div className='msg-container'>
					{conversation.map((item, index) => (
						<MessageItem
							key={index}
							content={item.content}
							msgType={item.msgType}
							response={item.response}
							handleConfirmTx={confirmTx}
							handleConfirmCrossChain={confirmCrossChain}
						/>
					))}
				</div>
			</div>
			<div className='bg-[#0E1422] fixed bottom-0 w-full flex flex-row items-center p-4 z-100'>
				<div className='flex-1 mr-4 text-opacity-50 '>
					<Textarea
						className='text-blue-500 text-opacity-50 bg-opacity-10 leading-snug'
						radius='sm'
						value={inputDemand.trim()}
						onClear={() => setInputDemand('')}
						minRows={1}
						maxRows={6}
						placeholder='Specify your demand here'
						onValueChange={setInputDemand}
						onKeyDown={handleEnter}
					/>
				</div>
				<div onClick={handleCommingSoon}>
					<Image className='' src={`/imgs/demand-microphone.png`} alt='microphone' />
				</div>
			</div>
			<Toaster />
		</div>
	);
};
export default DemandChatPage;
