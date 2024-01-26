"use client"
import { style } from '@/app/styles/style';
import { useCreateMessageMutation, useGetMessageMutation } from '@/redux/features/messages/messageApi';
import { MessagesSquare, UserCircle, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import {io} from "socket.io-client";
import { format } from 'timeago.js';
type Props = {}
type Msg = {
  role: string;
  content: string; 
}
type ChatMsg = {
  userId: string;
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
export const CrispChat = ({userId}: ChatMsg) => {
  const socket = useMemo(() => io("http://localhost:8000"),[]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]); 
  const [room, setRoom] = useState(userId);
  const [createMessage] = useCreateMessageMutation();
  const [getMessage,{data}] = useGetMessageMutation();
  const ref = useChatScroll(data?.messages);
 
  const messageSubmitHandler = (e:any) => {
  e.preventDefault();
  socket.emit("send_message", { message, room});
  setMessages([{role: "me", content:message}]);
  setMessage("");
  }

    useEffect(() => {
      socket.emit("join_room", room);
      socket.on("receive_message", (data:any) => {
      setMessages([{role: "you", content:data.message}]);
       })
       messages && messages.map( async (msg: any) => {    
        if(msg.role === "me"){ 
        await createMessage({
          id: room,
          role: "me",
          content: msg.content
        })
      }
      })
       getMessage(room);
        return () => {
          socket.on("disconnect",(arg) => {
            console.log(arg);
         });
    };
   },[socket, messages, room, getMessage, createMessage])
   console.log(data?.messages)
 return (
  <div className=' z-10 w-fit p-5 rounded-[10px] dark:bg-slate-950 bg-slate-300 shadow-xl border border-[#90909084] fixed bottom-20 right-10'>
    <div className=' w-full p-2 bg-[#00000017] flex gap-2 items-end dark:bg-[#00000056] border rounded-lg border-[#92929287] '>
      <UserCircle size={25} /> chat with admin
    </div>
    <div className=' flex flex-col'>
    <div className='  h-[350px] overflow-y-scroll' ref={ref}>
    {
      data && data.messages.map((msg:any, index: number) => (
        <div key={index}>
        {
          msg.role === "me" ? (
            <div className=' flex justify-end mb-1'>
            <p className=' w-fit p-1 max-w-[160px] rounded bg-[#2afb4d48] border border-[#1eca1e]'>{msg.content} <span className=' text-right block text-[7px] font-bold'>{format(msg?.timeStamps)}</span></p>
        </div>
        ) : (
          <div className=' flex justify-start mb-1'>
          <p className=' w-fit p-1 max-w-[160px] break-words rounded bg-[#2a46fb4c] border border-[#1e2fca]'>{msg.content}  <span className=' text-left block text-[7px] font-bold'>{format(msg?.timeStamps)}</span></p>
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
          <p className=' w-fit p-1 max-w-[160px] rounded bg-[#2afb4d48] border border-[#1eca1e]'>{msg.content}  <span className=' text-right block text-[7px] font-bold'>just now</span></p>
      </div>
      ) : (
        <div className=' flex justify-start mb-1'>
        <p className=' w-fit p-1 max-w-[160px] break-words rounded bg-[#2a46fb4c] border border-[#1e2fca]'>{msg.content}  <span className=' text-left block text-[7px] font-bold'> just now</span></p>
        </div>
        )
      }
    </div>
   ))
   }
   {
    !userId && (
      <p className=' text-center italic font-semibold'>Login to chat with admin</p>
    )
   }
  </div>
   <div>
   <input type="text" placeholder='Input message..'
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className={`${style.input}`}
    
   />
   <button type="submit" className=' p-2 rounded bg-slate-700 text-white'
   onClick={messageSubmitHandler}
   >Send</button>
   </div>
    </div>
 
</div>
 )
}
const CrispProvider = (props: Props) => {
  const {user} = useSelector((state:any) => state.auth);
  const [open, setOpen] = useState(false);
  return (
   <>
   <div className=' cursor-pointer bg-blue-500 p-3 z-10 duration-300 transition-all rounded-full w-fit fixed bottom-5 right-10' onClick={() => setOpen(!open)}>
    {
      open ? <X color={"white"} size={35} /> :<MessagesSquare color={"white"} size={35} />
    }
   </div>
     {
          open && (
            <CrispChat userId={user?._id} />
          )
     }
   </>
  )
}

export default CrispProvider