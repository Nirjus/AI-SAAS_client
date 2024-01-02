import { style } from '@/app/styles/style'
import DashboardHeading from '@/app/utils/DashboardHeading'
import { ChevronDown, ChevronUp, Video } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { useGetAllVideoQuery, useVideoGenerationMutation } from '@/redux/features/video/videoApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

type Props = {
    setOpen: any;
    setRoute: any
}

const VideoGeneration = ({setOpen, setRoute}: Props) => {
     const [video, setVideo] = useState<string>();
     const [vusial, setVusial] = useState([]);
     const [drawer, setDrawer] = useState(false);
     const [videoGeneration, {isLoading, error, isSuccess, data:videoData}] = useVideoGenerationMutation();
     const {data, refetch} = useGetAllVideoQuery({}, {refetchOnMountOrArgChange:true})
     const {user} = useSelector((state: any) => state.auth);

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
      }
      if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
      }
      if(data){
        setVusial(data?.videos);
      }
    },[data, isSuccess, error, refetch])
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
            <textarea
              name="prompt"
              cols={30}
              rows={1}
              placeholder="big fish in the river.."
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className={` ${style.input} dark:!bg-[#2f0936] !w-full h-fit`}
            ></textarea>

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
        {videoData && (
          <video controls className=" aspect-video w-full mt-10 800px:px-9 px-5">
            <source src={videoData?.output} />
          </video>
        )}
      </div>
      <div className=" 1000px:w-[40%] h-fit sticky mt-10 800px:p-8 p-3 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
          <div className=" flex gap-5 items-center">
            <p className=" pl-2 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
              List of videos you generated
            </p>
            {drawer ? (
              <ChevronDown size={25} className=" cursor-pointer" onClick={() => setDrawer(false)} />
            ) : (
              <ChevronUp size={25} className=" cursor-pointer" onClick={() => setDrawer(true)} />
            )}
          </div>
          {drawer && (
            <div className=" w-full max-h-[400px] overflow-y-scroll ">
              {vusial &&
                vusial.map((video: any, index: number) => (
                <div className=" w-full mt-7 " key={index}>
                <p className=" pl-5 font-semibold text-[#ea3c76] dark:text-[#3faceb]">{video.prompt}</p>
                  <video controls className=" w-full aspect-video mt-1 ">
                    <source src={video.video} />
                  </video>
                </div>
                ))}
                {
                  vusial && vusial.length === 0 && (
                    <p className=' tracking-widest mt-5 font-semibold text-center'>No video have till now</p>
                  )
                }
            </div>
          )}
        </div>
        </div>
    </div>
  )
}

export default VideoGeneration