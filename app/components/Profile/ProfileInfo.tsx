import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "@/public/images/avatar.png";
import { style } from "@/app/styles/style";
import { IoCameraOutline } from "react-icons/io5";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useLoaduserQuery } from "@/redux/features/api/apiSlice";
import { RxCross1 } from "react-icons/rx";

type Props = {
  user: any;
};

const ProfileInfo = ({ user }: Props) => {
  const [name, setName] = useState(user?.name);
  const [zoomIn, setZoomIn] = useState(false);
  const [address, setAddress] = useState(user?.address);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [image, setImage] = useState<any>(null);
  const [updateUser,{isSuccess, isLoading,error}] = useUpdateUserMutation();
  const {refetch} = useLoaduserQuery(undefined,{refetchOnMountOrArgChange: true});
  
  const imageHandeler = (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

      fileReader.onload = () => {
        if(fileReader.readyState === 2){
          const avatar = fileReader.result;
          setImage(avatar);
        }
      }
      fileReader.readAsDataURL(file);
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();

   await updateUser({
    name:name,
    address: address,
    phoneNumber: phoneNumber,
    avatar: image
   })
  }
  useEffect(() => {
    if(isSuccess){
     refetch()
      toast.success("User updated successfully");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  },[isSuccess, error, refetch])
  return (
    <div className="w-full">
      <form onSubmit={submitHandler} className=" w-full flex flex-col items-center">
        <div className=" mb-8 relative">
          {image ? (
            <Image src={image} alt="avatar" width={500} height={500}
            className=" w-[150px] h-[150px] rounded-full border-[2px] border-[#8015e5] object-cover"
            />
          ) : (
            <Image
              src={
                user?.avatar
                  ? user?.avatar?.url
                  : user?.socialAvatar
                  ? user?.socialAvatar
                  : avatar
              }
              alt="avatar"
              width={500}
              height={500}
              className=" w-[150px] h-[150px] rounded-full border-[2px] border-[#12c2d2] object-cover"
              onClick={() => setZoomIn(true)}
            />
          )}
          <label
            htmlFor="images"
            className={`absolute right-0 bottom-4 p-[3px]  rounded-full cursor-pointer ${image ? "bg-[#8015e5]" : "bg-[#12c2d2]"}`}
          >
            <IoCameraOutline color={"white"} size={20} />
          </label>
          <input
            type="file"
            accept="image/png,image/jpg,image/jpeg,imagr/webp"
            onChange={imageHandeler}
            className=" hidden "
            id="images"
          />
        </div>
        <div className=" p-1">
          <div className=" flex 600px:flex-row flex-col gap-6">
            <input
              type="text"
              placeholder="Name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${style.input} 800px:!w-[270px] dark:!bg-[#170831] m-2`}
            />
            <input
              type="email"
              placeholder="Email.."
              value={user?.email}
              readOnly
              className={`${style.input} 800px:!w-[270px] dark:!bg-[#170831] m-2`}
            />
          </div>
          <div className=" flex 600px:flex-row flex-col gap-6">
            <input
              type="number"
              placeholder="phone number.."
              value={phoneNumber}
              onChange={(e: any) => setPhoneNumber(e.target.value)}
              className={`${style.input} 800px:!w-[270px] dark:!bg-[#170831] m-2`}
            />
            <input
              type="text"
              placeholder="Address.."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${style.input} 800px:!w-[270px] dark:!bg-[#170831] m-2`}
            />
          </div>
          <div className="mt-[20px] pl-4">
          <button type="submit" disabled={isLoading} className=" active:scale-90 duration-200 w-[150px] p-2 bg-[#000] dark:bg-[#5f0c74] rounded text-[18px] text-white font-[600] font-Poppins">
            Update
          </button>
         </div>
        </div>
      </form>
      {
        zoomIn && (
          <div className=" w-full z-[9999] h-screen fixed top-0 left-0 bg-[#16161649]">
              <div className=" p-1 rounded-[10px] bg-[#e7e3e3] dark:bg-[#2c2947] fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 ">
                <div className=" flex justify-end"><RxCross1 size={25} className=" text-black dark:text-white  cursor-pointer" onClick={() => setZoomIn(false)}/></div>
                   <Image src={ user?.avatar
                  ? user?.avatar?.url
                  : user?.socialAvatar
                  ? user?.socialAvatar
                  : avatar} alt="Avatar"
                   width={1000} height={1000}
                   className=" 1000px:w-[600px] 1000px:h-[650px] 800px:w-[400px] 800px:h-[450px] w-[250px] h-[300px] object-cover rounded"
                   />
              </div>
          </div>
        )
      }
    </div>
  );
};

export default ProfileInfo;
