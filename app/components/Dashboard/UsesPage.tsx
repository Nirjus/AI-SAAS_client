"use client"
import React, { useEffect, useState } from 'react'
import { useGenerateCountQuery, useMothlyGenerationQuery } from '@/redux/features/analytics/nalytics';
import UserGenerationChart from "../../components/Charts/UserGenerationChart"
import User12monthGeneration from "../../components/Charts/User12monthGeneration"
import Loader from '../Loader';
type Props = {}

const UsesPage = ({}: Props) => {
  const {data, refetch, isLoading } = useGenerateCountQuery({}, {refetchOnMountOrArgChange:true});
  const {data:monthlyData, refetch:monthlyDataRefetch, isLoading:monthlyLoading} = useMothlyGenerationQuery({},{refetchOnMountOrArgChange:true});
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