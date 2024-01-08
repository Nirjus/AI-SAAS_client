import { style } from "@/app/styles/style";
import { useLoaduserQuery } from "@/redux/features/api/apiSlice";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {};

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
   const [loadUser, setLoadUser] = useState(false);
  const {} = useLoaduserQuery(undefined,{
    skip: loadUser ? false : true
  });
  const [updatePassword, {isSuccess, data,isLoading, error}] = useUpdatePasswordMutation();
    const submitHandler = async (e: any) => {
       e.preventDefault();
       await updatePassword({
        oldPassword: oldPassword, 
        newPassword: newPassword, 
        confirmPassword: confirmPassword
       })
    }
    useEffect(() => {
      if(isSuccess){
        setLoadUser(true);
        const message = data?.message || "Password updated";
       toast.success(message);
       setOldPassword("");
       setNewPassword("");
       setConfirmPassword("");
       }
       if(error){
         if("data" in error){
           const errorData = error as any;
           toast.error(errorData.data.message);
         }
       }
    },[isSuccess, data, error ])
  
  return (
    <div className=" w-full">
      <form action="" onSubmit={submitHandler} className=" w-full 800px:flex flex-col items-center">
        <div className=" flex flex-col mb-4 relative">
          <label htmlFor="oldPassword" className={style.label}>
            Old Password
          </label>
          <input
            type={visible1 ? "text" : "password"}
            placeholder="Old Password..."
            required
            name="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`${style.input} 800px:!w-[470px] dark:!bg-[#170831] m-2`}
          />
          {visible1 ? (
            <AiOutlineEye
              size={22}
              className=" cursor-pointer text-black dark:text-white absolute right-5 bottom-5"
              onClick={() => setVisible1(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={22}
              className=" cursor-pointer text-black dark:text-white absolute right-5 bottom-5"
              onClick={() => setVisible1(true)}
            />
          )}
        </div>
        <div className=" flex flex-col mb-4 relative">
          <label htmlFor="newPassword" className={style.label}>
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password..."
            required
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`${style.input} 800px:!w-[470px] dark:!bg-[#170831] m-2`}
          />
        </div>
        <div className=" flex flex-col mb-4 relative">
          <label htmlFor="confirmPassword" className={style.label}>
            Confirm Password
          </label>
          <input
            type={visible2 ? "text" : "password"}
            placeholder="Confirm Password..."
            required
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`${style.input} 800px:!w-[470px] dark:!bg-[#170831] m-2`}
          />
          {visible2 ? (
            <AiOutlineEye
              size={22}
              className=" cursor-pointer text-black dark:text-white absolute right-5 bottom-5"
              onClick={() => setVisible2(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={22}
              className=" cursor-pointer text-black dark:text-white absolute right-5 bottom-5"
              onClick={() => setVisible2(true)}
            />
          )}
        </div>
        <div className="">
            <button type="submit" className="active:scale-90 duration-200 w-[150px] p-2 bg-[#000] dark:bg-[#5f0c74] rounded text-[18px] text-white font-[600] font-Poppins"
            disabled={isLoading}
            >
              Save
            </button>
          
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
