import { useGetAllConversationQuery } from '@/redux/features/conversation/conversationApi';
import { PencilIcon } from 'lucide-react';
import Image from 'next/image';
import React,{useState, useEffect, useRef} from 'react'
import toast from 'react-hot-toast';
import ReactMarkdown from "react-markdown";
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
type Props = {}

const ChatGalary = (props: Props) => {
  const [getMsg, setGetMsg] = useState([]);
  const {user} = useSelector((state: any) => state.auth);
  const {data, refetch, error} = useGetAllConversationQuery({},{refetchOnMountOrArgChange:true});
  const pRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
     if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
     }
     if(data){
      setGetMsg(data?.conversations);
     }
    
   },[error, refetch, data])
   const copyText = async () => {
    try {
      const textToCopy = pRef.current?.innerText;
      if(textToCopy){
      await navigator.clipboard.writeText(textToCopy);
      alert('Text copied to clipboard!');
      }else{
        console.warn('Text element is null or empty');
      }
    } catch (error) {
      console.error('Unable to copy text to clipboard', error);
    }
  }
  return (
    <div className=' w-full'>
         <div className=' 800px:pl-[30px]'>
        <h1 className=' text-[25px] font-Poppins font-bold text-black dark:text-white underline pb-2'>Best AI Generated chats</h1>
        <p className=' text-[16px] font-Poppins font-semibold text-black dark:text-white'> Generative AI Chat GPT</p>
        </div>
        <div className=" 1000px:w-[75%] m-auto h-fit sticky mt-10 800px:p-7 p-4 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
          <div className=" flex gap-5 items-center">
            <p className=" py-4 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
               Chat history
            </p>
    
          </div>

            <div className=" w-full max-h-[600px] overflow-y-scroll ">
              {getMsg &&
                getMsg.map((msg: any, index: number) => (
                <div className=" w-full mt-7 " key={index}>
                <div className='flex justify-between p-2 bg-[#00000015] dark:bg-[#5fffff0a] rounded-[6px] gap-2 items-start'>
                 <p className=' bg-cyan-500 w-10 h-10 text-center p-2 rounded-full'>{user?.name[0]}</p>
                <p className=" font-semibold w-[85%] text-[18px] text-[#ea3c76] dark:text-[#3faceb]">{msg.prompt}</p>
                </div>
                 <div className='flex relative justify-between mt-2 gap-2 p-2 rounded-[6px] bg-white dark:bg-[#38035630] items-start'>
                  <Image src={require("../../../public/images/logo.png")} alt='logo png' width={500} height={500} className='w-10 h-10 rounded-full' />
                  <p ref={pRef} className=" hidden ">
                   {msg?.answer}
                   </p>
                  <ReactMarkdown components={{
                     ol: ({node, ...props}) => (
                      <ol className=' list-decimal list-inside ' {...props}></ol>
                    ),
                    ul: ({node, ...props}) => (
                      <ul className=' list-disc list-inside ' {...props}></ul>
                    ),
                    pre:({node, ...props}) => (
                      <div className=' overflow-auto w-full my-2 bg-black/10 dark:bg-[#323232]  p-2 rounded-md'>
                        <pre {...props} />
                      </div>
                    ),
                    code: ({node, ...props}) => (
                      <code className=" bg-black/10 rounded-lg text-[#531414] dark:text-[#bfd1ff] p-1" {...props} />
                    )
                  }}
                   className={" text-sm overflow-hidden leading-7 w-[85%]"}
                  >
                  {msg.answer || ""}
                  </ReactMarkdown>
                  <button className=' p-1 border border-black dark:border-white absolute left-[15px] top-[60px]'
            onClick={() => copyText() }
          >
            <PencilIcon size={15} className=' text-black dark:text-white' />
          </button>
                 </div>
                 <p className=' bg-[#00000015] dark:bg-[#5fffff0a] pl-[60px] rounded'>created : {format(msg.createdAt)}</p>
                </div>
                ))}
                {
                 getMsg && getMsg.length === 0 && (
                    <p className=' tracking-widest mt-5 font-semibold text-center'>No chats have till now</p>
                  )
                }
            </div>
    
        </div>
    </div>
  )
}

export default ChatGalary