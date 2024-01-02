import { ArrowRight, Code2Icon, ImageIcon, LayoutDashboard, MessageSquareDotIcon, Music4Icon, Settings, VideoIcon } from 'lucide-react';
import React from 'react'

type Props = {
    setActive: any;
}

const routes = [
   
    {
      label: "Conversation",
      icon: MessageSquareDotIcon,
      active: 2,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10"
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      active: 3,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      active: 4,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      label: "Music Generation",
      icon: Music4Icon,
      active: 5,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      label: "Code Generation",
      icon: Code2Icon,
      active: 6,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

const DashboardInfo = ({setActive}: Props) => {
  return (
    <div className=' space-y-4'>
        <h1 className=' text-2xl md:text-4xl font-bold text-center text-black dark:text-white'>
            Explore the Power of AI
        </h1>
        <p className=' font-light text-sm md:text-lg text-center text-[#8d69f9]'>
            Chat with smartest AI - Experience the power of AI
        </p>
        <div className="px-1 mt-5 md:px-10 lg:px-32 space-y-4">
              {
                routes.map((route) => (
                    <div key={route.active} 
                    onClick={() => setActive(route.active)}
                    className=' p-4 border rounded-lg border-black/5 flex justify-between items-center hover:shadow-md dark:shadow-[#2f2f2f] transition cursor-pointer' >
                    <div className=' flex items-center gap-4'>
                     <div className={` p-2 w-fit rounded-md ${route.bgColor}`}>
                       <route.icon className={`w-8 h-8 ${route.color}`}/>
                     </div>
                     <div className=' font-semibold text-black dark:text-white'>
                        {route.label}
                     </div>
                    </div>
                      <ArrowRight className={`${route.color}`} />
                    </div>
                ))
              }
        </div>
    </div>
  )
}

export default DashboardInfo