"use client"
import React from 'react'
import Heading from '../utils/Heading'
import ForgotPassword from '../components/Auth/ForgotPassword'

type Props = {}

const Page = (props: Props) => {
  return (
   <>
   <Heading title='Forgot-Password - AI-Studio' description='Login to our portal' keyword='login portal' />
   <div className=' bg-[#ebebeb] dark:bg-[#0f063485] w-full h-screen flex justify-center items-center '>
        
        <div className=' w-[450px] bg-white dark:bg-[#270350] rounded-[8px] shadow p-4 outline-none'>
       <ForgotPassword />
    </div>
    </div>
   </>
  )
}

export default Page