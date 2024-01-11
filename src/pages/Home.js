import React from 'react'
import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col w-full h-full items-start'>
      <Navigation />
      <main className='flex flex-row w-full h-auto items-start'>
        <Sidebar />

        <Outlet />
      </main>
      
    </div>
  )
}

export default Home