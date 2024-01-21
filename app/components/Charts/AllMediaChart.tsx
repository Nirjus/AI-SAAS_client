import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

type Props = {
    mediaAnalytics: any;
}

const AllMediaChart = ({mediaAnalytics}: Props) => {
    const item = mediaAnalytics && mediaAnalytics.map((i:any, index:number) => ({
        id: index,
        value: i.itemNumber,
        label: i.itemName
    }))
    const totalNumber:number = mediaAnalytics.map((i:any) => i.itemNumber).reduce((a:any,b: any) =>a+b,0);
        const [width, setWidth] = useState(500);
      
        useEffect(() => {
          const handleResize = () => {
            const newWidth = window.innerWidth;
            setWidth(newWidth < 800 ? 250 : 500);
          };
      
          window.addEventListener('resize', handleResize);
          handleResize();
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);

  return (
    <div className=' w-fit 800px:p-10 p-2 m-auto border border-[#88888885] rounded-[20px] '>
    <div className=' w-fit pb-5'>
    <h1 className=' 800px:text-[27px] text-[22px] font-extrabold text-black dark:text-white font-Poppins'>{totalNumber}+ Generation</h1>
    <p className=' text-center text-[16px] font-Poppins font-semibold text-[#8f8e8e] dark:text-[#656565]'> Updated AI powerd solution  </p>
    </div>
       <PieChart
  series={[
    {
      data: item,
      innerRadius: 50,
      outerRadius: 140,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 180,
      cx: 150,
      cy: 150,
    }
]}
slotProps={{
    legend:{
        hidden: true
    }
}}
height={300}
width={width}
/>
    </div>
  )
}

export default AllMediaChart