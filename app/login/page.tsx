"use client"
import React, { useState } from 'react'
import Login from '../components/Auth/Login'
import Heading from '../utils/Heading'

type Props = {}

const Logins = (props: Props) => {
    const [route, setRoute] = useState("Login");
  return (
   <>
   <Heading title='Login - AI-Studio' description='Login to our portal' keyword='login portal' />
    <div className=' bg-[#ebebeb] dark:bg-[#0f063485] w-full h-screen flex justify-center items-center '>
        
        <div className=' w-[450px] bg-white dark:bg-[#270350] rounded-[8px] shadow p-4 outline-none'>
        <Login setRoute={setRoute} />
    </div>
    </div>
   </>
  )
}

export default Logins