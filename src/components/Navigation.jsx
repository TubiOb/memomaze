import React from 'react'
import { Box, Avatar, Text } from '@chakra-ui/react'
import Logo from '../assets/Memomaze logo.png'
// import { CiSearch } from "react-icons/ci";
// import { FcSettings } from "react-icons/fc";
// import { RiNotification3Line } from "react-icons/ri";

const Navigation = () => {
  return (
    <Box display='flex' flexDir='row' overflow='hidden' justifyContent='space-between' alignItems='center' h='auto' py='3' px={['2', '5']} w='full' gap={['5', '10']} borderBottom='1px' borderColor='lightgrey'>
        <Box className="flex gap-1 items-center p-1 font-['Montserrat Alternates'] w-[15%] md:w-[30%]">
          <img src={Logo} alt="Memomaze" className="w-8 " />
          <h1 className='hidden md:flex font-medium text-sm lg:text-lg'>Memomaze</h1>
        </Box>

        {/* <Box className='w-[45%]'>
          <InputGroup w='65%' className='w-[80%] mx-auto'>
            <InputLeftElement py='0.5'>
              <CiSearch />
            </InputLeftElement>
            <Input type='text' placeholder='Search task' className='text-xs focus-within:border-neutral-200' focusBorderColor='#d3d3d3' _placeholder={{ fontSize: 'sm', fontWeight: 'thin' }} />
          </InputGroup>
        </Box> */}

        <Box className='flex' alignItems='center' justifyContent='space-evenly' gap={['3', '5']}>
          {/* <Box display='flex' flexDir='row' gap={['3', '5']} alignItems='center'>
            <FcSettings size={['18']} />
            <RiNotification3Line size={['18']} />
          </Box> */}

          <Box className="hover:bg-blue-100 cursor-pointer px-2 py-0.5 rounded-md group" display='flex' gap='2' alignItems='center'>
            <Avatar size={['xs', 'sm']} name={'Kent Dodds'} src='https://bit.ly/kent-c-dodds' />
            <Box className='border border-neutral-200 leading-4 group-hover:border-white flex-col' display={['none', 'none', 'none', 'flex']} py='1' px='2' rounded='md'>
              <Text as='h4' fontWeight='600' className='text-sm'> Kent Dodds </Text>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default Navigation