import { useGetAllmusicQuery } from '@/redux/features/music/musicApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {}

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
        <div className=" 1000px:w-[70%] m-auto h-fit sticky mt-10 800px:p-8 p-3 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
          <div className=" flex gap-5 items-center">
            <p className=" pl-2 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
              List of music you generated
            </p>
          </div>

            <div className=" w-full ">
              {audio &&
                audio.map((audio: any, index: number) => (
                <div className=" w-full mt-[50px] " key={index}>
                <p className=" pl-5 font-semibold text-[#ea3c76] dark:text-[#3faceb]">{audio.prompt}</p>
                  <audio controls className=" w-full mt-1 ">
                    <source src={audio.music} />
                  </audio>
                </div>
                ))}
                {
                 audio && audio.length === 0 && (
                    <p className=' tracking-widest mt-5 font-semibold text-center'>No Audio have till now</p>
                  )
                }
            </div>
        
        </div>
    </div>
  )
}

export default AudioGalary