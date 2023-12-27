import React from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

interface ProtectedRoutes{
    children: React.ReactNode
}
export default function Protected({children}: ProtectedRoutes){
         const {user} = useSelector((state: any) => state.auth);

         return user ? children : redirect("/");
}