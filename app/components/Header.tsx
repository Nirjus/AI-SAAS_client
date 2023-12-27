import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";

type Props = {
  setActiveItem?: any;
  activeItem: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
};

const Header = ({ activeItem, setActiveItem,open, setOpen, route, setRoute }: Props) => {
  const [active, setActive] = useState(false);
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
    if (window.scrollY >= 85) {
      setActive(true);
    } else {
      setActive(false);
    }
  }
    )
  }
  return (
    <div className="w-full relative">
      <div
        className={`${
          active ? "fixed top-0 left-0 shadow-xl" : " dark:shadow"
        } w-full z-[80] h-[80px] border-b-2 border-b-[#86868678] backdrop-blur dark:bg-[#16161f98] bg-[#e8e6e695] transition-all duration-500`}
      >
        <div className=" flex w-full h-full flex-row items-center justify-between ">
          <div className="  mx-3 text-black dark:text-white bg-gradient-to-r from-[#5c5b5b7a] dark:to-[#6c6c6c19] to-[#6c6c6c10] px-2 text-center p-1 rounded cursor-pointer">
            <Link
              href={"/"}
              className=" text-[30px] hover:text-[#0ec430] dark:hover:text-[#ce1bf2] font-[600] font-Josefin"
            >
              <div className=" flex gap-2"><Image src={require("../../public/images/logo.png")} alt="Logo" width={500} height={500} className=" w-10 h-10"  /> Studio </div>
            </Link>
          </div>
          <div className=" flex flex-row items-center">
            <Navbar
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              open={open}
              setOpen={setOpen}
              route={route}
              setRoute={setRoute}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
