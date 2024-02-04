'use client';
import Header from '@/components/Header';
import { classNames } from '@/utils/classNames';
import Style from './style.module.scss';
import { Button } from '@nextui-org/button';
import { useContext, useState } from 'react';
import { LoadingContext } from '@/app/providers';
import toast, { Toaster } from 'react-hot-toast';
import { Global } from '@/server/Global';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Image } from '@nextui-org/react';
import { getAssetBalance } from '@/api/hold';
import { useClientFetchData } from '@/lib/hooks/useClientFetchData';
import { Response, AssetBalance } from '@/api/types/hold';
import FullScreenLoading from '@/components/FullScreenLoading';
import { Menu } from '@/components/Menu';

const DemandPage = () => {
	const router = useRouter();
	const { setLoading } = useContext(LoadingContext);
	const [balance, setBalance] = useState(236.45);
	// if (!Global.account.isLoggedIn) {
	//   message.error('Please loginsignin first');
	//   return <Navigate to="/" replace />;
	// }

	const handleTransfer = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		router.push('/transfer');
	};

	const handleCommingSoon = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		toast((t) => <span className='text-xs text-[#1C2F04]'>Comming soon...</span>, {
			style: { borderRadius: '10px', marginTop: '20px' },
			duration: 2000
		});
	};

	// const data = [{}, {}];
	const data = [
		{ id: 'transfer', label: 'Transfer', icon: 'demand-transfer', func: handleTransfer },
		{ id: 'receive', label: 'Receive', icon: 'demand-receive', func: handleCommingSoon },
		{ id: 'earn', label: 'Earn', icon: 'demand-earn', func: handleCommingSoon },
		{ id: 'pay', label: 'Pay', icon: 'demand-pay', func: handleCommingSoon },
		{ id: 'play', label: 'Play', icon: 'demand-play', func: handleCommingSoon },
		{ id: 'social', label: 'Social', icon: 'demand-social', func: handleCommingSoon }
	];

	const radius8 = {
		borderRadius: '0 8px 0 8px'
	};

	const { isLoading, result } = useClientFetchData<Response<AssetBalance>>(getAssetBalance, {
		chainId: 1,
		address: '0x61f8a7B1634F3AfD82c13F01b995187432E85eEf'
	});

	return (
		<div className='h-full bg-[url(/imgs/bg.png)]'>
			<Header title='Demand' showBack={false} />
			{/* {isLoading ? <FullScreenLoading /> : ''} */}
			<div className={classNames(`${Style.transaction} mian p-4 m-4 rounded-lg`)}>
				<div className='text-[#819DF5] text-xs text-center leading-loose'>Deposit your balance</div>
				<div className='text-xl font-normal text-center leading-6 mt-2 mb-4'>$ {balance}</div>
				<div className='text-white text-opacity-50 text-xs text-center leading-tight'>
					Earn stable return everyday
				</div>
				<div className='text-white text-opacity-50 text-xs text-center leading-tight'>
					Retrieve flexibly at any time
				</div>
				<div className={classNames(`${Style.deliver}`)}></div>

				<div className='grid grid-cols-2 gap-4 mt-4'>
					<div className={classNames(`${Style.stakeAnytime} flex flex-col  mb-1 rounded-lg text-center`)}>
						<div className='flex justify-end'>
							<div
								className={classNames(
									`${Style.aprBoxShadow} 
                  flex-end text-xs text-[#479CE8] bg-white w-16 leading-6
                  rounded-8`
								)}
								style={radius8}
							>
								Flexible
							</div>
						</div>
						{/* center */}
						<div className='text-white text-xs text-left mx-auto'>
							<div className='leading-tight'>up to</div>
							<div className='leading-tight'>
								<span className='leading-normal text-[32px]'>5.7%</span>
								<span> APR</span>
							</div>
						</div>
						<div className='m-1 mt-0'>
							<Button
								fullWidth
								className={classNames(
									`${Style.stakeAnytimeBtn} 
                  rounded-lg`
								)}
								onClick={handleCommingSoon}
							>
								stake Now
								<span className='text-[14px] ml-3'> {'>'} </span>
							</Button>
						</div>
					</div>

					<div className={classNames(`${Style.stakeFlexible} flex flex-col  mb-1 rounded-lg text-center`)}>
						<div className='flex justify-end'>
							<div
								className={classNames(
									`${Style.aprBoxShadow} 
                  flex-end text-xs text-[#2FB9B9] bg-white w-16 leading-6
                  rounded-8`
								)}
								style={radius8}
							>
								Term
							</div>
						</div>
						{/* center */}
						<div className='text-white text-xs text-left mx-auto'>
							<div className='leading-tight'>up to</div>
							<div className='leading-tight'>
								<span className='leading-normal text-[32px]'>9.2%</span>
								<span> APR</span>
							</div>
						</div>

						<div className='m-1 mt-0'>
							<Button
								fullWidth
								className={classNames(
									`${Style.stakeFlexibleBtn} 
                  rounded-lg`
								)}
								onClick={handleCommingSoon}
							>
								stake Now
								<span className='text-[14px] ml-3'> {'>'} </span>
							</Button>
						</div>
					</div>
					{/* <div className='flex flex-col items-center mb-1 rounded-lg bg-gray-200'>asdfasdf</div>
                    <div className='flex flex-col items-center mb-1 rounded-lg bg-gray-200'>asdfasdf</div> */}
				</div>
			</div>
			<div className={classNames(`mian p-4 m-4 rounded-lg text-xs`)}>
				<div className='grid grid-cols-4 gap-4 '>
					{data.map((item) => (
						<div key={item.id} className='flex flex-col items-center mb-1' onClick={item.func}>
							<div className={classNames(`rounded-[13px] mb-2 text-center overflow-hidden`)}>
								{/* <Image className='' src={`/imgs/transfer.png`} alt={item.label} /> */}
								<Image
									className='w-full h-full object-cover'
									src={`/imgs/${item.icon}.png`}
									alt={item.label}
								/>
							</div>
							<div className='text-center'>{item.label}</div>
						</div>
					))}
				</div>

				<Link href='/demandchat'>
					<Button
						fullWidth
						size='lg'
						className='mt-4 text-sm flex justify-between rounded-md text-white bg-[#819DF5] bg-opacity-50'
					>
						How can we help?
						<Image className='' src={`/imgs/demand-microphone.png`} alt='microphone' />
					</Button>
				</Link>
			</div>
			<Toaster />
			<Menu />
		</div>
	);
};
export default DemandPage;
