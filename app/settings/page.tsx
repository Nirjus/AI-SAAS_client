"use client";
import React, { FC, useEffect, useState } from 'react'
import { useGetCreditCountQuery } from '@/redux/features/user/userApi'
import Heading from '../utils/Heading';
import Header from '../components/Header';
import { useCheckSubscriptionQuery } from '@/redux/features/subscription/subscriptionApi';
import SettingsPage from '../components/Dashboard/SettingsPage';
import Footer from '../components/footer/footer';
import CreditCounter from '../utils/CreditCounter';
import CustomModal from '../utils/CustomModal';
import Promodal from '../components/Subscription/pro-modal';
import Protected from '../hooks/userProtected';

type Props = {}

const Setting:FC<Props> = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [isPro, setIsPro] = useState(false);

  const {data,isSuccess, refetch} = useGetCreditCountQuery({},{refetchOnMountOrArgChange: true})
  const {data: validity} = useCheckSubscriptionQuery({});

  useEffect(() => {
    if(isSuccess){
      refetch();
    }
    if(validity){
      setIsPro(validity?.isValid);
     }
  },[isSuccess, refetch, validity])
  return (
    <div className=''>
      <Protected>
      <Heading
        title="AI Studio - Settings"
        description="Make next level Ai Generated Images, text, code snippets"
        keyword="ChatGpt, Ai tools, Image Generation"
      />
    
       <Header
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={activeItem}
      />
       <div className=' pt-[100px] 800px:px-[50px] 1200px:px-[80px] w-full h-screen'>
       <SettingsPage isPro={isPro} />
      <div className=' 800px:w-[40%] py-14 px-4 lg:px-8'>
      <CreditCounter credit={data?.credit} isPro={isPro} setOpen={setOpen} setRoute={setRoute} openSideBar />
      </div>
       </div>
       {
        open && !isPro && (
          <>
          {
            route === "pro-modal" && (
              <CustomModal open={open} setOpen={setOpen} component={Promodal} />
            )
          }
          </>
        )
      }
       <Footer />
      </Protected>
    </div>
  )
}

export default Setting