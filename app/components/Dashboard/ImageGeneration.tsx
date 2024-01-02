import { style } from "@/app/styles/style";
import DashboardHeading from "@/app/utils/DashboardHeading";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  ImageIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useGetAllImagesQuery,
  useImageGenerationMutation,
} from "@/redux/features/image/imageApi";
import { getRandomPrompts } from "@/app/utils/Prompts/randomPrompts";
import FileSaver from "file-saver";

type Props = {
  setOpen: any;
  setRoute: any;
};
interface IImageProps {
  i: any;
  key: any;
  setVisible: any;
  setImgUr1: any;
  width: string;
}

const ImageGeneration = ({ setOpen, setRoute }: Props) => {
  const [image, setImage] = useState("");
  const [num, setNum] = useState<number>();
  const [vusial, setVusial] = useState([]);
  const [visible, setVisible] = useState(false);
  const [imgUri1, setImgUr1] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [imageGeneration, { isLoading, error, isSuccess, data: imageData }] =
    useImageGenerationMutation();
  const { data, refetch } = useGetAllImagesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { user } = useSelector((state: any) => state.auth);
 
  const numArray = [1, 2, 3, 4];
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) {
      setOpen(true);
      setRoute("Login");
    } else {
      await imageGeneration({
        prompt: image,
        num: num,
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    if (data) {
      setVusial(data?.images);
    }
  }, [data, isSuccess, error, refetch]);
   const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(image);
     setImage(randomPrompt);
   }

  return (
    <div>
      <DashboardHeading
        title="Image Generation"
        description="convert your prompt to Images."
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
        textColor="text-pink-500/90"
      />
      <div className="px-4 lg:px-8">
        <form action="" onSubmit={handleSubmit} className=" w-full  rounded-lg">
          <div className=" w-full flex flex-col justify-between lg:gap-10 md:gap-6">
            <textarea
              name="prompt"
              cols={30}
              rows={1}
              placeholder="Impressionist oil painting of a cute robot.."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={` ${style.input} dark:!bg-[#2f0936] !w-full h-fit`}
            ></textarea>
            <div className=" w-full flex 600px:flex-row flex-col justify-between items-center">
              <select
                name=""
                id=""
                className={`${style.input} dark:!bg-[#2f0936] 800px:mt-0 mt-[30px]`}
                value={num}
                onChange={(e) => setNum(Number(e.target.value))}
              >
                <option value="">Select Number of Images</option>
                {numArray.map((nums: number) => (
                  <option value={nums} key={nums}>
                    {nums}
                  </option>
                ))}
              </select>
              <div className=" 800px:mt-0 mt-[30px]">
                <button onClick={() => handleSurpriseMe() } type="button"
                className={`active:scale-90 duration-300 text-white p-2 w-full  rounded ${
                  isLoading ? " bg-gray-600" : "bg-[#985ad5]"
                } `}
                >
                  Get Prompt
                </button>
              </div>
              <div className=" 800px:mt-0 mt-[30px]">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`active:scale-90 duration-300 text-white p-2 w-full  rounded ${
                    isLoading ? " bg-gray-600" : "bg-[#771bd3]"
                  } `}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className=" space-y-4 mt-5">
        {isLoading && (
          <div className=" w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        )}
        {!image && !isLoading && (
          <div className=" w-full flex flex-col justify-center items-center">
            <Image
              src={require("../../../public/images/photoIcon2.png")}
              alt="Girl standing"
              width={500}
              height={500}
              className=" w-[300px] h-[300px] rotate-[30deg] object-contain"
            />
            <p className=" dark:text-white text-black tracking-widest font-semibold ">
              No image generating
            </p>
          </div>
        )}

        <div className=" flex gap-4 flex-wrap">
          {imageData &&
            imageData?.output?.map((img: any, index: number) => (
              <ImageComponent i={img} width={"w-[300px]"} key={index} setImgUr1={setImgUr1} setVisible={setVisible} />
            ))}
        </div>
      </div>
      <div className=" h-fit w-fit mt-4 800px:p-8 p-3 rounded-[30px] bg-[#cacaca47] dark:bg-[#0000005e] ">
        <div className=" flex gap-5 items-center">
          <p className=" pl-2 800px:text-[21px] text-[18px] font-Poppins font-semibold text-black dark:text-white">
            List of images you generated
          </p>
          {drawer ? (
            <ChevronDown
              size={25}
              className=" cursor-pointer"
              onClick={() => setDrawer(false)}
            />
          ) : (
            <ChevronUp
              size={25}
              className=" cursor-pointer"
              onClick={() => setDrawer(true)}
            />
          )}
        </div>
        {drawer && (
          <div className=" w-full max-h-[400px] overflow-y-scroll ">
            {vusial &&
              vusial.map((img: any, index: number) => (
                <div className=" w-full mt-7 " key={index}>
                  <p className=" pl-5 font-semibold text-[#ea3c76] dark:text-[#3faceb]">
                    {img.prompt}
                  </p>
                  <div className=" flex gap-2">
                    {img.image.map((i: any) => (
                      <ImageComponent key={i._id} i={i} width={"w-[150px]"} setImgUr1={setImgUr1} setVisible={setVisible} />
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
        )}
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
  );
};
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

export default ImageGeneration;
