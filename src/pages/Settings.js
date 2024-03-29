import React from 'react'
import { CiEdit } from "react-icons/ci";

const Settings = () => {
  return (
    <div className='w-full h-screen overflow-y-auto px-2.5 py-3 flex flex-1'>
        <div className='flex flex-col items-center gap-3 dark:bg-white dark:shadow-white/50 shadow-black/50 bg-neutral-950/80 w-full lg:w-[70%] mx-auto h-full rounded-lg shadow-md px-4 lg:px-7 py-9 dark:text-neutral-900 text-white'>
            <div className='flex flex-col lg:flex-row w-full rounded-lg items-center justify-start p-2 gap-2'>
                <div className='w-full lg:w-[25%] items-center justify-center flex p-1'>
                    <img src='' alt='' className='rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover' />    
                </div>
                <div className='flex flex-col w-full lg:w-[50%] gap-1 p-1 items-center lg:items-start justify-between'>
                    <button type="button" className='px-3 py-2 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm lg:text-sm'>Upload new photo</button>
                    <div className='flex flex-col items-center lg:items-start'>
                        <p className='text-sm lg:text-sm'>At least 800x800 px recommended</p>
                        <p className='text-sm lg:text-sm'>JPG or PNG is allowed</p>
                    </div>
                </div>
            </div>

            <div className='divide-y-2'>
                
            </div>

            <div className='flex flex-col w-full rounded-lg items-center justify-start p-2 gap-3 border border-neutral-500'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <h4 className='text-base font-semibold'>Personal Info</h4>
                    <button type="" className='flex items-center gap-1 py-1 px-2 border border-neutral-200 dark:border-neutral-500 rounded-lg text-sm lg:text-sm'>
                        <CiEdit />
                        Edit</button>
                </div>
                <div className='flex flex-col lg:flex-row w-[80%] items-stretch justify-between self-start p-1 gap-10'>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>First Name</h4>
                        <p></p>
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Email</h4>
                        <p></p>
                    </div>
                    <div>
                        <h4 className='text-sm lg:text-sm text-neutral-300 dark:text-neutral-600 font-medium'>Phone</h4>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings