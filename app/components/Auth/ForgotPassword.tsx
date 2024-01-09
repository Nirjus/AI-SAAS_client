import { style } from "@/app/styles/style";
import { useForgotPasswordMutation } from "@/redux/features/user/userApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
};

const ForgotPassword = ({ }: Props) => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isSuccess,isLoading, data, error }] =
    useForgotPasswordMutation();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    await forgotPassword(email);
  };
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, data, error]);
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <h1 className=" text-center font-[600] font-Poppins text-[20px]">
          Enter your email
        </h1>
        <input
          type="email"
          required
          placeholder="abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${style.input} !w-full !mt-5`}
        />
        <div className=" flex px-3 justify-between items-center my-5">
          <button
            type="submit"
            className=" p-2 rounded text-white w-[100px] active:scale-90 duration-200 bg-black"
           disabled={isLoading}
          >
            submit
          </button>
          <Link
           href={"/login"}
            className=" text-[16px] cursor-pointer font-[600] text-[#464646] dark:text-[#b0afaf]"
          >
            back to signIn
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
