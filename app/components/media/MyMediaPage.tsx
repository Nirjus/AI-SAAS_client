import { Code2, FileAudio, FileVideo, GanttChartSquareIcon, Image } from 'lucide-react'
import React, { useState } from 'react'
import ImageGalary from "./ImageGalary";
import VideoGalary from "./VideoGalary";
import AudioGalary from "./AudioGalary";
import ChatGalary from "./ChatGalary";
import CodeGalary from "./CodeGalary";

type Props = {}

const media = [
    {
        label: "Images",
        bgColor:"bg-lime-500/20",
        icon: Image,
        imgColor: "text-lime-500",
        active: 1
    },
    {
        label: "Videos",
        bgColor:"bg-cyan-500/20",
        icon: FileVideo,
        imgColor: "text-cyan-500",
        active: 2
    },
    {
        label: "Audios",
        bgColor:"bg-orange-500/20",
        icon: FileAudio,
        imgColor: "text-orange-500",
        active: 3
    },
    {
        label: "Chats",
        bgColor:"bg-purple-500/20",
        icon: GanttChartSquareIcon,
        imgColor: "text-purple-500",
        active: 4
    },
    {
        label: "Codes",
        bgColor:"bg-pink-500/20",
        icon: Code2,
        imgColor: "text-pink-500",
        active: 5
    },
]

const MyMediaPage = (props: Props) => {
    const [active, setActive] = useState(1);

  return (
    <div className=' w-full '>
        <div className=' w-[90%] m-auto'>
            <div className=" mt-[20px] dark:bg-[#11031e] bg-[#faf9ff] shadow-lg  flex 800px:gap-3 gap-0 justify-center">
              {
                media.map((med) => (
                    <div key={med.active} className={` m-2 p-2 rounded-md ${med.active === active && "dark:bg-white/10 bg-[#00000008]"} cursor-pointer`}
                    onClick={() => setActive(med.active)}
                    >
                    <div className=' flex items-center gap-2'>
                   <div className={`${med.bgColor} p-2 rounded`}> <med.icon size={30} className={`${med.imgColor}`}/></div>
                      <p className=' font-Josefin text-lg font-semibold text-black dark:text-white max-800px:hidden'>{med.label}</p>
                    </div>
                    </div>
                ))
              }
            </div>
            <div className=' mt-[40px] 800px:w-[90%] m-auto w-full'>
                  {
                    active === 1 && (
                        <ImageGalary />
                    )
                  }
                  {
                    active === 2 && (
                        <VideoGalary />
                    )
                  }
                  {
                    active === 3 && (
                        <AudioGalary />
                    )
                  }
                  {
                    active === 4 && (
                        <ChatGalary />
                    )
                  }
                  {
                    active === 5 && (
                        <CodeGalary />
                    )
                  }
            </div>
        </div>
    </div>
  )
}

export default MyMediaPage