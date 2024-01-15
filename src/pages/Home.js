import React from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import '../index.css'

const Home = () => {
  return (
    <div className={`flex flex-row w-full h-screen items-center font-['Rethink Sans']`}>
      {/* <Navigation /> */}
        <Sidebar />

        <Outlet className='bg-red-900' />
      
    </div>
  )
}

export default Home