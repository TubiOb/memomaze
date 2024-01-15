import React from 'react'
import { PiMoonDuotone } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { GoChecklist, GoTasklist } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscNotebook } from "react-icons/vsc";
import { Box, Avatar } from '@chakra-ui/react'
import { RiSettingsLine } from "react-icons/ri";
import { RiNotification3Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import Logo from '../assets/Memomaze logo.png'
import { NavLink } from 'react-router-dom';


const Sidebar = () => {

    const menus = [
        { name: 'Dashboard', icon: LuLayoutDashboard, color: '', active: true },
        { name: 'Completed', icon: GoChecklist, color: '', active: false },
        { name: 'Tasks', icon: GoTasklist, color: '', active: false },
        { name: 'Note', icon: VscNotebook, color: '', active: false},
        { name: 'Calendar', icon: IoCalendarOutline, color: '', active: false, alert: false},
    ]

    const adds = [
        { name: 'Add New', icon: MdAdd, color: 'lightslategray' }
    ]

  return (
    <aside className='h-full sticky'>
        <nav className='flex-1 h-full flex flex-col bg-white border-r shadow-md'>
        {/* <button className='p-1.5 flex mt-1 ml-auto mr-[-15px] bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-white hover:border-white'><LuPanelRightOpen /></button> */}

            <div className='flex flex-col px-2 py-2 text-sm md:text-md rounded-lg gap-10'>
                <Box className="flex gap-1 items-center font-['Montserrat Alternates'] mx-auto mb-1">
                    <img src={Logo} alt="Memomaze" className='w-9' />
                    {/* <h1 className='hidden md:flex font-medium text-sm lg:text-lg'>Memomaze</h1> */}
                </Box>

                <ul className='flex flex-col gap-4 mb-2'>
                    {/* <p>Menu</p> */}
                    {menus.map((menu, index) => (
                        <li key={index} className={`flex gap-1 items-center cursor-pointer px-1 py-1 relative group rounded-lg ${ menu.active  ? 'bg-blue-200 hover:bg-blue-400 text-white' : 'hover:bg-blue-400 hover:text-white text-gray-500'}`}>
                            {React.createElement(menu.icon, {color: menu.color, size: 25})}
                            <div className='absolute rounded-md px-2 py-1 ml-10 bg-blue-400 font-medium invisible opacity-10 translate-x-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0'>{menu.name}</div>

                            {/* <div className=''>
                                {menu.name}
                            </div> */}
                        </li>
                    ))}
                </ul>

                <hr className='my-1' />
                
                <ul className='flex flex-col gap-3 mt-4'>
                    {adds.map((add, index) => (
                        <li key={index} className={`flex gap-1 items-center cursor-pointer px-1 py-1 relative group rounded-lg hover:border-neutral-200 hover:shadow-md text-gray-500`}>
                            {React.createElement(add.icon, {color: add.color, size: 25})}
                            <div className='absolute rounded-md px-2 py-1 ml-10 bg-blue-400 text-white font-medium invisible opacity-10 w-20 translate-x-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0'>{add.name}</div>
                        </li>
                    ))}
                </ul>

                {/* <div className='flex items-center cursor-pointer justify-center px-1 py-1.5 text-sm border border-neutral-300 rounded-lg  '>
                    <MdAdd size='19' />
                </div> */}
            </div>

            <div className='border-t flex flex-col items-center mt-5 gap-1'>
                <Box display='flex' flexDir='column' gap='2' p='1.5' alignItems='center' rounded='lg'>
                    <RiSettingsLine size={['25']} className='hover:bg-blue-300 hover:text-white px-1 py-1 cursor-pointer rounded-lg' />
                    <RiNotification3Line size={['25']} className='hover:bg-blue-300 hover:text-white px-1 py-1 cursor-pointer rounded-lg' />
                </Box>
                <button className='p-1 rounded-lg  bg-white hover:bg-blue-200 hover:text-white'><PiMoonDuotone size='20' /></button>

                <NavLink to='profile'>
                    <Box className="hover:bg-blue-100 cursor-pointer px-1 py-1 rounded-md group" display='flex' gap='2' alignItems='center'>
                        <Avatar size={['xs', 'sm']} name={'Kent Dodds'} src='https://bit.ly/kent-c-dodds' />
                        {/* <Box className='border border-neutral-200 leading-4 group-hover:border-white flex-col' display={['none', 'none', 'none', 'flex']} py='1' px='2' rounded='md'>
                            <Text as='h4' fontWeight='600' className='text-sm'> Kent Dodds </Text>
                        </Box> */}
                    </Box>
                </NavLink>
            </div>
        </nav>
    </aside>
  )
}

export default Sidebar