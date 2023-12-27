"use client"
import ResetPassowrd from '@/app/components/Auth/ResetPassowrd';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Route/Hero';
import CustomModal from '@/app/utils/CustomModal';
import Heading from '@/app/utils/Heading';
import React, { useState } from 'react'
type Props = {
    params: any;
}
const Page = ({params}: Props) => {
    const token = params.token;
    const [open, setOpen] = useState(true);
    const [route, setRoute] = useState("reset-Password");
    const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
        <Heading title='Reset-Password' keyword='Account, users' description='Account verification'/>
        <Header 
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={activeItem}
        />
        <Hero />
        {
            route === "reset-Password" && (
                <>
                {
                    open && (
                        <CustomModal 
                        open={open}
                        setOpen={setOpen}
                        setRoute={setRoute}
                        component={ResetPassowrd}
                        token={token}
                        />
                    )
                }
                </>
            )
        }
 
  </div>
  )
}

export default Page