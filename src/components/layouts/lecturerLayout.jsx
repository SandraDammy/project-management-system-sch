import React from 'react'
import Navbar from '../common/navbar/navbar'
import LecturerSidebar from '../common/sidebar/lecturerSidebar'
import { Outlet } from 'react-router-dom'

const LecturerLayout = () => {
  return (
      <div className="container">
      <div className="container-side">
        <LecturerSidebar/>
      </div>
      <div className="container-body">
        <Navbar />
        <Outlet /> 
      </div>
    </div>
  )
}

export default LecturerLayout
