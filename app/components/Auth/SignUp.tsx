"use client"
import { style } from '@/app/styles/style';
import React, { useEffect, useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useRegisterMutation, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}

const schema = Yup.object().shape({
    name: Yup.string()
    .required("Name is required")
    .min(4),
    email: Yup.string().email("Invalid email")
    .required("Email is required"),
    password: Yup.string().required("Password is required")
    .min(6)
  })

const SignUp = ({ }: Props) => {
    const [visible, setVisible] = useState(false);
    const [register, {isSuccess,data, error}] = useRegisterMutation();
    const [socialAuth,{isSuccess: socialSuccess,data:socialData, error: socialError}] = useSocialAuthMutation();
    const {data:session} = useSession();
    console.log(session)
  const formik = useFormik({
    initialValues: {name: "",email: "", password: ""},
    validationSchema: schema,
    onSubmit: async ({name,email, password}) => {
        const data = {name, email, password};
      await register(data);
    }
  });

  useEffect(() => {
    if(session){
      socialAuth({
        email:session?.user?.email,
        name: session?.user?.name,
        socialAvatar: session?.user?.image
       })
    }
    if(socialSuccess){
      const message = socialData.message || "Login successful";
    toast.success(message);
     redirect("/");
  }
    if(isSuccess){
        const message = data?.message as string;
          toast.success(message);
         redirect("/login");
    }           
   if(error){
    if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
    }
   }
  },[isSuccess, session, socialAuth, socialData, socialSuccess, data, error])

  const {errors, touched, values, handleChange, handleSubmit} = formik;

  return (
    <div>
    <div className=' w-full h-auto'>
      <h1 className=' text-center font-[600] text-[22px] font-Josefin'>
        Register here
      </h1>
       <form action="" onSubmit={handleSubmit}>
       <div className=' flex flex-col gap-[9px]'>
      <label htmlFor="name" className={`${style.label}`}>Name</label>
     <input type="text"
      id='name'
      placeholder='Joseph moris'
      value={values.name}
      onChange={handleChange}
      className={`${errors.name && touched.name && " border border-red-500"} ${style.input}`}
     />
     </div>
     {
      errors.name && touched.name && (
        <p className=' text-red-500 pl-2'>{errors.name}</p>
      )
     }
     <div className=' pt-5 flex flex-col gap-[9px]'>
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
      <button type="submit" className=' p-2 min-w-[90px] text-white dark:bg-[#6912cd] bg-black rounded-[3px] active:scale-90 duration-200'>
        Register
      </button>
     </div>
     </form>
     <div className=''>
      
         <p className=' text-center'>---------------- or Join with ----------------</p>
         <div className=' flex gap-7 justify-center pt-6'>
      <button type="button" className=' p-[5px] w-[80px] cursor-pointer flex justify-center items-center rounded border-[#7e7e7e7d] border bg-[#0d0d0d1e] active:bg-[#0d0d0d2f]'
      onClick={() => signIn("google")}
      >
      <FcGoogle size={30} />
      </button>
          <button type="button" className=' p-[5px] w-[80px] cursor-pointer flex justify-center items-center rounded border-[#7e7e7e7d] border bg-[#0d0d0d1e] active:bg-[#0d0d0d2f]'
          onClick={() => signIn("github")}
          >
          <SiGithub size={28}/>
          </button>
         </div>
     </div>
     <div className=' pt-7'>
      <p className=' text-center text-[#000000a2] dark:text-[#ffffff78]'>
        already have any account? <Link href={"/login"} className=' cursor-pointer text-black dark:text-white'>SignIn</Link>
      </p>
     </div>
    </div>
</div>
  )
}

export default SignUp