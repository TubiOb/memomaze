import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import '../index.css'

const Home = () => {

  return (
    <div className={`flex w-full h-screen items-start justify-start overflow-y-hidden`}>
      {/* <Navigation /> */}
        <Sidebar />

        <Outlet />
      
    </div>
  )
}

export default Home