import DashboardHeading from '@/app/utils/DashboardHeading'
import { ChevronDown, ChevronUp, Code2, PencilIcon } from 'lucide-react'
import React, { useState,useEffect, useRef } from 'react'
import { style } from '@/app/styles/style';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import ReactMarkdown from "react-markdown";
import { useCodeCreationMutation, useGetAllcodesQuery } from '@/redux/features/code/codeApi';

type Props = {
    setOpen: any;
    setRoute: any;
}

const CodeGeneration = ({setOpen, setRoute}: Props) => {
    const [message, setMessage] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [getMsg, setGetMsg] = useState([]);
  const [codeCreation,{isSuccess, data:messageData,isLoading,error}] = useCodeCreationMutation();
  const {data, refetch} = useGetAllcodesQuery({},{refetchOnMountOrArgChange:true});
  const {user} = useSelector((state: any) => state.auth);
  const pRef = useRef<HTMLParagraphElement | null>(null);
 const handleSubmit = async (e:any) => {
  e.preventDefault();
   if(!user){
    setOpen(true);
    setRoute("Login");
   }else{
   await codeCreation(message);
   }
 }
 useEffect(() => {
  if(isSuccess){
    refetch();
  }
   if(error){
    if("data" in error){
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
   }
   if(data){
    setGetMsg(data?.codesArray);
   }
 },[error, isSuccess, refetch, data])
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
    <div>
        <DashboardHeading
         title='Code Generation'
         description='Coding problem to solution'
         icon={Code2}
         iconColor='text-yellow-500'
         bgColor='bg-yellow-500/10'
         textColor='text-yellow-500/80'
        />
        <div className='px-4 lg:px-8'>
            <form action="" onSubmit={handleSubmit} className=' w-full  rounded-lg'>
              <div className=' w-full flex 800px:flex-row flex-col justify-between lg:gap-10 md:gap-6 800px:items-center'>
                <textarea
                 name="prompt"
                 cols={30}
                 rows={1}
                  placeholder='past here a coding problem...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${style.input} dark:!bg-[#2f0936] !w-full h-fit`}
                  ></textarea>
    
                   <div className=' 800px:mt-0 mt-[30px]'>
                <button type="submit" disabled={isLoading} className={`active:scale-90 duration-300 text-white p-2 w-full min-w-[120px] rounded ${
                  isLoading ? " bg-gray-600" : "bg-[#771bd3]"
                } `}>
                    Generate
                </button>
              </div>
              </div>
            </form>
        </div>
        <div className=" 1000px:flex justify-between gap-3">
      <div className=" 1000px:w-[55%]">
        {isLoading && (
          <div className=" w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        )}
        {!message && !isLoading && (
          <div className=" w-full flex flex-col justify-center items-center">
            <Image
              src={require("../../../public/images/codinglogo.png")}
              alt="chats"
              width={500}
              height={500}
              className=" w-[300px] h-[300px] object-contain -rotate-12"
            />
            <p className=" dark:text-white text-black tracking-widest font-semibold ">
              No Code generating
            </p>
          </div>
        )}
        {messageData && (
        <div className=' w-full relative flex gap-4 mt-10 800px:p-5 p-3 bg-slate-100 dark:bg-[#bd64d81e] rounded-[6px]'>
          <Image src={require("../../../public/images/logo.png")} alt='logo png' width={500} height={500} className='w-10 h-10 rounded-full' />
            <p ref={pRef} className=" hidden ">
            {messageData?.output}
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
                  {messageData?.output || ""}
                  </ReactMarkdown>
          <button className=' p-1 border border-black dark:border-white absolute left-5 top-20'
            onClick={() => copyText() }
          >
            <PencilIcon size={15} className=' text-black dark:text-white' />
          </button>
        </div>
        )}
      </div>
      <div className=" 1000px:w-[45%] h-fit sticky mt-10 800px:p-7 p-4 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
          <div className=" flex gap-5 items-center">
            <p className=" pl-2 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
              Previous chat history
            </p>
            {drawer ? (
              <ChevronDown size={25} className=" cursor-pointer" onClick={() => setDrawer(false)} />
            ) : (
              <ChevronUp size={25} className=" cursor-pointer" onClick={() => setDrawer(true)} />
            )}
          </div>
          {drawer && (
            <div className=" w-full max-h-[400px] overflow-y-scroll ">
              {getMsg &&
                getMsg.map((msg: any, index: number) => (
                <div className=" w-full mt-7 " key={index}>
                <div className='flex justify-between p-2 bg-[#00000015] dark:bg-[#5fffff0a] rounded-[6px] gap-2 items-start'>
                 <p className=' bg-cyan-500 w-10 h-10 text-center p-2 rounded-full'>{user?.name[0]}</p>
                <p className=" font-semibold w-[85%] text-[18px] text-[#ea3c76] dark:text-[#3faceb]">{msg.prompt}</p>
                </div>
                 <div className=' flex justify-between mt-2 gap-2 p-2 rounded-[6px] bg-white dark:bg-[#38035630] items-start'>
                  <Image src={require("../../../public/images/logo.png")} alt='logo png' width={500} height={500} className='w-10 h-10 rounded-full' />
                  {/* <p className=" w-[85%] text-black dark:text-white text-justify">
                    {msg.answer}
                  </p> */}
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
                  {msg.solution || ""}
                  </ReactMarkdown>
                 </div>
                </div>
                ))}
                {
                  getMsg &&  getMsg.length === 0 && (
                        <p className=' tracking-widest mt-5 font-semibold text-center'>No chats have till now</p>
                    )
                }
            </div>
          )}
        </div>
        </div>
    </div>
  )
}

export default CodeGeneration