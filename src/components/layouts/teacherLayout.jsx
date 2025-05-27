import React from 'react'
import Navbar from '../common/navbar/navbar'
import TeacherSidebar from '../common/sidebar/teacherSidebar'
import { Outlet } from 'react-router-dom'

const TeacherLayout = () => {
  return (
      <div className="container">
      <div className="container-side">
        <TeacherSidebar/>
      </div>
      <div className="container-body">
        <Navbar />
        <Outlet /> {/* Renders the child route content */}
      </div>
    </div>
  )
}

export default TeacherLayout
