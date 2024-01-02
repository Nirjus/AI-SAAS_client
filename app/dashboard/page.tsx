"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar/DashboardSidebar";
import Dashboard from "../components/Dashboard/DashboardSidebar/Dashboard"

type Props = {};

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [openSideBar, setOpenSideBar] = useState(true);
  const [active, setActive] = useState(1);
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
          />
        </div>
        <div className={`duration-500 transition-all ${openSideBar ? "1200px:w-[77%] 800px:w-[75%] w-[70%]" : " w-full"}  `}>
          
                <Dashboard 
                openSideBar={openSideBar}
                active={active}
                setActive={setActive}
                setOpen={setOpen}
                setRoute={setRoute}
                />
          
        </div>
      </div>
    </div>
  );
};

export default Page;
