import { useDeleteUserMutation } from '@/redux/features/user/userApi';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { MdArrowOutward } from "react-icons/md";
import { useSelector } from 'react-redux';
type Props = {
    setRoute: (route: string) => void;
    setOpen:(open: boolean) => void;
}

const DeleteUser = ({setOpen, setRoute}: Props) => {
   const [deleteUser,{isSuccess,error}] = useDeleteUserMutation();
   const {user} = useSelector((state: any) => state.auth);
     
  const handleDelete = async () => {
     await deleteUser(user?._id);
     signOut();
  }
  useEffect(() => {
    if(isSuccess){
      toast.success("User Removed successfully");
      setOpen(false);
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  },[isSuccess, error, setOpen])
  return (
    <div>
        <h1 className=' text-center text-[21px] dark:text-white text-black '>Are you sure you want to delete your account?</h1>
        <br />
        <br />
       
        <div className=' flex justify-evenly'>
         <button className=' p-2 bg-black text-white rounded w-[80px] active:scale-90 duration-200'
         onClick={() => handleDelete()}
         >Yes</button>
         <button className=' p-2 bg-black text-white rounded w-[80px] active:scale-90 duration-200' onClick={() => setOpen(false)}>No</button>
        </div>
       <div className=' pl-10 pt-5 flex items-center gap-2' onClick={() => setOpen(false)}>
       <p  className=' text-left text-[#000000a3] dark:text-[#fff8] text-[15px] cursor-pointer'>Read Instruction carefully</p>
        <MdArrowOutward className=" text-black dark:text-white"/>
       </div>
    </div>
  )
}

export default DeleteUser