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
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { LogOut, User2 } from "lucide-react";

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
  const [openoption, setOpenoption] = useState(false);
  const [logout, setLogout] = useState(false);
  const {isSuccess,data} = useLogOutQuery(undefined,{
      skip: !logout ? true : false
  });
   const sideBar = (e:any) => {
        if(e.target.id === "mobileHeader"){
          setReverse(true);
            setTimeout(function(){
              setOpenSideBar(false)
            },460);
        }
   }
   const logOutHandler = async () => {
    await signOut();
   setLogout(true);
   setOpenoption(false);
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
          <div className=" ml-2 mr-4 relative max-800px:hidden">
            {
              user ? (
                     <Image src={user?.avatar ? user?.avatar?.url : user?.socialAvatar ? user?.socialAvatar : avatar} alt="avatar" 
                     width={500} height={500}
                     className={`w-10 h-10 rounded-full cursor-pointer object-cover ${activeItem === 6 && "border dark:border-[#19d7da] border-[#ff2e2e]"}`}
                     onClick={() =>  setOpenoption(!openoption)}
                     />
              ) : (
               <Link href={"/login"}>
                <FaRegUserCircle
              size={35}
              className=" text-black dark:text-white cursor-pointer"
                />
               </Link>
              )
            }
            {
              openoption && (
                <div  className=" w-fit absolute top-[40px] right-[20px] text-black font-semibold p-2 rounded-lg bg-[#dedede]">
                 <Link href={"/profile"} className=" cursor-pointer  p-2 flex items-center hover:bg-[#c4c3c3] rounded-lg gap-2" onClick={() =>setOpenoption(false)}>Profile <User2 /> </Link>
                 <p className=" cursor-pointer  p-2 flex items-center gap-2 hover:bg-[#c4c3c3] rounded-lg" onClick={() => logOutHandler()}>Logout <LogOut /></p>
               </div>
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
              <div className=" flex relative justify-center my-[100px]">
              {
              user ? (
                     <Image src={user?.avatar ? user?.avatar?.url : user?.socialAvatar ? user?.socialAvatar : avatar} alt="avatar" 
                     width={500} height={500}
                     className={`w-10 h-10 cursor-pointer rounded-full object-cover ${activeItem === 6 && "border dark:border-[#19d7da] border-[#ff2e2e]"}`}
                     onClick={() => setOpenoption(!openoption)}
                     />  
              ) : (
               <Link href={"/login"}>
                <FaRegUserCircle
              size={35}
              className=" text-black dark:text-white cursor-pointer"
            />
               </Link>
              )
            }
            {
               openoption && (
                <div  className=" w-fit absolute top-[40px] right-1/2 text-black font-semibold p-2 rounded-lg bg-[#dedede]">
                <p className=" cursor-pointer  p-2 flex items-center hover:bg-[#c4c3c3] rounded-lg gap-2" onClick={() =>setOpenoption(false)}><Link href={"/profile"}>Profile</Link> <User2 /> </p>
                 <p className=" cursor-pointer  p-2 flex items-center gap-2 hover:bg-[#c4c3c3] rounded-lg" onClick={() => logOutHandler()}>Logout <LogOut /></p>
              </div>
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
