"use client"
import React, { useState } from "react"
import SignIn from "./SignIn"
import Firstbar from "../navbar/Firstbar"
import Secondbar from "../navbar/Secondbar"
import Thirdbar from "../navbar/Thirdbar"
const Navbar: React.FC = () => {
  const [isOpenSignIn, setIsOpenSignIn] = useState(false)
  return (
    <>
      <Firstbar />
      <hr className="text-gray-200" />
      <Secondbar />
      <hr className="text-gray-200" />
      <Thirdbar />
      <SignIn isOpen={isOpenSignIn} setIsOpen={setIsOpenSignIn} />
    </>
  )
}

export default Navbar
