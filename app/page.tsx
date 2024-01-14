"use client";
import React, { FC, useState } from "react";
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
