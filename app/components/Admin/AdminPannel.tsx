import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader';
import Adminsidebr from "./Adminsidebr";
import AdminAllUser from "./AdminAllUser";
import AdminAllMessages from "./AdminAllMessages"
import AdminAllSubscribers from "./AdminAllSubscribers"
import { useGetAllUserQuery } from '@/redux/features/user/userApi';
import { useGetAllSubscribersQuery } from '@/redux/features/subscription/subscriptionApi';
type Props = {
    user: any;
}

const AdminPannel = ({user}: Props) => {
    const {data, refetch} = useGetAllUserQuery({},{refetchOnMountOrArgChange:true});
    const {data: subscribersData, refetch: subscribersRefetch} = useGetAllSubscribersQuery({},{refetchOnMountOrArgChange: true});
    const [active, setActive] = useState(1);
    const [item, setItem] = useState([]);
    const [subscribers, setsubscribers] = useState([]);
    
    useEffect(() => {
     if(data){
        refetch();
        setItem(data?.users);
     }
     if(subscribersData){
       subscribersRefetch();
       setsubscribers(subscribersData?.subscribers);
     }
    },[data, refetch, subscribersData,subscribersRefetch])
  return (
    <div>
        <AdminHeader user={user} />
      <div className=' flex w-full'>
      <div className=' 800px:w-[25%] w-[80px]'>
       <Adminsidebr active={active} setActive={setActive} />
       </div>
       <div className=' 800px:w-[75%] w-full  pt-[100px] 800px:px-6'>
         {
            active === 1 && (
               <>
                {
                    item && item.length !== 0 ? (
                        <AdminAllUser item={item} refetch={refetch} />
                    ) : (
                      <p className='text-[20px] font-Poppins text-black dark:text-white'>No user have on database</p>
                    )
                }
               </>
            )
         }
         {
          active === 2 && (
            <>
            {
              item && item.length !== 0 ? (
                <AdminAllMessages item={item} />
              ) : (
                <p className='text-[20px] font-Poppins text-black dark:text-white'>No user have on database</p>
              )
            }
            </>
          )
         }
         {
           active === 3 && (
           <>
           {
            subscribers && item ? (
              <AdminAllSubscribers subscribers={subscribers} item={item} />
            ) : (
              <p className='text-[20px] font-Poppins text-black dark:text-white'>No Subscribers have on database</p>
            )
           }
           </>
           )
         }
       </div>
      </div>
    </div>
  )
}

export default AdminPannel