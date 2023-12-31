import CustomModal from "@/app/utils/CustomModal";
import ThemeSwitcher from "@/app/utils/Theme/ThemeSwitcher";
import Link from "next/link";
import React,{ useState } from "react";
import { FaList } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp";
import ForgotPassword from "../../components/Auth/ForgotPassword";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
import { redirect } from "next/navigation";

type Props = {
  activeItem: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
  setActiveItem: (activeItem: number) => void;
};

const Navbar = ({ activeItem, setActiveItem , open, setOpen, route, setRoute}: Props) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [reverse, setReverse] = useState(false);
  const {user} = useSelector((state:any) => state.auth);
   const sideBar = (e:any) => {
        if(e.target.id === "mobileHeader"){
          setReverse(true);
            setTimeout(function(){
              setOpenSideBar(false)
            },460);
        }
   }
  const navItem = [
    {
      name: "Home",
      url: "/",
    },
   {
    name: "Dashboard",
    url: "/dashboard"
   },
    {
      name: "My media",
      url: "/mymedia",
    },
    {
      name: "FAQ",
      url: "/faq",
    },
  ];
  return (
    <>
      <div className=" my-auto mx-[70px] hidden 800px:block">
        <div className=" flex flex-row gap-7">
          {navItem.map((item: any, index: number) => (
            <div
              className={` p-1 font-Poppins ${
                activeItem === index
                  ? " text-red-500 dark:text-[cyan] underline "
                  : " text-black dark:text-white"
              }`}
              key={index}
            >
              <Link href={item.url}>{item.name}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-1">
         <ThemeSwitcher />
         </div>
          <div className=" ml-2 mr-4 max-800px:hidden">
            {
              user ? (
                    <Link href={"/profile"}>
                     <Image src={user?.avatar ? user?.avatar?.url : user?.socialAvatar ? user?.socialAvatar : avatar} alt="avatar" 
                     width={500} height={500}
                     className={`w-10 h-10 rounded-full object-cover ${activeItem === 6 && "border dark:border-[#19d7da] border-[#ff2e2e]"}`}
                     onClick={() => setActiveItem(6)}
                     />  
                    </Link>
              ) : (
               <Link href={"/login"}>
                <FaRegUserCircle
              size={35}
              className=" text-black dark:text-white cursor-pointer"
                />
               </Link>
              )
            }
          </div>
      <div className=" 800px:hidden block mx-5">
        <FaList
          size={33}
          className={" text-black dark:text-white cursor-pointer"}
          onClick={() => {setOpenSideBar(true), setReverse(false)}}
        />
        {openSideBar && (
          <div
            className="fixed top-0 right-0 h-screen w-full bg-[#00000036]"
            onClick={sideBar}
            id="mobileHeader"
          >
            <div className= {`sideBaranimationRightToleft ${reverse && "sideBaranimationLeftToRight"} h-screen w-[70%] z-[999999] fixed top-0 right-0 flex flex-col justify-center dark:bg-[#000000] bg-[#ffffff]`}>
              <div className=" flex justify-center items-center flex-col gap-7">
                {navItem.map((item: any, index: number) => (
                  <div
                    className={` p-1 font-Poppins ${
                      activeItem === index
                        ? " text-red-500 dark:text-[cyan] underline "
                        : " text-black dark:text-white"
                    }`}
                    key={index}
                  >
                    <Link href={item.url} className="">{item.name}</Link>
                  </div>
                ))}
              </div>
              <div className=" flex justify-center my-[100px]">
              {
              user ? (
                    <Link href={"/profile"}>
                     <Image src={user?.avatar ? user?.avatar?.url : user?.socialAvatar ? user?.socialAvatar : avatar} alt="avatar" 
                     width={500} height={500}
                     className={`w-10 h-10 rounded-full object-cover ${activeItem === 6 && "border dark:border-[#19d7da] border-[#ff2e2e]"}`}
                     onClick={() => setActiveItem(6)}
                     />  
                    </Link>
              ) : (
               <Link href={"/login"}>
                <FaRegUserCircle
              size={35}
              className=" text-black dark:text-white cursor-pointer"
            />
               </Link>
              )
            }
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
