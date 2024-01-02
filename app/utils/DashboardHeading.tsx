import { LucideIcon } from 'lucide-react';
import React from 'react'

type Props = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
    textColor?: string;
}

const DashboardHeading = ({title, description, icon:Icon, iconColor, textColor,bgColor}: Props) => {
  return (
    <div className=' px-4 lg:px-8 flex items-center gap-3 mb-8'>
        <div className={` p-2 w-fit rounded-md ${bgColor}`}>
               <Icon className={`w-10 h-10 ${iconColor}`}/>
        </div>  
        <div className="">
            <h1 className=' text-3xl font-bold text-black dark:text-white'>
                {title}
            </h1>
            <p className={`text-sm ${textColor} `}>
                {description}
            </p>
        </div>
    </div>
  )
}

export default DashboardHeading