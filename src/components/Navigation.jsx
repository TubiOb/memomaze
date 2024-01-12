import React from 'react'
import { Box, Avatar, Text } from '@chakra-ui/react'
import Logo from '../assets/Memomaze logo.png'
// import { CiSearch } from "react-icons/ci";
// import { FcSettings } from "react-icons/fc";
// import { RiNotification3Line } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Box display='flex' flexDir='row' justifyContent='space-between' alignItems='center' h='auto' py='1' px={['2', '5']} w='full' gap={['5', '10']} borderBottom='1px' borderColor='lightgrey'>
          <Box className="flex gap-1 items-center p-1 font-['Montserrat Alternates'] w-[15%] md:w-[30%]">
            <img src={Logo} alt="Memomaze" className="w-8 " />
            <h1 className='hidden md:flex font-medium text-sm lg:text-lg'>Memomaze</h1>
          </Box>
        

        <Box className='flex' alignItems='center' justifyContent='space-evenly' gap={['3', '5']}>

          <NavLink to='profile'>
            <Box className="hover:bg-blue-100 cursor-pointer px-2 py-1 rounded-md group" display='flex' gap='2' alignItems='center'>
              <Avatar size={['xs', 'sm']} name={'Kent Dodds'} src='https://bit.ly/kent-c-dodds' />
              <Box className='border border-neutral-200 leading-4 group-hover:border-white flex-col' display={['none', 'none', 'none', 'flex']} py='1' px='2' rounded='md'>
                <Text as='h4' fontWeight='600' className='text-sm'> Kent Dodds </Text>
              </Box>
            </Box>
          </NavLink>
          
        </Box>
    </Box>
  )
}

export default Navigation