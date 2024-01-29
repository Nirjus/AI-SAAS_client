"use client"
import { style } from '@/app/styles/style';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import {io} from "socket.io-client";
import img from "../../../public/images/avatar.png";
import { useCreateMessageMutation, useGetMessageQuery,  } from '@/redux/features/messages/messageApi';
import { format } from 'timeago.js';

type Props = {
  item: any;
}
type Msg = {
  role: string;
  content: string; 
}

type AdminMsg = {
  userId: string;
  userName: string;
  userAvatar: string;
}
function useChatScroll<T>(dep: T): React.MutableRefObject<HTMLDivElement> {
  const ref:any = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}
export const AdminMsgList = ({userId, userName, userAvatar}: AdminMsg) => {
  const url = process.env.NEXT_PUBLIC_SOCKET_URI!;
  const socket = useMemo(() => io(url),[url]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]); 
  const room =  userId;
  const usrName = userName;   
  const usrAvatar = userAvatar;
  const [createMessage] = useCreateMessageMutation();
  const {data, refetch} = useGetMessageQuery(room,{refetchOnMountOrArgChange:true});
  const ref = useChatScroll(data?.messages);

  const messageSubmitHandler = (e:any) => {
    e.preventDefault();
    socket.emit("send_message", { message, room});
    setMessages([ {role: "me", content:message}]);
    setMessage("");
    }

    useEffect(() => {
     refetch();
       socket.emit("join_room", room);
        socket.on("receive_message", (data:any) => {
        setMessages([ {role: "you", content:data.message}]);
         })
       messages && messages.map( async (msg: any) => {   
        if(msg.role === "me"){
          await createMessage({
            id: room,
            role: "you",
            content: msg.content
          })
        }
        })
    
         return () => {
          socket.on("disconnect",(arg) => {
             console.log(arg);
          });
        }
     },[socket, messages, room, createMessage, refetch])
     
  return(
    <div className=' z-10 p-3 w-fit 800px:m-5 m-1 rounded-[10px] dark:bg-slate-900 bg-slate-300 shadow-xl border border-[#90909084]'>
      <div className=' w-full p-1 rounded-lg dark:bg-[#00000058] bg-[#0000001b] border border-[#8a8a8a83] flex gap-2 items-end'>
        <Image src={usrAvatar} alt={"useravatar"} width={500} height={500} className=' w-12 h-12 rounded-full object-cover' />
        <h1 className=' text-[#894af7]'>Chat with {usrName.slice(0,10)}..</h1>
      </div>
    <div className=' flex flex-col'>
    <div className=' h-[350px] overflow-y-scroll' ref={ref}>
    {
      data && data.messages.map((msg:any, index: number) => (
        <div key={index}>
        {
          msg.role === "me" ? (
            <div className=' flex justify-start mb-1'>
            <p className=' w-fit p-1 max-w-[160px] rounded bg-[#2a46fb4c] border border-[#1e2fca]'>{msg.content}  <span className=' text-left block text-[7px] font-bold'>{format(msg?.timeStamps)}</span></p>
        </div>
        ) : (
          <div className=' flex justify-end mb-1'>
          <p className=' w-fit p-1 max-w-[160px] break-words rounded bg-[#2afb4d48] border border-[#1eca1e]'>{msg.content} <span className=' text-right block text-[7px] font-bold'>{format(msg?.timeStamps)}</span></p>
          </div>
          )
        }
      </div>
      ))
    }
   {
   messages && messages.map((msg, index) => (
    <div key={index}>
      {
        msg.role === "me" ? (
        <div className=' flex justify-end mb-1'>
            <p className=' w-fit p-1 max-w-[160px] rounded bg-[#2afb4d48] border border-[#1eca1e]'>{msg.content} <span className=' text-right block text-[7px] font-bold'>just now</span></p>
        </div>
        ) : (
          <div className=' flex justify-start mb-1'>
          <p className=' w-fit p-1 max-w-[160px] break-words rounded bg-[#2a46fb4c] border border-[#1e2fca]'>{msg.content}  <span className=' text-left block text-[7px] font-bold'>just now</span></p>
          </div>
        )
      }
    </div>
   ))
   }
  </div>
   <div>
   <input type="text" placeholder='Input message..'
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className={`${style.input}`}
    
   />
   <button type="submit" className=' p-2 rounded text-white bg-slate-700'
   onClick={messageSubmitHandler}
   >Send</button>
   </div>
    </div>
 </div>
  )
}

const AdminAllMessages = ({item}: Props) => {

     const [selectUser, setSelectUser] = useState<any>(null);
     const [click, setClick] = useState("");

     const onclickHandler = (user:any) => {
     setSelectUser({
      userId: user?._id,
      userName: user?.name,
      userAvatar: user?.avatar?.url ? user?.avatar?.url : user?.socialAvatar ? user?.socialAvatar : img
     })
     setClick(user?._id);
     }
   

   return (
    <div className=' flex 800px:flex-row flex-col gap-5'>
      <div className=' w-fit h-fit flex 800px:flex-col flex-row gap-2 m-3 p-2 rounded-lg bg-slate-300 shadow-xl border border-[#90909084] dark:bg-slate-900 '>
        {
          item && item.map((user:any, index:number) => (
             <div key={index} className={`cursor-pointer ${click === user?._id && "border-2 border-[#15b8ef] rounded-full p-[2px]"}`} onClick={() => onclickHandler(user)}>
               <Image src={user?.avatar?.url ? user?.avatar.url : user?.socialAvatar ? user?.socialAvatar : img} alt='avatar'
               width={500} height={500} className=' w-11 h-11 rounded-full object-cover'
               />
             </div>
          ))
        }
      </div>
      {
       selectUser ? (
          <AdminMsgList userId={selectUser.userId} userName={selectUser.userName} userAvatar={selectUser.userAvatar} key={selectUser.userId} />
        ) : (
          <p className=' p-3 800px:m-5 m-1 rounded-lg border border-[#8b8b8b84] font-Poppins w-fit h-fit font-semibold text-black dark:text-white bg-[#0000001c] dark:bg-slate-900'>Select a user to start chat</p>
        )
      }
</div>
   )
}

export default AdminAllMessages