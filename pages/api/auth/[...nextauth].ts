import NextAuth from "next-auth/next";

import  GoogleProvider  from "next-auth/providers/google";

import  GithubProvider from "next-auth/providers/github";

export default NextAuth({
    session:{
        strategy: "jwt"
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        })
    ],
    pages:{
        signIn: "/login",
    },
    secret: process.env.SECRET
})