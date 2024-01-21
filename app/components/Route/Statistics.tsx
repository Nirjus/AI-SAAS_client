"use client"
import React, { useEffect, useState } from 'react'
import { useMediaAnalyticQuery, useUserAnalyticQuery } from '@/redux/features/analytics/nalytics'
import ChartsCompo from "../../components/Charts/ChartsCompo"
import AllMediaChart from "../../components/Charts/AllMediaChart"
import Loader from '../Loader'
type Props = {
  
}

const Statistics = (props: Props) => {
  const [userAnalizer, setUserAnalyzer] = useState([]);
  const [mediaAnalytics, setMediaAnalytics] = useState([]);
  const {data, isLoading} = useUserAnalyticQuery({});
  const {data: mediaData, isLoading:allMeadiaLoading} = useMediaAnalyticQuery({});
      
  useEffect(() => {
   if(data){
    setUserAnalyzer(data?.users.last12Months)
   }
   if(mediaData){
     setMediaAnalytics(mediaData?.items)
   }
  },[data, mediaData])

  return (
  <>
  {
    isLoading && allMeadiaLoading ? (
      <div className=' w-full h-fit py-10 flex justify-center items-center'>
        <Loader />
      </div>
    ) : (
      <div className=' 800px:p-7 1000px:flex block '>
      {
        userAnalizer && userAnalizer.length !== 0 && (
          <ChartsCompo userAnalytics={userAnalizer} />
        )
      }
      {
        mediaAnalytics && mediaAnalytics.length !== 0 && (
        <AllMediaChart mediaAnalytics={mediaAnalytics} />
        )
      }
     
    </div>
    )
  }
  </>
  )
}

export default Statistics