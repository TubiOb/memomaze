import React from 'react'
import SignupForm from '../components/SignupForm'
import Backbutton from '../components/Backbutton'


const Signup = () => {
  

  return (
    <div className='flex flex-row items-center justify-between w-full h-screen'>
        <Backbutton />
        <SignupForm />
    </div>
  )
}

export default Signup