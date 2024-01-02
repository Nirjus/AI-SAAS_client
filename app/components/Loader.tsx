import React from 'react'
import Lottie from 'lottie-react'
import animation from "../../public/Assets/Animation - 1703619933506.json";
type Props = {}

const Loader = (props: Props) => {
  return (
      <div className=' w-[100px] h-[100px]'>
      <Lottie animationData={animation} loop={true} />
      </div>
  )
}

export default Loader