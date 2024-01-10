import React from 'react'
import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <div className='flex flex-col w-full h-screen items-start'>
      <Navigation />
      <Sidebar />
    </div>
  )
}

export default Home