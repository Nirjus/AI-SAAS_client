"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import { useSelector } from 'react-redux'
import Protected from '../hooks/userProtected'
import Profile from "../components/Profile/Profile"
import { useLoaduserQuery } from '@/redux/features/api/apiSlice'
import Loader from '../components/Loader'
import Footer from '../components/footer/footer'
type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const [activeItem, setActiveItem] = useState(6);
    const {user} = useSelector((state:any) => state.auth)
    
  return (
    <div>
      <Protected>
      <Heading 
           title={`${user?.name} - Profile`}
           description='User Profile, Authenticated Profile'
           keyword='Ai platform for Image generation, chat bot'
        />
        <Header
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={activeItem}
        />
            <Profile user={user}/>
      
        <Footer />
      </Protected>
    </div>
  )
}

export default Page