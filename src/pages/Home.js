import React from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import '../index.css'

const Home = () => {
  return (
    <div className={`flex flex-col w-full h-full items-center font-['Rethink Sans']`}>
      {/* <Navigation /> */}
      <main className='flex flex-row w-full items-start'>
        <Sidebar />

        <Outlet />
      </main>
      
    </div>
  )
}

export default Home