import React from 'react'
import Image from '../assets/Bullet journal-rafiki.svg'
import '../index.css'

const Login = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full h-screen'>
        <div className='w-[40%] h-full hidden md:flex items-center justify-end'>
            <img src={Image} alt="" className='object-cover space-x-4 w-[80%]' />
        </div>

        <div className='w-full md:w-[60%] h-full flex items-center justify-center'>

          <div className="rounded-xl bg-blue-50 lg:w-[60%] md:w-[80%] w-[90%] flex flex-col font-['Lato'] items-center">
            <div className='flex items-center flex-col w-[80%] md:w-[50%] text-center p-1 gap-1'>
              <h4 className='text-lg md:text-xl lg:text-2xl font-semibold'>Welcome,</h4>
              <h4 className='text-lg md:text-xl lg:text-2xl font-normal'>Glad to see you!</h4>
              <p className='text-sm md:text-base lg:text-lg'>Hey, Enter your details to get signed in to your account</p>
            </div>

            <form>
              
            </form>
          </div>

        </div>
    </div>
  )
}

export default Login