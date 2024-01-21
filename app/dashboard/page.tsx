"use client";
import React, { useEffect, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar/DashboardSidebar";
import Dashboard from "../components/Dashboard/DashboardSidebar/Dashboard"
import { useGetCreditCountQuery } from "@/redux/features/user/userApi";
import CustomModal from "../utils/CustomModal";
import Promodal from "../components/Subscription/pro-modal";
import { useCheckSubscriptionQuery } from "@/redux/features/subscription/subscriptionApi";
import Protected from "../hooks/userProtected";

type Props = {};

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [openSideBar, setOpenSideBar] = useState(true);
  const [active, setActive] = useState(1);
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
      <Protected >
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
        <div className={`duration-500 z-50 transition-all 1200px:w-[23%] 800px:w-[25%] max-800px:fixed ${openSideBar ? " w-[40%]" : "w-[60px]"}`}>
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
        <div className={`duration-500 transition-all 1200px:w-[77%] 800px:w-[75%] w-full  `}>
          
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
      </Protected>
    </div>
  );
};

export default Page;
