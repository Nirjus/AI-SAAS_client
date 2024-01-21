import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

type Props = {
    monthlyGeneration: any
}

const User12monthGeneration = ({monthlyGeneration}: Props) => {
    function calculateTotalGeneration(data:any) {
        return data.reduce((total:any, entry:any) => {
          total += entry.musicGeneration + entry.videoGeneration + entry.imageGeneration + entry.codeGeneration + entry.chatGeneration;
          return total;
        }, 0);
      }
      
      const monthAvg = calculateTotalGeneration(monthlyGeneration);
        const avg = monthAvg/12
     
      const valueFormatter = (value: number) => `${value}`;
      const highlightScope = {
        highlighted: 'series',
        faded: 'global',
      } as const;
  return (
    <div className=' py-5 mt-10 rounded-lg lx:px-[100px] md:px-[60px] sm:px-[40px] px-[20px] shadow-md dark:shadow-[#2f2f2f] '>
    <div className=' w-fit'>
    <h1 className=' 800px:text-[25px] text-[20px] font-extrabold text-black dark:text-white font-Poppins'>Mothly Generation </h1>
    <p className=' text-center 800px:text-[18px] text-[16px] font-Poppins font-semibold text-[#8f8e8e] dark:text-[#636262]'>12 month duration {avg.toFixed(2)} (avg) </p>
    </div>
     <BarChart
     sx={{
      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
        strokeWidth:0.7,
        stroke:"ThreeDHighlight"
       },
       "& .MuiChartsAxis-left .MuiChartsAxis-label":{
        
      stroke: "ThreeDHighlight"
       },
        // change bottom label styles
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
            strokeWidth:0.7,
            stroke:"ThreeDHighlight"
         },
          // bottomAxis Line Styles
         "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
          stroke:"ThreeDHighlight",
          strokeWidth:0.7
         },
         // leftAxis Line Styles
         "& .MuiChartsAxis-left .MuiChartsAxis-line":{
          stroke:"ThreeDHighlight",
          strokeWidth:0.7
         }
     }}
    yAxis={[
      {
        label: "Generations (Count)"
      }
    ]}
    dataset={monthlyGeneration}
    xAxis={[{ scaleType: 'band', dataKey: 'month'}]}
    series={[
      { dataKey: 'musicGeneration', label: 'Music Generation', valueFormatter },
      { dataKey: 'videoGeneration', label: 'Video Generation', valueFormatter },
      { dataKey: 'imageGeneration', label: 'Image Genearion', valueFormatter },
      { dataKey: 'codeGeneration', label: 'Code Generation', valueFormatter },
      {dataKey: "chatGeneration", label: "Chat Generation", valueFormatter}
    ].map((s) => ({ ...s, highlightScope }))}
    slotProps={{
      legend:{
        labelStyle:{
          fill: "ThreeDHighlight"
        }
      }
    }}
      height={350}
     />
   </div>
  )
}

export default User12monthGeneration