"use client"
import './globals.css'
import { ThemeProvider } from 'next-themes'
import  {Poppins} from "next/font/google"
import { Josefin_Sans } from 'next/font/google'
import React, { useEffect, useMemo } from 'react';
import {io} from "socket.io-client";
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { Providers } from './Provider'
import { useDispatch, useSelector } from 'react-redux'

const poppins = Poppins({
  subsets:["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
})

const josefin = Josefin_Sans({
  subsets:["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-[#1b0827f3] dark:to-[#000000] duration-300`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <SessionProvider>
             <Custom>
              {children}
             </Custom>
           <Toaster />
       </SessionProvider> 
        </Providers>
        </ThemeProvider>
        </body>
    </html>
  )
}

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
  const dispatch = useDispatch();
 const url = process.env.NEXT_PUBLIC_SOCKET_URI!;
 const {user} = useSelector((state:any) => state.auth);
 const socket = useMemo(() => io(url),[url]);
  
  useEffect(() => {
    if(user){
      dispatch({
        type: "SET_SOCKET",
        socket
      })
    }
    socket.on("receive-message", (data) => {
      dispatch({
        type: "ADD_MESSAGES",
        message: data.message
      })
    })
  },[user, dispatch, socket ])
 
  return (
     <>
     {children}
     </>
  )
}