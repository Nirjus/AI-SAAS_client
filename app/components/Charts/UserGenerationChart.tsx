import React from 'react'
import { PieChart,pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { DefaultizedPieValueType } from '@mui/x-charts';

type Props = {
    items: any;
}

const UserGenerationChart = ({items}: Props) => {
    let totalNumber:number = items.map((i:any) => i.itemNumber).reduce((a:any,b:any) => a+b,0);
    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = totalNumber !== 0 ? (params.value / totalNumber) : 0;
        return `${(percent * 100).toFixed(0)}%`;
      };
      const item = items && items.map((i:any, index:number) => ({
        id: index,
        value: i.itemNumber,
        label: i.itemName
      }))
  return (
    <div className=' py-5 rounded-lg lx:px-[100px] md:px-[60px] sm:px-[40px] px-[20px] shadow-md dark:shadow-[#2f2f2f] '>
      <div className=' w-fit'>
      <h1 className=' 800px:text-[25px] text-[20px] font-extrabold text-black dark:text-white font-Poppins'>Total Generation: {totalNumber}</h1>
      <p className=' text-center 800px:text-[18px] text-[16px] font-Poppins font-semibold text-[#8f8e8e] dark:text-[#656565]'> All media count </p>
      </div>
       <PieChart
      series={[
        {
          data:item,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          arcLabel: getArcLabel
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "MenuText",
          fontSize: 14,
        },
      }}
      slotProps={{
        legend:{
          labelStyle:{
             fill: "ThreeDHighlight"
          }
        }
      }}
      height={300}
    />
     </div>
  )
}

export default UserGenerationChart