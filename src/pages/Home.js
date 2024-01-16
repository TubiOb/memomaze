import React from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import '../index.css'

const Home = () => {
  return (
    <div className={`flex w-full h-screen relative items-start font-['Rethink Sans']`}>
      {/* <Navigation /> */}
        <Sidebar />

        <Outlet />
      
    </div>
  )
}

export default Home