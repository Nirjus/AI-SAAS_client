"use client";
import React, { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import Subscription from "./Subscription";
import SaveItems from "./SaveItems";
import DeleteUser from "./DeleteUser";
import CustomModal from "@/app/utils/CustomModal";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useCheckSubscriptionQuery } from "@/redux/features/subscription/subscriptionApi";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [active, setActive] = useState(1);
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const {data: validity} = useCheckSubscriptionQuery({}); 
  const [logout, setLogout] = useState(false);
  const {isSuccess,data} = useLogOutQuery(undefined,{
      skip: !logout ? true : false
  });
 
  const logOutHandler = async () => {
          await signOut();
         setLogout(true);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  useEffect(() => {
     if(isSuccess){
      const message = data?.message || "Logout Successful";
      toast.success(message);
     }
     if(validity){
      setIsPro(validity?.isValid);
      }
  },[isSuccess, data, validity])
  return (
    <div className=" w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-auto min-h-[450px] shadow-sm mb-[80px] mt-[160px] sticky left-[30px] ${
          scroll ? "top-[120px]" : "top-[30px]"
        }`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          setOpen={setOpen}
          logoutHandler={logOutHandler}
        />
      </div>
      <div className=" mb-[80px] mt-[160px] px-[20px] w-full bg-transparent">
        {active === 1 && <ProfileInfo user={user} />}
        {active === 2 && <ChangePassword />}
        {active === 3 && <Subscription isPro={isPro} />}
        {active === 4 && <SaveItems />}
        {active === 6 && (
          <>
            <div className=" p-2 px-8 800px:pr-[200px] font-Poppins">
              <h1 className=" text-[25px] font-semibold text-[#f03476]">
                🚨 Attention Users!
              </h1>
              <h1 className=" text-[20px] font-semibold text-[#9834f0]">
                {" "}
                ⚠️ Important Alert: Account Deletion{" "}
              </h1>
              <p className=" text-[15px] dark:text-white text-black">
                Deleting your account is a permanent decision in our
                application. Once you click Yes, it cannot be undone. Please
                take a moment to consider this carefully before proceeding.
              </p>
              <br />
              <h1 className=" text-[20px] font-semibold text-[#9834f0]">
                🔒 Irreversible Action:
              </h1>
              <p className=" text-[15px] dark:text-white text-black">
                Once initiated, theres no turning back. We value your presence
                in our community, so ensure this decision aligns with your
                intentions.
              </p>
              <br />
              <h1 className=" text-[20px] font-semibold text-[#9834f0]">
                🤔 Questions or Concerns?
              </h1>
              <p className=" text-[15px] dark:text-white text-black">
                If you have any doubts or need assistance, reach out to our
                support team before confirming the deletion. We are here to help
              </p>
              <br />
              <p className=" text-[#2a5bb6] font-semibold">-- AI Studio Team</p>
            </div>
            <CustomModal open={open} setOpen={setOpen} component={DeleteUser} />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
