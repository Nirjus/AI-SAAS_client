"use client"
import React, { useEffect, useState } from 'react'
import UserGenerationChart from "../../components/Charts/UserGenerationChart"
import User12monthGeneration from "../../components/Charts/User12monthGeneration"
import Loader from '../Loader';
type Props = {
  data: any;
  refetch: any;
  isLoading: any;
  monthlyDataRefetch:any
  monthlyData: any;
  monthlyLoading: any;
}

const UsesPage = ({data, monthlyData, isLoading, monthlyDataRefetch, refetch, monthlyLoading}: Props) => {
  
  const [items, setItems] = useState([]);
  const [monthlyGeneration, setMonthlyGeneration] = useState([]);
  useEffect(() => {
    if(items){
      setItems(data?.items)
      refetch();
    }
    if(monthlyData){
      setMonthlyGeneration(monthlyData?.datas?.last12MonthsUserData);
      monthlyDataRefetch();
    }
   },[items, monthlyGeneration, refetch, monthlyDataRefetch, data, monthlyData])


  return (
   <>
   {
    isLoading && monthlyLoading ? (
      <div className=' w-full h-[20vh] flex justify-center items-center'>
        <Loader />
      </div>
    ) : (
      <div>
      {
       items && items.length !== 0 && (
         <UserGenerationChart items={items}  />
       )
      }
      {
       monthlyGeneration && monthlyGeneration.length !== 0 && (
         <User12monthGeneration monthlyGeneration={monthlyGeneration} />
       )
      }
       </div>
    )
   }
   </>
  )
}

export default UsesPage