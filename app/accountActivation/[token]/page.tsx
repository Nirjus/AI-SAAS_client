"use client"
import Header from '@/app/components/Header';
import { useActivationMutation } from '@/redux/features/auth/authApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {redirect} from "next/navigation"
import Heading from '@/app/utils/Heading';

const Page = ({params}: any) => {
   const token = params.token;
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [activation] = useActivationMutation();

      
    useEffect(() => {
       if(token) {
        const userActivation = async () => {
            await activation(token);
        }
                userActivation();
                redirect("/")
       }
       
    },[ activation, token])
  return (
    <div className=' w-full min-h-screen'>
        <Heading 
          title="Activation page -- AI Studio"
          description="Activate new user"
          keyword="Programing, token"
        />
        <Header 
          open={open}
          route={route}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
        />

    </div>
  )
}

export default Page