import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "../../../public/images/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogout, MdOutlinePersonRemove, MdOutlineSubscriptions } from "react-icons/md";
import {HiOutlineSaveAs} from "react-icons/hi";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  setOpen: (open: boolean) => void;
};

const SidebarProfile = ({ user, active, setActive, setOpen }: Props) => {
    const [logout, setLogout] = useState(false);
    const {} = useLogOutQuery(undefined,{
        skip: logout ? false : true
    });
    const logOutHandler = async () => {
            setLogout(true);
           await signOut();
           toast.success("Logout successful")
    }
  return (
    <div className=" w-full font-Poppins bg-white dark:bg-[#290329] border border-[#8382827b]">
      <div
        className={`flex p-1 cursor-pointer items-center gap-3 border border-[#8787878a] rounded ${
          active === 1 ? "bg-[#0000002c] dark:bg-[#ffffff19]" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user?.avatar
              ? user?.avatar?.url
              : user?.socialAvatar
              ? user?.socialAvatar
              : avatar
          }
          alt="avatar"
          width={500}
          height={500}
          className=" w-10 h-10 rounded-full object-cover"
        />
        <p className=" text-black dark:text-white font-[600] 800px:block hidden text-[20px]">
          {user?.name}
        </p>
      </div>
      <div
        className={`flex p-2 items-center gap-3 cursor-pointer rounded ${
          active === 2 ? "bg-[#0000002c] dark:bg-[#ffffff23]" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={30} className=" text-[#3cd649] " />
        <p className=" text-black dark:text-white font-[600] 800px:block hidden text-[18px]">
          Change Password
        </p>
      </div>
      <div
        className={`flex p-2 items-center gap-3 cursor-pointer rounded ${
          active === 3 ? "bg-[#0000002c] dark:bg-[#ffffff23]" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <MdOutlineSubscriptions size={30} className=" text-[#22b3ed] " />
        <p className=" text-black dark:text-white font-[600] 800px:block hidden text-[18px]">
          Subscription
        </p>
      </div>
      <div
        className={`flex p-2 items-center gap-3 cursor-pointer rounded ${
          active === 4 ? "bg-[#0000002c] dark:bg-[#ffffff23]" : "bg-transparent"
        }`}
        onClick={() => setActive(4)}
      >
        <HiOutlineSaveAs size={30} className=" text-[#c92abf] " />
        <p className=" text-black dark:text-white font-[600] 800px:block hidden text-[18px]">
          Save Items
        </p>
      </div>
      <div
        className={`flex p-2 items-center gap-3 cursor-pointer rounded ${
          active === 5 ? "bg-[#0000002c] dark:bg-[#ffffff23]" : "bg-transparent"
        }`}
        onClick={() => {setActive(5), logOutHandler()}}
      >
        <MdLogout size={30} className=" text-[#df6478]" />
        <p className=" text-black dark:text-white font-[600] 800px:block hidden text-[18px]">
          Logout
        </p>
      </div>
      <div
        className={`flex p-2 items-center gap-3 cursor-pointer rounded  ${
          active === 6 ? "bg-[#0000002c] dark:bg-[#ffffff23]" : "bg-transparent"
        }`}
        onClick={() => {setActive(6), setOpen(true)}}
      >
        <MdOutlinePersonRemove size={30} className=" text-[#9957e9]" />
        <p className=" text-black dark:text-white font-[600] 800px:block hidden text-[18px]">
          Remove Account
        </p>
      </div>
    </div>
  );
};

export default SidebarProfile;
