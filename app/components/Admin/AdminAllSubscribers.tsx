import React from 'react'
import img from "../../../public/images/avatar.png";
import Image from 'next/image';
import { format } from 'timeago.js';
type Props = {
    subscribers: any;
    item: any;
}

const AdminAllSubscribers = ({subscribers, item}: Props) => {
 
     const users = subscribers && subscribers.map((i:any) => {
      const matching =  item && item.find((user: any) => 
            i.userId === user?._id
        )
       if(matching){
        return{
            userId: matching._id,
            name: matching.name,
            avatarUrl: matching.avatar?.url ? matching.avatar?.url: matching?.socialAvatar ? matching?.socialAvatar : img,
            subscriptionPeriod: i.stripeCurrentPeriodEnd
        }
       }
         return null
     }).filter((user:any) => user !== null);
     
  return (
    <div>
           <h1 className=' text-center 800px:text-[25px] text-[22px] font-Josefin font-bold text-[#212121bf] dark:text-[#b1b0b0] '>Our Subscribers</h1>

           <div className=' pt-10 px-5 flex flex-wrap gap-10'>
             {
                users.map((user: any) => (
                    <div key={user?.userId} className=' p-2 w-fit rounded bg-[#dcf3de] dark:bg-[#9a29f718] shadow-lg'>
                     <div className=' flex items-end gap-5 border-2 border-[#8a8a8a7d] p-1 rounded-lg '>
                        <Image src={user?.avatarUrl} alt={"avatar"} width={500} height={500} className=' w-10 h-10 rounded-full object-cover' />
                        <p className=' font-Josefin font-bold text-[#0f491a] dark:text-[#77468d] text-[18px] italic'>{user?.name}</p>
                     </div>
                     <div>
                        <p><span className=' text-[#0f491a] font-Poppins dark:text-[#77468d] font-bold'>userId: </span>{user?.userId}</p>
                        <p><span className=' text-[#0f491a] font-Poppins dark:text-[#77468d] font-bold'>Subscription end in: </span>{format(user?.subscriptionPeriod)}</p>
                     </div>
                    </div>
                ))
             }
           </div>
    </div>
  )
}

export default AdminAllSubscribers