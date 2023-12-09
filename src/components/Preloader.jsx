import React from 'react'
import '../index.css'
import Memomaze from '../assets/Memomaze logo.png'

const Preloader = () => {
  return (
    <div className='flex justify-center flex-col items-center w-full h-screen bg-white'>
        <div className='relative flex flex-col w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56'>
            <img src={Memomaze} alt="Memomaze" className='absolute object-cover animate-pulse' loading='lazy' />
        </div>
        <h4 className='text-xl md:text-3xl lg:text-5xl font-semibold memo'>Memomaze</h4>
    </div>
  )
}

export default Preloader