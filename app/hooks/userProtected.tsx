import React from "react";
import { redirect } from "next/navigation";
import UserAuth from "./userAuth";

interface ProtectedRoutes{
    children: React.ReactNode
}
export default function Protected({children}: ProtectedRoutes){
        const isLogin = UserAuth();

         return isLogin ? children : redirect("/");
}