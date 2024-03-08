import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import '../index.css'

const Home = () => {

  return (
    <div className={`flex w-full flex-grow flex-1 max-h-screen sticky items-start justify-start`}>
      {/* <Navigation /> */}
        <Sidebar />

        <Outlet />
      
    </div>
  )
}

export default Home