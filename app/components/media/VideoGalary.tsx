import { style } from '@/app/styles/style';
import { useGetAllVideoQuery } from '@/redux/features/video/videoApi';
import { Heart, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}
interface IVideoPrps{
  video: any;
  index: number;
}
const VideoGalary = (props: Props) => {
    const [vusial, setVusial] = useState<any>([]);
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [select, setSelect] = useState(false);
    const [object, setObject] = useState<any>([]);
    const {data, refetch, error} = useGetAllVideoQuery({}, {refetchOnMountOrArgChange:true})

    const handleSearchChange = (e:any) => {
      const term = e.target.value;
      term === "" ? setSelect(false) : setSelect(true);
      setSearchTerm(term);
        const filteredData = data && data?.videos.filter((img:any) => 
           img.prompt.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredData);
    }
    const handleSelect = (data:any) => {
     setObject([data]);
      setSearchTerm(data?.prompt);
      setSelect(false);
    }
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
        <div className=' 800px:flex justify-between'>
        <div className=" 1200px:w-[80%] 1500px:w-[70%] 800px:w-[90%] h-fit sticky mt-10 m-auto 800px:p-8 p-3 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
            <p className=" pl-2 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
              List of videos you generated
            </p>
            <div className=" w-full max-h-[90vh] mt-5 overflow-y-scroll ">
              {vusial &&
                vusial.map((video: any, index: number) => (
                <VideoComponent video={video} index={index} key={index} />
                ))}
                {
                  vusial && vusial.length === 0 && (
                    <p className=' tracking-widest mt-5 font-semibold text-center'>No video have till now</p>
                  )
                }
            </div>
        </div>
        <div className=' max-800px:flex justify-between items-center'>
        <div className=' mt-10 border-2 w-fit h-fit border-[#89898988]  800px:p-10 p-5'>
           <p className=' text-center font-Poppins 800px:text-[35px] text-[25px] font-extrabold dark:text-white text-fuchsia-800'>
               {data?.videos.length !== 0 ? data?.videos.length : 0}
           </p>
           <p className=' text-center font-Poppins 800px:text-[25px] text-[20px] font-extrabold dark:text-white text-green-700'>
            Total generation
           </p>
      </div>
      <div className=' my-[25px] relative'>
             <div className=' flex items-center '>
              <input type="text" name=""
               placeholder='Search videos..'
               value={searchTerm}
               onChange={handleSearchChange} 
               id="" className={`${style.input} dark:!bg-[#1f093d] !w-full`} />
              <button className='border border-[#8b8b8b8e] p-3 rounded-[5px] active:dark:bg-slate-900 active:bg-slate-200'
              onClick={() => setVusial(object)}
              ><Search /></button>
             </div>
             {
               select && searchData && searchData.length !== 0 && (
                <div className=' shadow absolute left-0 top-14 h-auto max-h-[300px] overflow-y-scroll w-full'>
                   {
                    searchData && searchData.map((data:any) => (
                      <div key={data._id} className=' dark:!bg-[#1f093d] border-b border-b-black dark:border-b-white p-2 bg-slate-200'>
                     <p onClick={() => handleSelect(data)} className=' cursor-pointer'>{data.prompt}</p>
                      </div>
                    ))
                   }
                </div>
               )
             }
         </div>
        </div>
        </div>
    </div>
  )
}

export const VideoComponent = ({video, index}:IVideoPrps) => {
  const [toggle, setToggle] = useState(false);
  const saveHandler = (videoId:string, url:string) => {
    setToggle(true);
      localStorage.setItem(videoId,url);
      toast.success("Item saved");
  }
  const removeHandler = (videoId:string) => {
    setToggle(false);
       localStorage.removeItem(videoId);
  }
  useEffect(() => {
    const item = localStorage.getItem(video?._id);
   if(item){
    setToggle(true)
   }else{
    setToggle(false)
   }
  },[ video])
  return(
    <div className=" w-full mt-7 " key={index}>
    <div className='flex justify-between px-3 items-center'>
    <p className=" pl-5 w-[90%] font-semibold text-[#ea3c76] dark:text-[#3faceb]">{video.prompt}</p>
    {
     toggle ? (
        <Heart fill='red' className=' w-[10%] cursor-pointer' onClick={() => removeHandler(video?._id)}/>
      ) : (
        <Heart className=' w-[10%] cursor-pointer' onClick={() => saveHandler(video?._id, video?.video?.url)}/>
      )
    }
    </div>
      <video controls  src={video?.video?.url} className=" w-full aspect-video mt-1 ">
        <source src={video?.video?.url} />
      </video>
    </div>
  )
}

export default VideoGalary