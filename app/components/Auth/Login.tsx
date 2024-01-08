"use client"
import { style } from '@/app/styles/style';
import React, { useEffect, useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useLoginMutation, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email")
  .required("Email is required"),
  password: Yup.string().required("Password is required")
  .min(6)
})
const Login = ({setRoute, setOpen}: Props) => {
  const [visible, setVisible] = useState(false);
   const [login, {isSuccess, data: loginData,error}] = useLoginMutation();
  const [socialAuth,{isSuccess: socialSuccess,data:socialData, error: socialError}] = useSocialAuthMutation();
   const {data} = useSession();

  const formik = useFormik({
    initialValues: {email: "", password: ""},
    validationSchema: schema,
    onSubmit: async ({email, password}) => {
      await login({email,password});
    }
  });
  const googlSignIn = (e:any) => {
    e.preventDefault();
    signIn("google"); 
  }
   const githubSignIn =  (e: any) => {
    e.preventDefault()
     signIn("github");
   }

  useEffect(() => {
    if(data){
      socialAuth({
        email:data?.user?.email,
        name: data?.user?.name,
        socialAvatar: data?.user?.image
       })
    }
    if(socialSuccess){
      const message = socialData.message || "Login successful";
    toast.success(message);
    setOpen(false);
    }
    if(isSuccess){
      const message = loginData.message || "Login successful";
      toast.success(message);
      setOpen(false);
     }
   if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
   }
   if(socialError){
    if("data" in socialError){
      const errorData = socialError as any;
      toast.error(errorData.data.message);
    }
   }
  },[isSuccess, error, loginData, setOpen, socialAuth,data,socialData,socialSuccess, socialError])

  const {errors, touched, values, handleChange, handleSubmit} = formik;

  return (
    <div>
        <div className=' w-full h-auto'>
          <h1 className=' text-center font-[600] text-[22px] font-Josefin'>
            LogIn here
          </h1>
           <form action="" onSubmit={handleSubmit}>
         <div className=' flex flex-col gap-[9px]'>
          <label htmlFor="email" className={`${style.label}`}>Email</label>
         <input type="email"
          id='email'
          placeholder='abcd@gmail.com'
          value={values.email}
          onChange={handleChange}
          className={`${errors.email && touched.email && " border border-red-500"} ${style.input}`}
         />
         </div>
         {
          errors.email && touched.email && (
            <p className=' text-red-500 pl-2'>{errors.email}</p>
          )
         }
         <div className=' relative pt-6 flex flex-col gap-[9px]'>
          <label htmlFor="password" className={`${style.label}`}>Password</label>
         <input type={visible ? "text" : "password"}
          id='password'
          placeholder='#@gRgb%^%$5644'
          value={values.password}
          onChange={handleChange}
          className={`${errors.password && touched.password && "border border-red-500"}${style.input}`}
         />
          {
            visible ? (
              <AiOutlineEye size={25} className=" absolute cursor-pointer right-3 bottom-3" onClick={() => setVisible(false)}/>
            ) : (
              <AiOutlineEyeInvisible size={25} className=" absolute cursor-pointer right-3 bottom-3" onClick={() => setVisible(true)}/>
            )
            }
         </div>
         {
            errors.password && touched.password &&  (
              <p className=' pl-2 text-red-500'>{errors.password}</p>
            )
          }
         <div className=' py-5 flex justify-between px-1'>
          <button type="submit" className=' p-2 min-w-[80px] text-white bg-black dark:bg-[#6912cd] rounded-[3px] active:scale-90 duration-200'>
            Login
          </button>
          <p className='text-[15px] font-[300] cursor-pointer' onClick={() => setRoute("forgot-Password")}>
           forgot Password ?
          </p>
         </div>
         </form>
         <div className=''>
          
             <p className=' text-center'>---------------- or Join with ----------------</p>
             <div className=' flex gap-7 justify-center pt-6'>
          <button type="button" className=' p-[5px] w-[80px] cursor-pointer flex justify-center items-center rounded active:bg-[#0d0d0d2f] border-[#7e7e7e7d] border bg-[#0d0d0d1e]' onClick={googlSignIn}>
          <FcGoogle size={30} />
          </button>
              <button type='button' className=' p-[5px] w-[80px] cursor-pointer flex justify-center items-center rounded border-[#7e7e7e7d] border bg-[#0d0d0d1e] active:bg-[#0d0d0d2f]' onClick={githubSignIn}>
              <SiGithub size={28}/>
              </button>
             </div>
         </div>
         <div className=' pt-7'>
          <p className=' text-center text-[#000000a2] dark:text-[#ffffff78]'>
            dont have any account? <span onClick={() => setRoute("SignUp")} className=' cursor-pointer dark:text-white text-black'>SignUp</span>
          </p>
         </div>
         
        </div>
    </div>
  )
}

export default Login