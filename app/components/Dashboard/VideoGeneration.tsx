import { style } from '@/app/styles/style'
import DashboardHeading from '@/app/utils/DashboardHeading'
import { ChevronDown, ChevronUp, Sparkles, Video } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { useGetAllVideoQuery, useVideoGenerationMutation } from '@/redux/features/video/videoApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getRandomVideoPrompts } from '@/app/utils/Prompts/randomPrompts'
import { useGetCreditCountQuery } from '@/redux/features/user/userApi'
import { maxCreditCount } from '@/app/utils/constants'

type Props = {
    setOpen: any;
    setRoute: any;
    refetchCredit:any;
}

const VideoGeneration = ({setOpen, setRoute ,refetchCredit}: Props) => {
     const [video, setVideo] = useState("");
     const [videoGeneration, {isLoading, error, isSuccess, data:videoData}] = useVideoGenerationMutation();
     const { refetch} = useGetAllVideoQuery({}, {refetchOnMountOrArgChange:true})
     const {user} = useSelector((state: any) => state.auth);
     const {data: creditData} = useGetCreditCountQuery({});

    const handleSubmit = async (e: any) => {
        e.preventDefault();
      if(!user){
         setOpen(true);
         setRoute("Login")
      }else{
        await videoGeneration(video)
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
    },[ isSuccess, error, refetch, refetchCredit, creditData, setOpen, setRoute])
    const hasndlePrompt = () => {
      const randomPrompt = getRandomVideoPrompts(video);
      setVideo(randomPrompt);
    }
  return (
    <div>
        <DashboardHeading 
        title='Video Generation'
        description="convert your text into video."
        icon={Video}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
        textColor="text-orange-500/90"
        />
          <div className="px-4 lg:px-8">
        <form action="" onSubmit={handleSubmit} className=" w-full  rounded-lg">
          <div className=" w-full flex 800px:flex-row flex-col justify-between lg:gap-10 md:gap-6 800px:items-center">
          <div className=" flex w-full">
            <textarea
              name="prompt"
              cols={30}
              rows={1}
              placeholder="Big fish in the river swim.."
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className={` ${style.input} !rounded-r-none dark:!bg-[#2f0936] !w-full h-fit`}
            ></textarea>
            <div className=" cursor-pointer bg-gray-200 p-3 rounded-r-[5px] text-[14px] dark:bg-[#2f0936] text-center"
            onClick={() => hasndlePrompt()}
            >
              <Sparkles />
            </div>
            </div>

            <div className=" 800px:mt-0 mt-[30px]">
              <button
                type="submit"
                disabled={isLoading}
                className={`active:scale-90 duration-300 text-white p-2 w-full min-w-[120px] rounded ${
                  isLoading ? " bg-gray-600" : "bg-[#771bd3]"
                } `}
              >
                Generate
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className=" 1000px:flex justify-between">
      <div className=" 1000px:w-[60%] space-y-4 mt-5">
        {isLoading && (
          <div className=" w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        )}
       <div className={`${!videoData && "min-h-[300px]"}`}>
       {!video && !isLoading && (
          <div className=" w-full flex flex-col justify-center items-center">
            <Image
              src={require("../../../public/images/3d video icon.png")}
              alt="Girl standing"
              width={500}
              height={500}
              className=" w-[300px] h-[300px] object-contain"
            />
            <p className=" dark:text-white text-black tracking-widest font-semibold ">
              No video generating
            </p>
          </div>
        )}
       </div>
        {videoData && (
          <video controls className=" aspect-video w-full mt-10 800px:px-9 px-5">
            <source src={videoData?.output.url} />
          </video>
        )}
      </div>

        </div>
    </div>
  )
}

export default VideoGeneration