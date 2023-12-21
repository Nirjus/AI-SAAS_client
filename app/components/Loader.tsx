import React from 'react'
import Lottie from 'lottie-react'
import animation from "../../public/Assets/Animation - 1699998893498.json";
type Props = {}

const Loader = (props: Props) => {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
           <Lottie animationData={animation} loop={true}/>
    </div>
  )
}

export default Loader