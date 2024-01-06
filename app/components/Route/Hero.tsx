"use client"
import React,{useEffect, useState} from 'react'
import {BiSearch} from "react-icons/bi";
import Link from 'next/link';
import Image from "next/image";
import MarQuee from "react-fast-marquee";
import line from "../../../public/images/line.png";
import TypewriterComponent from 'typewriter-effect';
 import img1 from "../../../public/images/upperBannerImg1.webp"
 import img2 from "../../../public/images/upperBannerImg2.webp"
 import img3 from "../../../public/images/upperBannerImg3.webp"
 import img4 from "../../../public/images/upperBannerImg4.webp"
 import img5 from "../../../public/images/upperBannerImg5.webp"
 import image1 from "../../../public/images/lowerBannerImg1.webp";
 import image2 from "../../../public/images/lowerBannerImg2.webp";
 import image3 from "../../../public/images/lowerBannerImg3.webp";
 import image4 from "../../../public/images/lowerBannerImg4.webp";
 import image5 from "../../../public/images/lowerBannerImg5.webp";
type Props = {}
const rowOneImages = [
  {
    url: img1,
  },
  {
    url: img2,
  },
  {
    url: img3,
  },
  {
    url: img4,
  },
  {
    url: img5,
  },
];
const rowTwoImages = [
  {
    url: image1,
  },
  {
    url: image2,
  },
  {
    url: image3,
  },
  {
    url: image4,
  },
  {
    url: image5,
  },
];
const Hero = (props: Props) => {
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setmounted(true);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }
  return (
    <div className="w-full pt-[80px] md:min-h-screen flex items-center justify-center">
    <div>
      <h1 className=" font-Poppins text-4xl py-5 xl:text-7xl 2xl:text-8xl font-[700] text-center xl:leading-[80px] 2xl:leading-[100px] sm:mt-20">
      Make your Imagination 
       <br />
       for
       <br />
       <div className=' text-transparent bg-clip-text bg-gradient-to-r from-[#9819fa] to-pink-600'>
        <TypewriterComponent 
        options={{
          strings: [
            "Chatbot.",
            "Image Generation",
            "Music Generation",
            "Code Generation",
            "Video Generation"
          ],
          autoStart: true,
          loop: true
        }}
        />
       </div>
      </h1>
        <div className=' flex my-[20px] flex-col items-center justify-center'>
         <Link href={"/dashboard"}>
         <button className=' p-3 rounded-[8px] active:scale-90 duration-300 transition-all bg-[#7e37f9] hover:bg-[#ff4a93] text-white font-Poppins font-semibold'>
            Start Generation for free
          </button>
         </Link>
         <p className=' pt-5 text-gray-700 font-semibold dark:font-thin dark:text-gray-400'>No credit card required</p>
        </div>
      <div className="md:mt-5">
        <Image
          src={line}
          alt="line"
          className=" w-full absolute hidden md:block"
          width={1000}
          height={1000}
        />
      </div>
      <div className="  w-[100vw] relative mb-5 md:mb-20 ">
        <div className="rotate-[-4deg] mt-10 md:mt-[6.5rem]">
          <MarQuee>
            {rowOneImages.map((i, index) => (
              <Image
                src={i.url}
                key={index}
                alt="prpmy"
                className="md:m-4 w-[200px] h-[130px] m-2 md:h-[380px] object-cover md:w-[500px] rounded-[20px]"
                width={500}
                height={300}
              />
            ))}
          </MarQuee>
          <MarQuee>
            {rowTwoImages.map((i, index) => (
              <Image
                src={i.url}
                key={index}
                alt="huynt"
                className="md:m-4 w-[200px] h-[130px] m-2 md:h-[380px] object-cover md:w-[500px] rounded-[20px]"
                width={500}
                height={300}
              />
            ))}
          </MarQuee>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hero