"use client"
import React, { useState } from "react"
import Firstbar from "../navbar/Firstbar"
import Secondbar from "../navbar/Secondbar"
import Thirdbar from "../navbar/Thirdbar"
import SignIn from "./SignIn"
import { useUser } from "@/contexts/useUser"
const Navbar: React.FC = () => {
  const { isOpen, setIsOpen } = useUser()
  return (
    <>
      <Firstbar />
      <hr className="text-gray-200" />
      <Secondbar />
      <hr className="text-gray-200" />
      <Thirdbar />

      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default Navbar
