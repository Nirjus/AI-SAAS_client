"use client";
import { style } from "@/app/styles/style";
import {
  useGetMessageQuery,
} from "@/redux/features/messages/messageApi";
import axios from "axios";
import { MessagesSquare, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
type Props = {};
type Msg = {
  role: string;
  content: string;
};
type ChatMsg = {
  userId: string;
  currentUser: any;
};
function useChatScroll<T>(dep: T): React.MutableRefObject<HTMLDivElement> {
  const ref: any = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}
export const CrispChat = ({ userId, currentUser }: ChatMsg) => {
  const url = process.env.NEXT_PUBLIC_SOCKET_URI!;
  const dispatch = useDispatch();
  const { socket } = useSelector((state: any) => state.messages);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const room = userId;
  const { data, refetch } = useGetMessageQuery(room, {
    refetchOnMountOrArgChange: true,
  });
  const ref = useChatScroll(data?.messages);
   
  const messageSubmitHandler = async () => {
    if (message !== "") {
      try {
        await axios.post(`${url}/api/messages/create`,{
          from: userId,
          to: currentUser?._id,
          content: message,
        }).then((res) => {
          socket.emit("send-message", {
            to: currentUser?._id,
            from: userId,
            message: res.data.message
          })
          dispatch({
            type: "ADD_MESSAGES",
            newMessage: res.data.message
          })

        }).catch((error: any) => {
          toast.error(error)
        })

        setMessage("");
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div className=" z-10 w-fit p-5 rounded-[10px] dark:bg-slate-950 bg-slate-300 shadow-xl border border-[#90909084] fixed bottom-20 right-10">
      <div className=" w-full p-2 bg-[#00000017] flex gap-2 items-end dark:bg-[#00000056] border rounded-lg border-[#92929287] ">
        <Image src={currentUser?.avatar?.url} height={500} width={500} alt="avatar" className=" w-10 h-10 rounded-full object-cover"  /> chat with admin
      </div>
      <div className=" flex flex-col">
        <div className="  h-[350px] overflow-y-scroll" ref={ref}>
          {data &&
            data.messages.map((msg: any, index: number) => (
              <div key={index}>
                {msg.role === "me" ? (
                  <div className=" flex justify-end mb-1">
                    <p className=" w-fit p-1 max-w-[160px] rounded bg-[#2afb4d48] border border-[#1eca1e]">
                      {msg.content}{" "}
                      <span className=" text-right block text-[7px] font-bold">
                        {format(msg?.timeStamps)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className=" flex justify-start mb-1">
                    <p className=" w-fit p-1 max-w-[160px] break-words rounded bg-[#2a46fb4c] border border-[#1e2fca]">
                      {msg.content}{" "}
                      <span className=" text-left block text-[7px] font-bold">
                        {format(msg?.timeStamps)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          {messages &&
            messages.map((msg, index) => (
              <div key={index}>
                {msg.role === "me" ? (
                  <div className=" flex justify-end mb-1">
                    <p className=" w-fit p-1 max-w-[160px] rounded bg-[#2afb4d48] border border-[#1eca1e]">
                      {msg.content}{" "}
                      <span className=" text-right block text-[7px] font-bold">
                        just now
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className=" flex justify-start mb-1">
                    <p className=" w-fit p-1 max-w-[160px] break-words rounded bg-[#2a46fb4c] border border-[#1e2fca]">
                      {msg.content}{" "}
                      <span className=" text-left block text-[7px] font-bold">
                        {" "}
                        just now
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          {!userId && (
            <p className=" text-center italic font-semibold">
              Login to chat with admin
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Input message.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${style.input}`}
          />
          <button
            type="submit"
            className=" p-2 rounded bg-slate-700 text-white"
            onClick={messageSubmitHandler}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
const CrispProvider = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [currentUser, setCurrentUser] = useState([]);
  const [open, setOpen] = useState(false);
  const url = process.env.NEXT_PUBLIC_SOCKET_URI!;
  useEffect(() => {
    const getAdminUser = async () => {
      try {
        await axios
          .get(`${url}/api/user/get-admin`, { withCredentials: true })
          .then((res) => {
            setCurrentUser(res.data.user);
          }).catch((error) => {
            toast.error(error)
          })
      } catch (error) {
        console.log(error)
      }
    };
    getAdminUser();
  }, [url]);

  return (
    <>
      <div
        className=" cursor-pointer bg-blue-500 p-3 z-10 duration-300 transition-all rounded-full w-fit fixed bottom-5 right-10"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X color={"white"} size={35} />
        ) : (
          <MessagesSquare color={"white"} size={35} />
        )}
      </div>
      {open && <CrispChat userId={user?._id} currentUser={currentUser} />}
    </>
  );
};

export default CrispProvider;
