import { useGetAllmusicQuery } from '@/redux/features/music/musicApi'
import React, { useEffect, useState } from 'react'
import { MusicComponent } from '../media/AudioGalary';
import { ImageComponent } from '../media/ImageGalary';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useGetAllVideoQuery } from '@/redux/features/video/videoApi';
import { VideoComponent } from '../media/VideoGalary';

type Props = {}

const SaveItems = (props: Props) => {
  const {data:musicData, isLoading} = useGetAllmusicQuery({});
  const [visible, setVisible] = useState(false);
  const [imgUri1, setImgUr1] = useState("");
  const {data:videoData} = useGetAllVideoQuery({});
  const [media, setMedia] = useState("Images");
  const [musicArray, setMusicArray] = useState([]);
  const [videoArray, setVideoArray] = useState([]);
  const handleSelectChange = (e:any) => {
    setMedia(e.target.value);
 }
 const itemsWithGivenValue = [];
  for (let i = 0; i < localStorage.length; i++) {
    const url:any = localStorage.key(i);
    const storedValue = localStorage.getItem(url);
    if (storedValue === "images") {
      const randomId = Math.floor(Math.random() * 100000);
      const itemObject = {url, _id:randomId}
      itemsWithGivenValue.push(itemObject);
    }
  }
  
  useEffect(() => {
    if(musicData){
   setMusicArray(musicData?.audios.filter((audio:any) => (localStorage.getItem(audio?._id))))
    }
    if(videoData){
      setVideoArray(videoData?.videos.filter((video:any) => (localStorage.getItem(video?._id))))
       }
  
  },[musicData, videoData])

  return (
    <div>
      <div className="">
        <h1 className=' 800px:text-[25px] text-[20px] text-center font-Poppins'>Your save Items are here</h1>
        <div className=" 800px:w-[90%] w-full m-auto p-4">
          <div>
            <select name="" id="" className=' p-2 rounded' value={media} onChange={handleSelectChange} >
              <option value="Music">Music</option>
              <option value="Images">Images</option>
              <option value="Videos">Videos</option>
            </select>
          </div>
   {
    media === "Music" && (
      <div className=' 800px:w-[90%] w-full max-h-[400px] overflow-y-scroll '>
      {
        musicArray && musicArray.map((music:any, index:number) => (
      <MusicComponent audio={music} index={index} key={index} />
         ))
       }
       {
        musicArray && musicArray.length === 0 && (
          <p className=' text-black dark:text-white text-center font-Poppins font-bold'>No Music saved</p>
        )
       }
      </div>
    )
   }
    {
    media === "Videos" && (
      <div className=' 800px:w-[70%] w-full max-h-[400px] overflow-y-scroll '>
      {
        videoArray && videoArray.map((video:any, index:number) => (
         <VideoComponent video={video} index={index} key={index} />
         ))
       }
       {
        videoArray && videoArray.length === 0 && (
          <p className=' text-black dark:text-white text-center font-Poppins font-bold'>No Video saved</p>
        )
       }
      </div>
    )
   }
   {
      media === "Images" && (
        <div className=' 800px:w-[90%] w-full max-h-[400px] overflow-y-scroll '>
      <div className=' flex mt-[20px] flex-wrap gap-2 max-h-[55vh] overflow-y-scroll'>
      {
          itemsWithGivenValue && itemsWithGivenValue.map((image:any, index:number) => (
        <ImageComponent width={"w-[180px]"} key={index} i={image} setVisible={setVisible} setImgUr1={setImgUr1} />
           ))
         }
      </div>
        {
          itemsWithGivenValue && itemsWithGivenValue.length === 0 && (
            <p className=' text-black dark:text-white text-center font-Poppins font-bold'>No Image saved</p>
          )
        }
        </div>
      )
   }
        </div>
      </div>
      {visible && (
        <div className="  w-full z-[9999] h-screen fixed top-0 left-0 backdrop-blur-[2px] bg-[#12121221]">
          <div className=" w-[40%] h-auto bg-transparent fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <div className=" flex justify-end">
              <X
                size={25}
                onClick={() => setVisible(false)}
                className=" cursor-pointer text-black dark:text-white"
              />
            </div>
            <Image
              src={imgUri1}
              alt="images"
              width={500}
              height={500}
              className=" w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SaveItems