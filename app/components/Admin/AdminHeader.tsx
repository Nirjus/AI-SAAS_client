import React from 'react'
import ThemeSwitcher from '@/app/utils/Theme/ThemeSwitcher';
import { Verified } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import img from "../../../public/images/avatar.png";

type Props = {
  user: any;
}

const AdminHeader = ({user}: Props) => {
  return (
    <div className=' w-full min-h-[80px] fixed top-0 left-0 '>
        <div className=' border-b-2 border-b-[#85858575] bg-[#a9a8a87f] dark:bg-[#0000004d] backdrop-blur-[6px] flex justify-between px-11 items-center'> 
            <div>
              <p className=' 800px:text-[25px] text-[20px] text-black dark:text-white font-Poppins font-bold'>AI Studio</p>
            </div>
           <div className=' my-3 flex items-center gap-5'>
           <Link href={"/profile"} className=' relative'>
           <Image src={user?.avatar?.url ? user?.avatar?.url : user?.socialAvatar ? user?.socialAvatar : img } className=' w-14 h-14 rounded-full object-cover' alt='avatar' width={500} height={500} /> <Verified fill='blue' className=' text-white absolute bottom-0 right-0'/>
           </Link>
            <ThemeSwitcher />
           </div>
        </div>
    </div>
  )
}

export default AdminHeader