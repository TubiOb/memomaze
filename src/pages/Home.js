import React from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
// import { Outlet } from 'react-router-dom'
import '../index.css'

const Home = () => {
  return (
    <div className={`flex flex-row w-full flex-1 h-full items-start font-['Rethink Sans']`}>
      {/* <Navigation /> */}
        <Sidebar />

        {/* <Outlet /> */}
      
    </div>
  )
}

export default Home