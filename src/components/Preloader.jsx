import React from 'react'
import '../index.css'
import Memomaze from '../assets/Memomaze logo.png'

const Preloader = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen bg-white'>
        <div className='relative '>
            <img src={Memomaze} alt="Memomaze" className='absolute' />
        </div>
    </div>
  )
}

export default Preloader