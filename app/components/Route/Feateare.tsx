import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Feateare = (props: Props) => {
  return (
    <div className=' my-5  800px:w-[80%] w-[90%] m-auto '>
        <h1 className=' text-center 1200px:text-[36px] 800px:text-[28px] text-[20px] font-extrabold font-Josefin '>  Unleashing The Glorious <br /> Future Of <span className=' text-transparent bg-clip-text bg-gradient-to-r from-[#2474ff] to-[#11f94b]'>Ai Tools</span></h1>
        <div className=' 800px:p-[25px] p-4 my-4 rounded-[10px] bg-[#00000012] dark:bg-[#f3f2fd11]'>
          <p className=' text-center text-[#000000a0] font-Poppins font-semibold text-[18px] dark:text-[#ffffff8f]'>
          One of the most prominent techniques in AI generation is the
          <br />
            use of Generative Adversarial Networks
          </p>
        </div>
        <div className='mt-[60px] 800px:flex'>
            <div className=' 800px:p-3 p-2 800px:w-[50%] '>
            <video controls autoPlay loop className=' w-full aspect-video rounded-[8px] '>
                <source src={require('../../../public/video/AiVideo.mp4')}  type="video/mp4"/>
            </video>
            </div>
            <div className='  800px:p-3 p-2 800px:w-[50%]'>
            <div className=' h-full min-h-[200px] flex flex-col justify-between items-center  p-4 rounded-[10px] bg-[#0000001a] dark:bg-[#f3f2fd0e]'>
          <p className=' text-center 800px:text-[35px] text-[25px]  text-[#000000a0] font-Poppins font-extrabold  dark:text-[#ffffff8f]'>
            Start your
            <br />
             Ai Generation now
          </p>
               <Link href={"/dashboard"}>
               <button className=' text-white p-2 py-4 font-Poppins bg-slate-800 rounded-lg'>
            Get Started
           </button>
               </Link>
        </div>
            </div>
        </div>
    </div>
  )
}

export default Feateare