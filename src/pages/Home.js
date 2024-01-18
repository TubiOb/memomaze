import React, { useState } from 'react'
// import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import CustomModal from '../components/CustomModal'
import { Outlet } from 'react-router-dom'
import '../index.css'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("What's on your mind?");
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={`flex w-full h-screen relative items-start font-['Rethink Sans']`}>
      {/* <Navigation /> */}
        <Sidebar openModal={openModal} />

        <Outlet />

        <CustomModal isOpen={isModalOpen} onClose={closeModal} />
      
    </div>
  )
}

export default Home