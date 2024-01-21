"use client";
import React, { useEffect, useState } from "react";
import { maxCreditCount } from "./constants";
import { Zap } from "lucide-react";

type Props = {
  credit: number;
  openSideBar: boolean;
  setOpen: any;
  setRoute: any;
  isPro: boolean;
};

const CreditCounter = ({ credit = 0, isPro,openSideBar, setOpen, setRoute }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if(isPro){
    return null;
  }
  const upgradeHandler = () => {
     setOpen(true);
     setRoute("pro-modal");
  }
  return (
    <div className=" px-[2px]">
      <div className=" dark:bg-white/10 bg-[#efefef] rounded-[5px]">
        <div className=" py-6">
          <div
            className={`text-center text-sm mb-4 ${
              openSideBar && "1200px:px-6 800px:px-3"
            } px-2 space-y-2`}
          >
            <p className=" space-x-2">
              <span className=" p-[3px] w-10 h-10 rounded-full border">
                {credit}/{maxCreditCount}{" "}
              </span>
              <span
                className={`${openSideBar ? "textComingAnimation" : "hidden"}`}
              >
                {" "}
                Free Generation
              </span>
            </p>
            {openSideBar && (
              <div
                className={`w-full bg-gray-300 rounded-full h-3.5 mb-4 dark:bg-gray-700`}
              >
                <div
                  className="  bg-gray-600 h-3.5 rounded-full dark:bg-gray-300 "
                  style={{ width: `${(credit / maxCreditCount) * 100}%` }}
                ></div>
              </div>
            )}
          </div>
          <div
            className={` px-2 ${
              openSideBar
                ? "1200px:px-6 800px:px-3 textComingAnimation"
                : "hidden"
            }`}
          >
            <button className="  flex gap-2 justify-center items-center w-full bg-gradient-to-r from-[#7f24ee] to-[#f91075] text-white p-3 rounded active:scale-90 duration-200 transition-all"
            onClick={upgradeHandler}
            >
              <p>Upgrade</p> <Zap fill={"white"} size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCounter;
