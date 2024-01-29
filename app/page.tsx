"use client";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Feateare from "./components/Route/Feateare"
import Footer from "./components/footer/footer";
import Statistics from "./components/Route/Statistics"
type Props = {};

const Page: FC<Props> = ({}) => {
  const [activeItem, setActiveItem] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const url = process.env.NEXT_PUBLIC_SOCKET_URI;

  async function activeSocketServer() {
       await axios.get(`${url}`)
  }
    useEffect(() => {
      activeSocketServer();
    })
  return (
    <div>
      <Heading
        title="AI Studio"
        description="All AI tools with best experience"
        keyword="ChatGPT, midjurney, AI Studio"
      />
      <Header
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />
    <div className="banner">
    <Hero />
    </div>
     <br />
     <br />
     <Feateare />
     <br />
     <br />
     <br />
     <Statistics />
     <br />
     <Footer />
    </div>
  );
};

export default Page;
