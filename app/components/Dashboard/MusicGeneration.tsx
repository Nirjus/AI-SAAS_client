import React, { useEffect, useState } from "react";
import DashboardHeading from "@/app/utils/DashboardHeading";
import { style } from "@/app/styles/style";
import { ChevronDown, ChevronUp, Music4, Sparkles } from "lucide-react";
import Loader from "../Loader";
import {
  useCreateMusicMutation,
  useGetAllmusicQuery,
} from "@/redux/features/music/musicApi";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getRandomAudioPrompts } from "@/app/utils/Prompts/randomPrompts";
import { useGetCreditCountQuery } from "@/redux/features/user/userApi";
import { maxCreditCount } from "@/app/utils/constants";

type Props = {
  setOpen: any;
  setRoute: any;
  refetchCredit: any;
};

const MusicGeneration = ({ setOpen, setRoute,refetchCredit }: Props) => {
  const [music, setMusic] = useState("");
  const [duration, setDuration] = useState<number>();
  const [format, setFormat] = useState("wav");
  const [createMusic, { isLoading, data: musicData, isSuccess, error }] =
    useCreateMusicMutation();
    const formats = ["wav","mp3"];
  const {data: creditData} = useGetCreditCountQuery({});
  const {
    refetch,
  } = useGetAllmusicQuery({}, { refetchOnMountOrArgChange: true });
  const { user } = useSelector((state: any) => state.auth);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      setOpen(true);
      setRoute("Login");
    } else {
      await createMusic({
        prompt:music,
        duration: duration,
        format: format
      });
    }
  };
console.log(musicData?.output.url)
  useEffect(() => {
    if (isSuccess) {
      refetch();
      refetchCredit();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    if(creditData?.credit === maxCreditCount){
      setOpen(true);
      setRoute("pro-modal");
    }
  }, [error, isSuccess, refetch, refetchCredit, creditData, setOpen, setRoute]);
   const hasndlePrompt = () => {
    const randomPromts = getRandomAudioPrompts(music);
    setMusic(randomPromts);
   }
  return (
    <div>
      <DashboardHeading
        title="Music Generation"
        description="convert your text into music."
        icon={Music4}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
        textColor="text-emerald-500/80"
      />
      <div className="px-4 lg:px-8">
        <form action="" onSubmit={handleSubmit} className=" w-full  rounded-lg">
          <div className=" w-full ">
            <div className=" flex">
            <textarea
              name="prompt"
              cols={30}
              rows={1}
              placeholder="Pappa jane jana piano.."
              value={music}
              onChange={(e) => setMusic(e.target.value)}
              className={` ${style.input} !rounded-r-none dark:!bg-[#2f0936] !w-full h-fit`}
            ></textarea>
            <div className=" cursor-pointer bg-gray-200 p-3 rounded-r-[5px] text-[14px] dark:bg-[#2f0936] text-center"
            onClick={() => hasndlePrompt()}
            >
              <Sparkles />
            </div>
            </div>

            <div className=" 800px:flex justify-between mt-[20px] items-center">
              <div className=" flex flex-col">
                <label htmlFor="duration">Set Duration</label>
                <input type="number" name="" id="duration"
                placeholder="in seconds..30 45 60"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className={`${style.input} !w-full dark:!bg-[#2f0936]`}
                />
              </div>
             <div className=" flex flex-col">
             <label htmlFor="format">Set Format</label>
              <select name="" id="" value={format} onChange={(e) => setFormat(e.target.value)}
              className={`${style.input} dark:!bg-[#2f0936] !w-full min-w-[100px]`}
              >
                {
                  formats.map((i:string,index: number)=> (
                    <option value={i} key={index}>{i}</option>
                  ))
                }
              </select>
             </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`active:scale-90 duration-300 text-white p-2 min-w-[120px] mt-2 rounded ${
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
        <div className={`${!musicData && "min-h-[300px]"}`}>
        {!music && !isLoading && (
          <div className=" w-full  flex flex-col justify-center items-center">
            <Image
              src={require("../../../public/images/3d headphone.png")}
              alt="Girl standing"
              width={500}
              height={500}
              className=" w-[200px] h-[200px] object-contain"
            />
            <p className=" dark:text-white text-black tracking-widest font-semibold ">
              No music generating
            </p>
          </div>
        )}
        </div>
        {musicData && (
          <audio controls className=" w-full mt-10 800px:px-9 px-5">
            <source src={musicData?.output.url} />
          </audio>
        )}
      </div>
        </div>
    </div>
  );
};

export default MusicGeneration;
