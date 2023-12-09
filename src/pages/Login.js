import React from 'react'
import Image from '../assets/Bullet journal-rafiki.svg'

const Login = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full h-screen'>
        <div className='w-[40%] h-auto hidden md:flex items-end justify-end'>
            <img src={Image} alt="" className='object-cover space-x-4 w-[80%]' />
        </div>

        <div className='w-[60%] h-auto items-start justify-center'>
            
        </div>
    </div>
  )
}

export default Login