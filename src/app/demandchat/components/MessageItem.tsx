import { Image, Button } from '@nextui-org/react';
import { MessageItemProps, EMessage } from '../tyeps';

const MessageItem: React.FC<MessageItemProps> = ({ content, msgType, response, handleConfirmTx, handleConfirmCrossChain }) => {
	return (
		<div>
			{msgType ? (
				<div className='relative mb-3 rounded-[16px]'>
					<div className='absolute bottom-0 left-[15px] size-[22px]'>
						<Image className='' src={`/imgs/msg-prefix.png`} alt='msg prefix' />
					</div>
					<div className='rounded-lg px-5 py-4 m-6 bg-[#0E1437]'>
						{content}
						{ msgType === EMessage.TRANSFER  && (
							<div className='w-auto flex mt-2'>
								<Button
									fullWidth
									radius='full'
									className='bg-[#819DF5] bg-opacity-10 text-white'
									onClick={e => handleConfirmTx(response)}
								>
									Confirm
								</Button>
							</div>
						)}
						{(msgType === EMessage.SWAP || msgType === EMessage.CROSSCHAIN) && (
							<div className='w-auto flex mt-2'>
								<Button
									fullWidth
									radius='md'
									className='bg-[#456ADE] text-white'
									onClick={ e => handleConfirmCrossChain(response)}
								>
									ok
								</Button>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className='flex flex-col mb-4 mx-5'>
					<div className='flex-1'>
						<div className='flex justify-end'>
							<div
								style={{
									wordWrap: 'break-word'
								}}
								className='max-w-full inline-block bg-[#456ADE] px-7 py-2 whitespace-normal rounded-lg text-white text-[14px] leading-6'
							>
								{content}
							</div>
						</div>
					</div>
				</div>
			)}{' '}
		</div>
	);
};

export default MessageItem;
