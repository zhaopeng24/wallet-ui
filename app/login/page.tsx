'use client'
import Header from '@/components/Header'
import PasswordInput from '@/components/PasswordInput'
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useContext, useState } from 'react';
import { LoadingContext } from '@/app/providers'
import EmailInput from '@/components/EmailInput';
import { EmailPattern } from '@/consts/pattern';
import { SendEmailCode } from '@/server/register';
import toast, { Toaster } from 'react-hot-toast';
import { Global } from '@/server/Global';
import { MPCManageAccount } from '@/server/account/MPCManageAccount';
import { JSONBigInt } from '@/server/js/common_utils';
import Link from 'next/link';
import { AccountInterface } from '@/server/account/AccountInterface';
import { Login } from '@/server/login';
import { useRouter } from 'next/navigation';

export default () => {
    const router = useRouter()
    const [password, setPasswork] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const { setLoading } = useContext(LoadingContext)
    
    function handleLoginBtnClick() {
        // 检查值
        if (!email) {
            // 邮箱不能为空
            toast(
                (t) => (
                    <span className="text-xs text-[#1C2F04]">
                        Please enter your email address
                    </span>
                ),
                { style: { borderRadius: '10px', marginTop: '20px' }, duration: 2000 },
            );
            return
        }
        if (!code) {
            // 验证码不能为空
            toast(
                (t) => (
                    <span className="text-xs text-[#1C2F04]">
                        Please enter code
                    </span>
                ),
                { style: { borderRadius: '10px', marginTop: '20px' }, duration: 2000 },
            );
            return
        }
        debugger
        mpcLogin()
        // 分步骤调用接口
    }

    const getLocalMPCKey = (mpcAccount: AccountInterface, mpcPassword: any) => {
        try {
          const mpcKey1 = mpcAccount.getKeyFromLocalStorage(mpcPassword);
          if (mpcKey1 == null || mpcKey1 === '') {
            // message.error('Local password incorrect');
            return '';
          }
          return mpcKey1;
        } catch (e) {
        //   message.error('Local password incorrect');
          return '';
        }
      };
      
    const mpcLogin = async () => {
        try {
            setLoading(true, 'login...');
        //   await Global.changeAccountType(2);
          const mpcAccount = Global.account as MPCManageAccount;
          setLoading(true, 'Decrpty local MPC key...');
          
          const mpcPassword = password.trim();
          const mpcKey1 = getLocalMPCKey(mpcAccount, mpcPassword);
          if (mpcKey1 == null || mpcKey1 === '') {
            setLoading(false);
            return;
          }
          
          setLoading(true, 'Login wallet server...');
          const result = await Login(email, code)
          if (result.body['code'] != 200) {
            // message.error(result.body['message']);
            return;
          }
          setLoading(true, 'Init local MPC key...');
          Global.authorization = result.body['result'];
          Global.account.initAccount(JSONBigInt.stringify(mpcKey1));
          
          setLoading(true, 'Jump to home page');
          console.log('result.body result:', result.body['result']);
          localStorage.setItem('email', email);
          Global.account.isLoggedIn = true;
          router.push('/home');
        } catch (error: any) {
        //   message.error((error as Error).message);
          return;
        }
      };

    async function handleSendCode() {
        console.log(email)
        if (!email) {
            // 邮箱不能为空
            return
        }
        if (email.match(EmailPattern)) {
            const res = await SendEmailCode(email)
            console.log(res)
        } else {
            // 邮箱格式不正确
            return
        }
    }

    return (
        <div className='h-full bg-[url(/imgs/bg.png)]'>
            <Header title='Login' />
            <div className='mian p-8'>
                <PasswordInput value={password} onValueChange={setPasswork} className='mb-6' label="Password" />
                <EmailInput
                    value={email}
                    onValueChange={setEmail}
                    label="Email"
                    onClear={() => setEmail('')}
                    className='mb-6'
                />
                <div className='flex items-center mb-6'>
                    <Input
                        isClearable
                        type="text"
                        value={code}
                        label="Code"
                        variant="bordered"
                        onClear={() => setCode('')}
                        className="flex-1"
                        maxLength={6}
                        onValueChange={setCode}
                    />
                    <Button onClick={handleSendCode} size="lg" className='w-32 text-white p-7 ml-4 bg-[#819DF5]'>Send</Button>
                </div>
                <div className='text-[#819DF5] text-xs text-right'>Login on another device?</div>
            </div>
            <div className='mt-8 p-8 text-xs'>
                <div className='mb-4 text-center'><span className='opacity-50'>Don`t have an account? </span> <Link href={'/register'}><span className='text-white'>Sign Up</span></Link> </div>
                <Button fullWidth size="lg" className='bg-[#819DF5] rounded-3xl' onClick={handleLoginBtnClick}>Login</Button>
            </div>
            <Toaster />
        </div>
    )
}