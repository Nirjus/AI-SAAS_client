"use client"
import React from 'react'
import AdminProtected from '../hooks/adminProtected'
import Heading from '../utils/Heading'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import AdminPannel from '../components/Admin/AdminPannel'
type Props = {}

const Page = (props: Props) => {
    const {user} = useSelector((state: any) => state.auth);
  return (
    <div className=' '>
        <AdminProtected>
           <Heading title='AI-Studio - ADMIN' description='Best AI programmend source for ALL' keyword='ChatGPT Mingurney DALEE' />
          {
            user ? (
               <AdminPannel user={user} />
            ) : (
                <div className=' w-full h-screen flex justify-center items-center'>
                <Loader />
            </div>
            )
          }
        </AdminProtected>
    </div>
  )
}

export default Page