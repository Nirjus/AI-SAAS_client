import {  Download, Eye, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import FileSaver from "file-saver";
import { useGetAllImagesQuery } from '@/redux/features/image/imageApi';
import toast from 'react-hot-toast';

type Props = {}
interface IImageProps {
    i: any;
    key: any;
    setVisible: any;
    setImgUr1: any;
    width: string;
  }
  
const ImageGalary = (props: Props) => {
 
  const [visible, setVisible] = useState(false);
  const [imgUri1, setImgUr1] = useState("");
  const [vusial, setVusial] = useState([]);
  const { data, refetch,error } = useGetAllImagesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    if (data) {
        refetch();
      setVusial(data?.images);
    }
  }, [data, refetch,error]);
  return (
    <div className=''>
        <div className=' 800px:pl-[30px]'>
        <h1 className=' text-[25px] font-Poppins font-bold text-black dark:text-white underline pb-2'>Best AI Generated Images</h1>
        <p className=' text-[16px] font-Poppins font-semibold text-black dark:text-white'> Generative AI Minjurney, Dall-E</p>
        </div>
        <div>
        <div className=" h-fit w-fit  800px:p-8 p-3 mt-5 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
        <div className=" flex gap-5 items-center">
          <p className=" py-4 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
            List of images you generated
          </p>
        </div>
          <div className=" w-full max-h-[400px] overflow-y-scroll ">
            {vusial &&
              vusial.map((img: any, index: number) => (
                <div className=" w-full mt-7 " key={index}>
                  <p className=" pl-5 font-semibold text-[#ea3c76] dark:text-[#3faceb]">
                    {img.prompt}
                  </p>
                  <div className=" flex gap-2">
                    {img.image.map((i: any) => (
                      <ImageComponent key={i._id} i={i} width={"w-[160px]"} setImgUr1={setImgUr1} setVisible={setVisible} />
                    ))}
                  </div>
                </div>
              ))}
              {
               vusial && vusial.length === 0 && (
                  <p className=' tracking-widest mt-5 font-semibold text-center'>No Images have till now</p>
                )
              }
          </div>

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
const ImageComponent = ({ i, key, setVisible, setImgUr1,width }: IImageProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleHover = () => {
      setIsHovered(true);
    };
  
    const handleLeave = () => {
      setIsHovered(false);
    };
    const handleDownload = async (_id:string,photo:string) => {
        FileSaver.saveAs(photo, `download-${_id}.jpg`);
    }
    return (
      <div
        key={key}
        className=" relative "
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <Image
          src={i.imageUrl}
          width={500}
          height={500}
          alt="imgName"
          className={`${width} h-auto object-cover rounded-[5px] cursor-pointer`}
        />
        {isHovered && (
          <div className=" absolute top-0 left-0 w-full h-full bg-transparent backdrop-blur-[1px]">
            <div className=" flex w-full h-full justify-center items-center gap-7">
              <button className=" rounded-full bg-[#ffffff99] p-1"
              onClick={() => handleDownload(i._id,i.imageUrl)}
              >
                <Download size={17} color="black" />
              </button>
              <button
                className="rounded-full bg-[#ffffff99] p-1"
                onClick={() => {
                  setVisible(true), setImgUr1(i.imageUrl);
                }}
              >
                <Eye size={17} color="black" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
export default ImageGalary