"use client"
import React from "react"
import Firstbar from "../navbar/Firstbar"
import Secondbar from "../navbar/Secondbar"
import Thirdbar from "../navbar/Thirdbar"
const Navbar: React.FC = () => {
  return (
    <>
      <Firstbar />
      <hr className="text-gray-200" />
      <Secondbar />
      <hr className="text-gray-200" />
      <Thirdbar />
    </>
  )
}

export default Navbar
