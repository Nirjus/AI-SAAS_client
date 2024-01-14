import DashboardHeading from '@/app/utils/DashboardHeading'
import { Code2, Copy } from 'lucide-react'
import React, { useState,useEffect } from 'react'
import { style } from '@/app/styles/style';
import toast from 'react-hot-toast';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import ReactMarkdown from "react-markdown";
import { useCodeCreationMutation, useGetAllcodesQuery } from '@/redux/features/code/codeApi';
import { useGetCreditCountQuery } from '@/redux/features/user/userApi';
import { maxCreditCount } from '@/app/utils/constants';

type Props = {
    setOpen: any;
    setRoute: any;
    refetchCredit: any;
}
type Message = {
  role: string;
  content: string;
};
const CodeGeneration = ({setOpen, setRoute, refetchCredit}: Props) => {
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState<Message[]>([]);
  const [codeCreation,{isSuccess, data:messageData,isLoading,error}] = useCodeCreationMutation();
  const { refetch} = useGetAllcodesQuery({},{refetchOnMountOrArgChange:true});
  const {user} = useSelector((state: any) => state.auth);
  const {data: creditData} = useGetCreditCountQuery({})
 const handleSubmit = async (e:any) => {
  e.preventDefault();
   if(!user){
    setOpen(true);
    setRoute("Login");
   }else{
    try {
       const response = await codeCreation(message); 
       if("data" in response && response.data){
        setConversation([...conversation, {role:"user", content:message}, {role:"assistant", content:response?.data?.output}]);

        setMessage("");
       }
    } catch (error) {
        console.log("code creaton error", error);
    }
   }
 }
 useEffect(() => {
  if(isSuccess){
    refetch();
    refetchCredit();
  }
   if(error){
    if("data" in error){
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
   }
   if(creditData?.credit === maxCreditCount){
    setOpen(true);
    setRoute("pro-modal");
  }
 },[error, isSuccess, refetch, refetchCredit, creditData, setRoute, setOpen])
  const copyText = async (text:string) => {
    try {
      const textToCopy = text;
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
        <div className=" 1000px:flex mt-[20px] justify-between gap-3">
      <div className=" 1200px:w-[75%] px-4 lg:px-8">
        {isLoading && (
          <div className=" w-full h-fit my-3 flex justify-center items-center">
            <Loader />
          </div>
        )}
        {conversation.length === 0 && !isLoading && (
          <div className=" w-full flex flex-col justify-center items-center">
            <Image
              src={require("../../../public/images/codinglogo.png")}
              alt="chats"
              width={500}
              height={500}
              className=" w-[300px] h-[300px] object-contain"
            />
            <p className=" dark:text-white text-black tracking-widest font-semibold ">
              No Code generating
            </p>
          </div>
        )}
        <div className= {` ${conversation.length !== 0 && "h-[75vh]"} overflow-y-scroll`}>
       {conversation.map((item, index) => (
            <div key={index} className={`w-full relative flex gap-4 mt-2 800px:p-5 p-3 bg-slate-100 dark:bg-[#bd64d81e] rounded-[6px]`}>
         {
          item.role === "assistant" ? (
            <Image src={require("../../../public/images/logo.png")} alt='logo png' width={500} height={500} className='w-10 h-10 rounded-full' />
          ) : (
            <p className=' bg-cyan-500 w-10 h-10 text-center p-2 rounded-full'>{user?.name[0]}</p>
          )
         }
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
                   className={`text-sm overflow-hidden leading-7 w-[85%] ${item?.role === "user" && " dark:text-white text-black text-[20px] font-Poppins font-bold"}`}
                  >
                  {item?.content || ""}
                  </ReactMarkdown>
        {
          item.role === "assistant" && (
            <button className=' p-1 border border-black dark:border-white absolute left-5 top-20'
            onClick={() => copyText(item?.content) }
          >
            <Copy size={15} className=' text-black dark:text-white' />
          </button>
          )
        }
        </div>
        ))}
       </div>
      </div>
     
        </div>
    </div>
  )
}

export default CodeGeneration