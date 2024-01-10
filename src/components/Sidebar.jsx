import React from 'react'
import { PiMoonDuotone } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { GoChecklist, GoTasklist } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscNotebook } from "react-icons/vsc";
import { Box } from '@chakra-ui/react'
import { RiSettingsLine } from "react-icons/ri";
import { RiNotification3Line } from "react-icons/ri";


const Sidebar = () => {

    const menus = [
        { name: 'Dashboard', icon: LuLayoutDashboard, color: '', active: true },
        { name: 'Completed', icon: GoChecklist, color: '', active: false },
        { name: 'Tasks', icon: GoTasklist, color: '', active: false },
        { name: 'Note', icon: VscNotebook, color: '', active: false},
        { name: 'Calendar', icon: IoCalendarOutline, color: '', active: false, alert: false},
    ]

  return (
    <aside className='h-screen'>
        <nav className='h-full flex flex-col bg-white border-r shadow-md'>
        {/* <button className='p-1.5 flex mt-1 ml-auto mr-[-15px] bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-white hover:border-white'><LuPanelRightOpen /></button> */}

            <div className='flex-1 px-2 py-2 text-sm md:text-md rounded-lg'>
                <ul className='flex flex-col gap-3 mb-2'>
                    {/* <p>Menu</p> */}
                    {menus.map((menu, index) => (
                        <li key={index} className={`flex gap-1 items-center cursor-pointer px-1 py-1 relative group rounded-lg ${ menu.active  ? 'bg-blue-200 hover:bg-blue-300 text-white' : 'hover:bg-blue-300 hover:text-white text-gray-500'}`}>
                            {React.createElement(menu.icon, {color: menu.color, size: 25})}
                            <div className='absolute rounded-md px-2 py-1 ml-10 bg-blue-200 font-medium invisible opacity-10 translate-x-1 transition-all group-hover:visible group-hover:opacity-100'>{menu.name}</div>

                            {/* <div className=''>
                                {menu.name}
                            </div> */}
                        </li>
                    ))}
                </ul>

                <hr className='my-3' />
            </div>

            <div className='border-t flex flex-col items-center gap-1 p-1'>
                <Box display='flex' flexDir='column' gap='3' p='1.5' alignItems='center' rounded='lg'>
                    <RiSettingsLine size={['25']} className='hover:bg-blue-300 hover:text-white px-1 py-1 cursor-pointer rounded-lg' />
                    <RiNotification3Line size={['25']} className='hover:bg-blue-300 hover:text-white px-1 py-1 cursor-pointer rounded-lg' />
                </Box>
                <button className='p-1.5 rounded-lg  bg-white hover:bg-blue-200 hover:text-white'><PiMoonDuotone size='20' /></button>
            </div>
        </nav>
    </aside>
  )
}

export default Sidebar