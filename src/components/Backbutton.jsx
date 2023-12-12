import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BiLeftArrowAlt } from 'react-icons/bi'

const Backbutton = () => {
    const history = useNavigate();

    const handleGoBack = () => {
        history(-1);
    }

  return (
    <div className='bg-blue-500 items-center justify-center flex p-1 md:p-1.5 rounded-full self-start mt-2 hover:cursor-pointer hover:font-semibold absolute md:top-10 md:left-5 left-5 top-7' onClick={handleGoBack}>
        <BiLeftArrowAlt className='text-white' size={18} />
    </div>
  )
}

export default Backbutton