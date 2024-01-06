import { useGetAllVideoQuery } from '@/redux/features/video/videoApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const VideoGalary = (props: Props) => {
    const [vusial, setVusial] = useState([]);
    const {data, refetch, error} = useGetAllVideoQuery({}, {refetchOnMountOrArgChange:true})
    useEffect(() => {
        if(error){
          if("data" in error){
              const errorData = error as any;
              toast.error(errorData.data.message);
          }
        }
        if(data){
           refetch();
          setVusial(data?.videos);
        }
       
      },[data,  error, refetch])
  return (
    <div className=' w-full'>
         <div className=' 800px:pl-[30px]'>
        <h1 className=' text-[25px] font-Poppins font-bold text-black dark:text-white underline pb-2'>Best AI Generated Videos</h1>
        <p className=' text-[16px] font-Poppins font-semibold text-black dark:text-white'> Generative AI Video, Stable defusion</p>
        </div>
        <div className=" 1200px:w-[80%] 1500px:w-[70%] 800px:w-[90%] h-fit sticky mt-10 m-auto 800px:p-8 p-3 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
          <div className=" flex gap-5 items-center">
            <p className=" pl-2 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
              List of videos you generated
            </p>
            
          </div>

            <div className=" w-full max-h-[90vh] mt-5 overflow-y-scroll ">
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
       
        </div>
    </div>
  )
}

export default VideoGalary