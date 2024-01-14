import {
  Code2Icon,
  ImageIcon,
  LayoutDashboard,
  MessageSquareDotIcon,
  Music4Icon,
  Settings,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import CreditCounter from "@/app/utils/CreditCounter";

type Props = {
  openSideBar: boolean;
  setOpenSideBar: (openSideBAr: boolean) => void;
  active: number;
  setActive: (active: number) => void;
  credits: number;
  setOpen: any;
  setRoute: any;
  isPro: boolean;
};
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    active: 1,
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquareDotIcon,
    active: 2,
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    active: 3,
    color: "text-pink-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    active: 4,
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: Music4Icon,
    active: 5,
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code2Icon,
    active: 6,
    color: "text-yellow-500",
  },
  {
    label: "Settings",
    icon: Settings,
    active: 7,
    color: " text-red-500",
  },
];
const DashboardSidebar = ({
  openSideBar,
  setOpenSideBar,
  active,
  setActive,
  credits,
  setOpen,
  setRoute,
  isPro,
}: Props) => {
  return (
    <div
      className={`dark:bg-[#050237] flex flex-col justify-between bg-slate-200 pt-[90px] p-2 h-screen w-full`}
    >
      <div>
      <div className=" flex justify-end 800px:hidden ">
        {openSideBar ? (
          <IoIosArrowBack
            size={25}
            onClick={() => setOpenSideBar(false)}
            className=" text-black dark:text-white cursor-pointer"
          />
        ) : (
          <IoIosArrowForward
            size={25}
            onClick={() => setOpenSideBar(true)}
            className=" text-black dark:text-white cursor-pointer"
          />
        )}
      </div>
      <div className=" w-full">
       <Link href={"/dashboard"}>
       <div className={` flex items-center justify-center duration-500 `}>
          <Image
            src={require("../../../../public/images/logo.png")}
            alt="Ai Studio logo"
            width={500}
            height={500}
            className=" w-10 h-10 object-contain"
          />
          <h1
            className={`font-semibold font-Josefin max-400px:text-[10px] text-2xl ml-2 overflow-hidden  ${
              openSideBar ? " textComingAnimation" : " hidden"
            }`}
          >
            AI Studio
          </h1>
        </div>
       </Link>
        <br />
        <br />
        <div className=" space-y-1 800px:mt-5 mt-4">
          {routes.map((route) => (
            <div
              key={route.active}
              className={`w-full text-sm p-3 flex justify-start gap-3 cursor-pointer hover:dark:bg-white/10 hover:bg-white/70 rounded-lg transition
               ${active === route.active && " bg-white/70 dark:bg-white/10"}
               ${openSideBar ? " 800px:pl-[30px]" : ""}
              `}
              onClick={() => setActive(route.active)}
            >
              <route.icon className={`h-5 w-5 ${route.color}`} />
              <p
                className={`font-Poppins text-black dark:text-white 800px:text-[14px] 600px:text-[11px] text-[8px] overflow-hidden ${
                  openSideBar ? " textComingAnimation " : " hidden"
                }`}
              >
                {route.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
        <CreditCounter isPro={isPro} openSideBar={openSideBar} credit={credits} setOpen={setOpen} setRoute={setRoute} />
    </div>
  );
};

export default DashboardSidebar;
