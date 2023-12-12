import React, { useState } from 'react'
import Image from '../assets/Bullet journal-rafiki.svg'
import '../index.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
          setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='flex flex-row items-center justify-between w-full h-screen'>
        <div className='w-[45%] md:hidden h-full hidden lg:flex items-center justify-end'>
            <img src={Image} alt="" className='object-cover space-x-4 w-[80%] xl:w-[90%]' />
        </div>

        <div className='w-full md:w-full lg:w-[55%] h-full flex items-center justify-center'>

          <div className="rounded-xl bg-blue-100 xl:w-[60%] lg:w-[80%] md:w-[70%] sm:w-[65%] w-[90%] h-auto py-2 px-3 gap-4 flex flex-col font-['Lato'] items-center">
            <div className='flex items-center flex-col w-[95%] md:w-[80%] text-center p-2 gap-1'>
              <h4 className='text-lg md:text-xl lg:text-2xl font-semibold'>Welcome,</h4>
              <h4 className='text-lg md:text-xl lg:text-2xl font-normal'>Glad to see you!</h4>
              <p className='text-sm md:text-base lg:text-lg'>Hey, Enter your details to get signed in to your account</p>
            </div>

            <form className='w-[95%] md:w-[80%] mt-2 flex flex-col justify-between gap-6'>
              <label htmlFor="Email" className="relative block rounded-lg border w-full focus-within:border-white outline-none">
                <input type="email" id="Email" className="peer border-none bg-blue-50 w-full h-full focus:bg-blue-100 placeholder-transparent py-2 md:py-1.5 lg:py-1.5 px-2 xl:px-3.5 xl:py-2.5 text-xs md:text-sm lg:text-base focus:border-transparent focus:outline-none rounded-lg focus:ring-0 required:border-red-500" placeholder="Email"/>
                <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-blue-100 top-0 -translate-y-1/2 p-0.5 text-xs md:twxt-sm lg:text-base xl:text-lg text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Email</span>
              </label>

              <label htmlFor="Password" className="relative inline-flex rounded-lg border w-full bg-blue-50 peer-focus:bg-blue-100 focus-within:border-white outline-none">
                <div className='flex flex-row items-center w-full bg-blue-50 peer-focus:bg-blue-100 rounded-lg'>
                  <input type={passwordVisible ? "text" : "password"} id="Password" className="peer border-none bg-inherit bg-blue-50 focus:bg-blue-100 w-full h-full placeholder-transparent py-2 md:py-1.5 lg:py-1.5 px-2 xl:py-2 xl:px-3.5 text-xs md:twxt-sm lg:text-base xl:text-lg focus:border-transparent focus:outline-none rounded-l-lg focus:ring-0 required:border-red-500" placeholder="Password"/>
                  <div className='w-auto h-full secure bg-blue-50 peer-focus:bg-blue-100 rounded-r-lg flex items-center py-2 md:py-1.5 lg:py-1 px-2 xl:px-3 xl:py-2.5'>
                    {passwordVisible ? (
                      <AiOutlineEye className="cursor-pointer w-4 h-4 xl:w-5 xl:h-5"  onClick={togglePasswordVisibility} />
                    ) : (
                      <AiOutlineEyeInvisible className="cursor-pointer w-4 h-4 xl:w-5 xl:h-5"  onClick={togglePasswordVisibility} />
                    )}
                  </div>
                  <span className="pointer-events-none absolute start-3.5 bg-transparent backdrop-blur-sm peer-focus:bg-blue-100 top-0 -translate-y-1/2 p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Password</span>
                </div>
              </label>

              <button type="submit" className='text-blue-400 px-2 py-2 rounded-xl w-[70%] mx-auto bg-blue-50 font-semibold shadow-neutral-200 border-neutral-50 shadow-md transition duration-300  hover:font-semibold hover:bg-white hover:border hover:border-neutral-100 hover:shadow-neutral-300 text-sm md:text-lg flex items-center justify-center' >Sign In</button>
              
            </form>
          </div>

        </div>
        
    </div>
  )
}

export default Login