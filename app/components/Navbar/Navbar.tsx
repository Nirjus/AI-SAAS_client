import CustomModal from "@/app/utils/CustomModal";
import ThemeSwitcher from "@/app/utils/Theme/ThemeSwitcher";
import Link from "next/link";
import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Login from "../../components/Auth/Login";
import SignUp from "../../components/Auth/SignUp"
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
type Props = {
  activeItem: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
};

const Navbar = ({ activeItem , open, setOpen, route, setRoute}: Props) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const {user} = useSelector((state:any) => state.auth);

   const sideBar = (e:any) => {
        if(e.target.id === "mobileHeader"){
            setOpenSideBar(false);
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
      name: "Policy",
      url: "/policy",
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
                     className=" w-10 h-10 rounded-full"
                     />  
                    </Link>
              ) : (
                <FaRegUserCircle
              size={35}
              className=" text-black dark:text-white cursor-pointer"
              onClick={() => setOpen(true)}
            />
              )
            }
          </div>
      <div className=" 800px:hidden block mx-5">
        <FaList
          size={33}
          className={" text-black dark:text-white cursor-pointer"}
          onClick={() => setOpenSideBar(true)}
        />
        {openSideBar && (
          <div
            className="fixed top-0 right-0 z-[99999] h-screen w-full bg-[#00000036]"
            onClick={sideBar}
            id="mobileHeader"
          >
            <div className=" h-screen w-[70%] fixed top-0 right-0 flex flex-col justify-center dark:bg-[#000000] bg-[#ffffff]">
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
                     className=" w-10 h-10 rounded-full"
                     />  
                    </Link>
              ) : (
                <FaRegUserCircle
              size={35}
              className=" text-black dark:text-white cursor-pointer"
              onClick={() => setOpen(true)}
            />
              )
            }
              </div>
            </div>
          </div>
        )}
      </div>
      {
       route === "Login" && (
        <>
        {
            open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  component={Login}
                />
            )
        }
        </>
       )
      }
      {
       route === "SignUp" && (
        <>
        {
            open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  component={SignUp}
                />
            )
        }
        </>
       )
      }
    </>
  );
};

export default Navbar;
