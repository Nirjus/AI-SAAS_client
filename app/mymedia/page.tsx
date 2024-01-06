"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import MyMediaPage from "../components/media/MyMediaPage"
import Protected from '../hooks/userProtected'
import Footer from '../components/footer/footer'
type Props = {}

const Page = (props: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
  return (
    <div>
       <Protected>
       <Heading 
        title="AI Studio - Media library"
        description='AI Generated Images,Videos, audio most popular Generative AI products'
        keyword='ChatGPT, AI tools, Midjourney, DALL-E'
        />
        <Header route={route} setRoute={setRoute} open={open} setOpen={setOpen} activeItem={activeItem} setActiveItem={setActiveItem} />

         <div className=' pt-[80px] pb-[20px]'>
            <MyMediaPage />
         </div>
         <Footer />
       </Protected>
    </div>
  )
}

export default Page