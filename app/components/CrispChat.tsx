"use client"
import React, { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

type Props = {}

export const CrispChat = (props: Props) => {
    useEffect(() => {
        Crisp.configure("c625c293-1341-4dcf-8712-58e922e499a2");
    },[]);

 return null;
}
const CrispProvider = (props: Props) => {
  return (
    <CrispChat />
  )
}

export default CrispProvider