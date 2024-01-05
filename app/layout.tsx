"use client"
import './globals.css'
import { ThemeProvider } from 'next-themes'
import  {Poppins} from "next/font/google"
import { Josefin_Sans } from 'next/font/google'
import React, { FC } from 'react';
import Providers from './Provider'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import CrispProvider from './components/CrispChat'

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
      <CrispProvider />
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-[#1b0827f3] dark:to-[#000000] duration-300`}>
          <Providers>
            <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
           </ThemeProvider>
           <Toaster />
       </SessionProvider> 
        </Providers>
        </body>
    </html>
  )
}

