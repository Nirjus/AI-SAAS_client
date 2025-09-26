"use client"
import React, { useState } from 'react'
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { faqArray } from '../utils/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/footer/footer';

type Props = {}

interface DrawerProps {
  index: number,
  faq: any,
}

const Page = (props: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(4);
  
  return (
    <div>
         <Heading
        title="AI Studio - FAQ"
        description="Make next level Ai Generated Images, text, code snippets"
        keyword="ChatGpt, Ai tools, Image Generation"
      />
      <Header
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={activeItem}
      />
      <div className=' pt-[90px]'>
           <div className=' mt-[40px]'>
            <h1 className=' text-center font-Poppins text-[25px] text-black dark:text-white font-semibold'>Frequently Asked Question</h1>
           </div>
          
        <div className=' my-[60px] 1500px:w-[65%] 1200px:w-[70%] w-full m-auto'>
              {
                faqArray.map((faq,index:number) => (
                  <QNADrawer index={index} key={index} faq={faq} />
                ))
              }
        </div>
           
      </div>
      <Footer />
    </div>
  )
}
const QNADrawer = ({index:key, faq}:DrawerProps) => {
  const [drawer, setDrawer] = useState(false);
 
   const notvisibleDrawer = () => {   
    setDrawer(false);

   }
   const visibleDrawer = () => {

    setDrawer(true);
   }
  return(
    <div key={key} className=' p-3'>
    <div className=' p-2 py-4 flex justify-between items-center'>
    <h1 className=' 800px:text-[20px] text-[18px] text-black dark:text-white font-semibold font-Poppins'>
       {faq.question}
      </h1>
     {
       drawer ? (
         <ChevronDown className=' cursor-pointer' onClick={() => notvisibleDrawer()} />
       ) : (
         <ChevronUp className=' cursor-pointer' onClick={() => visibleDrawer()} />
       )
     }
    </div>
      {
        drawer ? (
       <div className=' p-2 py-4'>
           <p className=' text-[16px] text-[#000000bc] dark:text-[#ffffff9c] font-Josefin font-semibold'>
       {faq.answer}
      </p>
       </div>
        ) : (
          ""
        )
      }
     <div className=' border-b border-b-black dark:border-b-white'></div>
 </div>
  )
}
export default Page