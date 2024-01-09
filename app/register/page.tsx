"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading';
import SignUp from '../components/Auth/SignUp';

type Props = {}

const Registers = (props: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
  return (
    <>
    <Heading title='Register - AI-Studio' description='Register your self to our portal' keyword='Registration portal' />
     <div className=' bg-[#ebebeb] dark:bg-[#0f063485] w-full h-screen flex justify-center items-center '>
         
         <div className=' w-[450px] bg-white dark:bg-[#270350] rounded-[8px] shadow p-4 outline-none'>
         <SignUp setOpen={setOpen} setRoute={setRoute} />
     </div>
     </div>
    </>
  )
}

export default Registers