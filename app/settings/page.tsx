"use client";
import React, { FC, useEffect, useState } from 'react'
import DashboardHeading from '../utils/DashboardHeading'
import { Settings } from 'lucide-react'
import { useGetCreditCountQuery } from '@/redux/features/user/userApi'
import Heading from '../utils/Heading';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar/DashboardSidebar';
import Dashboard from '../components/Dashboard/DashboardSidebar/Dashboard';
import CustomModal from '../utils/CustomModal';
import Promodal from '../components/Subscription/pro-modal';
import Header from '../components/Header';
import { useCheckSubscriptionQuery } from '@/redux/features/subscription/subscriptionApi';

type Props = {}

const Setting:FC<Props> = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [openSideBar, setOpenSideBar] = useState(true);
  const [active, setActive] = useState(7);
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
  },[isSuccess, refetch, validity,data])
  return (
    <div>
       <Heading
        title="AI Studio - Dashboard"
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
        <div className=" w-full h-screen flex m-auto">
        <div className={`duration-500 transition-all ${openSideBar ? "1200px:w-[23%] 800px:w-[25%] w-[30%]" : "w-[60px]"}`}>
          <DashboardSidebar
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar}
            active={active}
            setActive={setActive}
            credits={data?.credit}
            setOpen={setOpen}
            setRoute={setRoute}
            isPro={isPro}
          />
        </div>
        <div className={`duration-500 transition-all ${openSideBar ? "1200px:w-[77%] 800px:w-[75%] w-[70%]" : " w-full"}  `}>
          
                <Dashboard 
                openSideBar={openSideBar}
                active={active}
                setActive={setActive}
                setOpen={setOpen}
                setRoute={setRoute}
                refetchCredit={refetch}
                />
          
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
    </div>
  )
}

export default Setting