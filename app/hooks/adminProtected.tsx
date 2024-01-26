import React from "react";
import { redirect } from "next/navigation";
import AdminAuth from "./adminAuth";

interface ProtectedRoutes{
    children: React.ReactNode
}
export default function AdminProtected({children}: ProtectedRoutes){
        const isAdmin = AdminAuth();

         return isAdmin ? children : redirect("/");
}