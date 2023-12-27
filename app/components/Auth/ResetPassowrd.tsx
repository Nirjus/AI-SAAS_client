import { style } from '@/app/styles/style';
import { useResetPasswordMutation } from '@/redux/features/user/userApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {redirect} from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {
    token: any;
    setOpen:(open: boolean) => void;
}

const ResetPassowrd = ({token, setOpen }: Props) => {
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [resetPassword, {isSuccess, isLoading, data, error}] = useResetPasswordMutation();
    const submitHandler = async (e: any) => {
         e.preventDefault();
      await resetPassword({
        token: token, 
        resetPassword: password
      })
    }
    useEffect(() => {
    if(isSuccess){
        setOpen(false);
        redirect("/");
        const message = data?.message;
        toast.success(message);
    }
    if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
    }
    },[isSuccess, data, error, setOpen])
    return(
   <div>
       <form action="" onSubmit={submitHandler}>
      <h1 className=" text-center font-[600] font-Poppins text-[20px]">
        Enter your Password
      </h1>
     <div className=' relative'>
     <input
        type={visible ? "text" : "password"}
        required
        placeholder="fbhj%$#$56g"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`${style.input} !w-full !mt-5`}
      />
      {
        visible ? (
            <AiOutlineEye size={22} className=" absolute right-3 bottom-3 cursor-pointer text-black dark:text-white" onClick={() => setVisible(false)} />
        ) : (
            <AiOutlineEyeInvisible size={22} className=" absolute right-3 bottom-3 cursor-pointer text-black dark:text-white" onClick={() => setVisible(true)} />
        )
      }
     </div>
      <div className=" flex px-3 justify-between items-center my-5">
        <button
          type="submit"
          className=" p-2 rounded text-white w-[100px] active:scale-90 duration-200 bg-black"
         disabled={isLoading}
        >
          submit
        </button>
        
      </div>
    </form>
   </div>
    )
}

export default ResetPassowrd