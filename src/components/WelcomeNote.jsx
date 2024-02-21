import React from 'react'
import '../index.css'
import Memomaze from '../assets/Memomaze logo.png'
import { GrOverview } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import { NavLink } from 'react-router-dom'

const WelcomeNote = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
        <div className='rounded-lg bg-blue-100 dark:bg-white dark:text-blue-400 flex flex-col w-[90%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%] h-auto py-4 px-5 gap-2'>
            <div className="w-[90%] lg:w-[60%] h-auto p-3 mx-auto block items-center justify-center text-center font-['Lato'] gap-2">
                <h3 className=" text-lg md:text-xl lg:text-2xl font-semibold">Welcome to Memomaze</h3>
                <img src={Memomaze} alt="Memomaze" className='object-cover w-16 lg:w-28 mx-auto' />
            </div>

            <div className="font-['Nunito Sans'] flex flex-col gap-2.5">
              <p className='text-center font-medium text-xs lg:text-sm 2xl:text-base mb-4'>👋 Hello! Welcome to Memomaze, your personal space for reflections and tasks.</p>


              <ul className=''>
                <li className='font-semibold flex items-center gap-1 text-base lg:text-lg '><GrOverview className='text-red-400 text-xl' /> Quick Overview</li>
                <li className='text-sm md:text-base font-normal'>- Write daily thoughts in your diary.</li>
                <li className='text-sm md:text-base font-normal'>- Organize tasks and stay productive.</li>
              </ul>
              

              <ul className=''>
                <li className='font-semibold flex items-center gap-1 text-base lg:text-lg '><MdDone className='text-green-700 text-xl' /> Benefits of Using Memomaze</li>
                <li className='text-sm md:text-base font-normal'>- Improved organization</li>
                <li className='text-sm md:text-base font-normal'>- Increased productivity</li>
                <li className='text-sm md:text-base font-normal'>- Enhanced well-being</li>
              </ul>

              <p className='text-center font-medium text-xs lg:text-sm 2xl:text-base mt-4'>📣 We'd love to hear your feedback! Let us know how we can make Memomaze even better.</p>

              <p className='text-center font-medium text-xs lg:text-sm 2xl:text-base mb-4'>Ready to begin your journey? Start writing and organizing today!</p>

              <NavLink to='/home'>
                <button type="submit" className='text-white px-2 py-2 rounded-xl w-auto mx-auto bg-blue-400 font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300 hover:font-semibold hover:bg-white hover:text-blue-400  hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >Continue</button>
              </NavLink>

            </div>
        </div>
        
    </div>
  )
}

export default WelcomeNote