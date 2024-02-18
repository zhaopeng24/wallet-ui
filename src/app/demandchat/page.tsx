'use client';
import { useContext, useEffect, useState, useRef } from 'react';
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

const DemandChatPage = () => {
	const router = useRouter();
	const { setLoading } = useContext(LoadingContext);
	const msgContainerRef = useRef<HTMLDivElement>(null);
	// 输入的信息
	const [inputDemand, setInputDemand] = useState<string>('');
	// const defaultMessage = ''
	const [conversation, setConversation] = useState<IConversations[]>([]);

	const handleRequest = async () => {
		// const {result} = awa
		const result: IResult = {
			category: 'crossChainAbstraction',
			detail: {
				reply: 'Ok I will transfer 50 USDC to 0x5134F00C95b8e794db38E1eE39397d8086cee7Ed from Goerli to Fuji, and transfer 50 USDC to 0x5134F00C95b8e794db38E1eE39397d8086cee7Ed on Fuji',
				ops: [
					{
						type: 'chain-internal-transfer',
						source_chain: 'Fuji',
						token: 'USDC',
						amount: '50',
						receiver: '0x5134F00C95b8e794db38E1eE39397d8086cee7Ed',
						target_chain: 'Fuji'
					},
					{
						type: 'cross-chain-transfer',
						source_chain: 'Goerli',
						token: 'USDC',
						amount: '50',
						receiver: '0x5134F00C95b8e794db38E1eE39397d8086cee7Ed',
						target_chain: 'Fuji'
					}
				]
			}
		};
		// 模拟回复
		const { category, detail } = result;
		if (category === EMessage.CROSSCHAIN) {
			const newConversation: IConversations = {
				content: detail.reply,
				msgType: EMessage.CROSSCHAIN,
				response: result
			};
			setConversation((pre) => [...pre, newConversation]);
		}

		// setTimeout(() => {
		// 	const response = {
		// 		content:
		// 			'OK, I can launch a transfer transaction for you to help you send 1000 USDC to Alice (0x4F4aB...76e1B) on Ethereum Mainnet',
		// 		msgType: EMessage.TRANSFER,
		// 		result: true
		// 	};
		// 	const response1 = {
		// 		content:
		// 			'As you only have ETH on Ethereum, I will swap your ETH to 1000 USDC and send to Alice (0x19...cc63 on Avalance) cross chain',
		// 		msgType: EMessage.CROSSCHAIN,
		// 		isResponse: true
		// 	};
		// 	setConversation((pre) => [...pre, Math.random() > 0.5 ? response : response1]);
		// }, 1000);
	};
	const handleCommandCb = (command: string) => {
		const commandMsg = { content: command };
		setConversation((pre) => [...pre, commandMsg]);
		setTimeout(() => {
			console.log(conversation, 'conversation');
			handleRequest();
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
			// 模拟回复
			handleRequest();
		}
	};

	const handleCommingSoon = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		toast((t) => <span className='text-xs text-[#1C2F04]'>Comming soon...</span>, {
			style: { borderRadius: '10px', marginTop: '20px' },
			duration: 2000
		});
	};

	const confirmTx = async () => {
		// 这里主要逻辑为跳转
		const routerQuery = {};
		router.push('/transfer', routerQuery);
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
			<Header title='Chat' showBack={false} />
			{/* {isLoading ? <FullScreenLoading /> : ''} */}
			{/* p-4 m-4 */}
			<div className={`mian rounded-lg  overflow-y-auto pb-[60px] flex-1`} ref={msgContainerRef}>
				<DefaultMessage commandCb={handleCommandCb} />

				<div className='msg-container'>
					{conversation.map((item, index) => (
						<MessageItem
							key={index}
							content={item.content}
							msgType={item.msgType}
							handleConfirmTx={confirmTx}
							handleConfirmCrossChain={confirmCrossChain}
						/>
					))}
				</div>
			</div>
			<div className='bg-[#0E1422] fixed bottom-0 w-full flex flex-row items-center p-4 z-100'>
				<div className='flex-1 mr-4 text-opacity-50 '>
					{/* variant='bordered' */}
					<Textarea
						className='text-blue-500 text-opacity-50 bg-opacity-10 leading-6'
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
