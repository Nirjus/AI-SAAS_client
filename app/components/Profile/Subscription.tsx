"use client"
import { useCheckSubscriptionQuery, useCreateCheckoutQuery } from '@/redux/features/subscription/subscriptionApi';
import { Verified, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
  isPro: boolean;
}

const Subscription = ({isPro}: Props) => {
 const [loading, setLoading] = useState(true);
 const {isSuccess, data, error} = useCreateCheckoutQuery(undefined, {
  skip: loading ? true : false
 })
 const onSubscribe = async () => {
  setLoading(false);
}
 useEffect(() => {
  if(isSuccess){
    window.location.href = data?.url;
  }
  if(error){
    if("data" in error){
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }

 },[ isSuccess, error, data])

  return (
    <div>
      <h1 className=' text-center 800px:text-[25px] text-[18px] font-semibold font-Poppins'>Your Subscription plan</h1>
      <div className=' 800px:w-[90%] w-full min-h-[250px] m-auto mt-6 800px:p-6 p-3 border border-[#91919184]'>
           <div className=' px-4 lg:px-8 space-y-4'>
         <div className=' border p-2 border-[#87878782]'>
            <p className=' 800px:text-[20px] text-[16px] font-Poppins font-semibold text-black dark:text-white'>
              {
                isPro ? <p className=' flex gap-2 items-center'>You are currently on a Pro plan <Verified fill='blue' className=' text-white' /></p> : "You are currently on free plan"
              }
              </p>
         </div>
         <div className=' pt-5'>
            <button className=' flex justify-center items-center gap-2 p-3 px-4 bg-gradient-to-r from-[#7f24ee] to-[#f91075] text-white rounded active:scale-90 duration-200 transition-all '
            onClick={onSubscribe}
            >
                {
                    isPro ? "Manage Subscription" : "Upgrade"
                }
                <Zap fill={"white"} />
            </button>
         </div>
       </div>
      </div>
    </div>
  )
}

export default Subscription