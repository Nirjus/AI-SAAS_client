import { useGetAllmusicQuery } from '@/redux/features/music/musicApi';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}
interface ImusicProps{
  audio:any;
  index: number;
}
const AudioGalary = (props: Props) => {
  const [audio, setAudio] = useState([]);

  const {
    data,
    refetch,
    error: musicError,
  } = useGetAllmusicQuery({}, { refetchOnMountOrArgChange: true });
 
  useEffect(() => {

    if (musicError) {
      if ("data" in musicError) {
        const errorData = musicError as any;
        toast.error(errorData.data.message);
      }
    }
    if (data) {
        refetch();
      setAudio(data.audios);
    }
  }, [  refetch, musicError, data]);
  
  return (
    <div className=' w-full'>
         <div className=' 800px:pl-[30px]'>
        <h1 className=' text-[25px] font-Poppins font-bold text-black dark:text-white underline pb-2'>Best AI Generated Audios</h1>
        <p className=' text-[16px] font-Poppins font-semibold text-black dark:text-white'> Generative AI Audio</p>
        </div>
        <div className=' 800px:flex justify-between'>
        <div className=" 1000px:w-[70%] m-auto h-fit sticky mt-10 800px:p-8 p-3 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
            <p className=" pl-2 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
              List of music you generated
            </p>
            <div className=" w-full  max-h-[75vh] overflow-y-scroll ">
              {audio &&
                audio.map((audio: any, index: number) => (
              <MusicComponent audio={audio} index={index} key={index} />
                ))}
                {
                 audio && audio.length === 0 && (
                    <p className=' tracking-widest mt-5 font-semibold text-center'>No Audio have till now</p>
                  )
                }
            </div>
        </div>
        <div className=' mt-10 border-2 w-fit h-fit border-[#89898988] rounded-[px] 800px:p-10 p-5'>
           <p className=' text-center font-Poppins 800px:text-[35px] text-[25px] font-extrabold dark:text-white text-fuchsia-800'>
               {audio.length !== 0 ? audio.length : 0}
           </p>
           <p className=' text-center font-Poppins 800px:text-[25px] text-[20px] font-extrabold dark:text-white text-green-700'>
            Total generation
           </p>
      </div>
        </div>
    </div>
  )
}

export const MusicComponent = ({audio,index}:ImusicProps) => {
  const [toggle, setToggle] = useState(false);
  const saveHandler = (audioId:string, url: string) => {
    setToggle(true);
      localStorage.setItem(audioId,url);
      toast.success("Item saved");
  }
  const removeHandler = (audioId:string) => {
    setToggle(false);
       localStorage.removeItem(audioId);
  }
  useEffect(() => {
    const item = localStorage.getItem(audio?._id);
   if(item){
    setToggle(true)
   }else{
    setToggle(false)
   }
  },[ audio])
  return(
    <div className=" w-full mt-[50px] " key={index}>
    <div className=' flex justify-between px-3 items-center'>
    <p className=" pl-5 w-[90%] font-semibold text-[#ea3c76] dark:text-[#3faceb]">{audio.prompt}</p>
    {
     toggle ? (
        <Heart fill='red' className=' w-[10%] cursor-pointer' onClick={() => removeHandler(audio?._id)}/>
      ) : (
        <Heart className=' w-[10%] cursor-pointer' onClick={() => saveHandler(audio?._id, audio?.music?.url)}/>
      )
    }
    </div>
      <audio controls className=" w-full mt-1 ">
        <source src={audio?.music?.url} />
      </audio>
    </div>
  )
}

export default AudioGalary