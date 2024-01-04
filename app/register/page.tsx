'use client'
import {Button} from '@nextui-org/button';
import Header from '@/components/Header'
import PasswordInput from '@/components/PasswordInput'
import {Input} from "@nextui-org/react";
import { useState } from 'react';

const Register = () => {

    const [code, setCode] = useState('')

    return (
        <div className='h-full bg-[url(/imgs/bg.png)]'>
            <Header title='Sign Up' />
            <div className='mian p-[32px]'>
                <PasswordInput className='mb-[30px]' label="Password" />
                <PasswordInput className='mb-[30px]' label="Confirm Password" />
                <Input
                    isClearable
                    type="email"
                    label="Email"
                    variant="bordered"
                    onClear={() => console.log("input cleared")}
                    className='mb-[30px]'
                />
                <div className='flex items-center'>
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
                    <Button size="lg" className='w-[120px] text-white p-7 ml-4 bg-[#819DF5]'>Send</Button>
                </div>
            </div>
            <div className='absolute bottom-[120px] left-0 right-0 p-[32px] text-[12px]'>
                <div className='mb-4 text-center opacity-80'>By proceeding, you agree to our <span className='text-white font-bold'>Term and Conditions</span></div>
                <Button fullWidth size="lg" className='bg-[#819DF5] rounded-[80px]'>Register</Button>
            </div>
        </div>
    )
}
export default Register