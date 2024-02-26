'use client'
import { Button } from '@nextui-org/button';
import Link from 'next/link';

const Home = () => {

  return (
    <div className='container h-full bg-[url(/imgs/home-bg.png)] bg-cover'>
      <div className='main p-8 mb-32'>
        <img className='w-40 mb-16' src='/imgs/home-logo.png' alt="" />
        <img className='w-44 mb-6' src='/imgs/home-text1.png' alt="" />
        <img className='w-56' src='/imgs/home-text2.png' alt="" />
      </div>
      <div className='flex px-8 opacity-80'>
        <div className='flex-1 text-center text-xs'>
          <img className='inline-block w-9 h-9' src="/imgs/home-demand.png" alt="" />
          <div>Demand</div>
          <div>Abstraction</div>
        </div>
        <div className='flex-1 text-center text-xs'>
          <img className='inline-block w-9 h-9' src="/imgs/home-demand.png" alt="" />
          <div>Account</div>
          <div>Abstraction</div>
        </div>
        <div className='flex-1 text-center text-xs'>
          <img className='inline-block w-9 h-9' src="/imgs/home-demand.png" alt="" />
          <div>Automated</div>
          <div>AI trading bot</div>
        </div>
      </div>
      <div className='p-8 text-xs'>
        <Link href="/login"><Button fullWidth size="lg" className='text-xs bg-white rounded-3xl text-black font-semibold mb-5 '>Login</Button></Link>
        <Link href="/register"><Button fullWidth size="lg" className='text-xs bg-[#819DF5] rounded-3xl font-semibold'>Register</Button></Link>
      </div>
        
    </div>
  )
}
export default Home