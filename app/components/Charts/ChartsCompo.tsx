
import React, { useEffect, useState } from 'react'
import { ChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
type Props = {
    userAnalytics: any
}

const ChartsCompo = ({userAnalytics}: Props) => {
   
   const pData = userAnalytics && userAnalytics.map((i:any) => i.count)
  
   const xLabels = userAnalytics && userAnalytics.map((i:any) => i.month)
  const totalUser:number = userAnalytics && userAnalytics.map((i:any) => i.count).reduce((a:any, b:any) => a+b,0);
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
    <div className=' w-fit m-auto border border-[#83838387] 800px:p-10 p-2 rounded-[20px]'>
    <div className=' w-fit'>
    <h1 className=' 800px:text-[27px] text-[22px] font-extrabold text-black dark:text-white font-Poppins'>Numbers of active users</h1>
    <p className=' text-[16px] font-Poppins font-semibold text-[#8f8e8e] dark:text-[#656565]'> Daily {totalUser}+ active users </p>
    </div>
   <ChartContainer
      width={width}
      height={300}
      series={[{ type: 'line', data: pData }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root': {
          stroke: '#8884d8',
          strokeWidth: 2,
        },
        '.MuiMarkElement-root': {
          stroke: '#8884d8',
          scale: '0.6',
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
    </div>
  )
}

export default ChartsCompo