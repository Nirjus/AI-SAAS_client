"use client"
import React, { useEffect, useState } from 'react'
import {
    Check,
    Code2Icon,
    ImageIcon,
    MessageSquareDotIcon,
    Music4Icon,
    VideoIcon,
    Zap,
  } from "lucide-react";
import {  useCreateCheckoutQuery } from '@/redux/features/subscription/subscriptionApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
type Props = {
    setOpen: any;
    setRoute: any;
}

const routes = [
   
    {
      label: "Conversation",
      icon: MessageSquareDotIcon,
      active: 2,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10"
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      active: 3,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      active: 4,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      label: "Music Generation",
      icon: Music4Icon,
      active: 5,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      label: "Code Generation",
      icon: Code2Icon,
      active: 6,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

const Promodal = (props: Props) => {
     const [loading, setLoading] = useState(true);
    //  const {user} = useSelector((state: any) => state.auth);
    const {isSuccess,data, error} = useCreateCheckoutQuery(undefined,{
      skip: loading ? true : false
    });
  
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
  },[isSuccess, data, error])
  return (
    <div>
        <div className=' flex justify-center gap-3 items-center'>
           <p className=' text-[20px] font-bold text-black tracking-tight dark:text-white font-Josefin'>Upgrade to AI Studio </p>
           <span className=' text-white tracking-widest uppercase text-[16px] font-Poppins font-semibold bg-gradient-to-r from-[#a039ef] to-[#e02673] px-2 py-1 rounded-[20px]'>pro</span> 
        </div>
       <div className=' mt-5 space-y-1'>
       {
        routes.map((route, index:number) => (
                 <div
              key={index}
              className={`w-full text-sm items-center rounded-lg dark:bg-[#ffffff0a] bg-[#00000006] p-3 flex justify-between
              `} 
            >
           <div className=' flex justify-start text-sm items-center gap-3 '>
           <div className={`${route.bgColor} p-2`}> <route.icon className={`h-5 w-5 ${route.color}`} /></div>
              <p
                className={`font-Poppins text-black dark:text-white text-[14px] font-semibold overflow-hidden `}
              >
                {route.label}
              </p>
           </div>
              <Check className=' text-black dark:text-white' />
            </div>
        ))
       }
       </div>
       <div className=' mt-4 px-5'>
       <button className="  flex gap-2 justify-center items-center w-full bg-gradient-to-r from-[#7f24ee] to-[#f91075] text-white p-3 rounded active:scale-90 duration-200 transition-all"
       onClick={() => onSubscribe()}
            >
              <p>Upgrade</p> <Zap fill={"white"} size={18} />
            </button>
       </div>
    </div>
  )
}

export default Promodal