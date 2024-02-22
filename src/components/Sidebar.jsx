import React, { useEffect, useState } from 'react'
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
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../Firebase';
import { LuSunDim } from "react-icons/lu";
import { useTheme } from '../ThemeContext';

const Sidebar = ({ openModal }) => {
    const { theme, toggleTheme } = useTheme();

    // eslint-disable-next-line
    const [loggedUser, setloggedUser] = useState('');
    // eslint-disable-next-line
    const [userImage, setuserImage] = useState('');


    const [activeMenu, setActiveMenu] = useState(() => {
        // Retrieve the active menu index from localStorage, defaulting to 0 if not present.
        return parseInt(localStorage.getItem('activeMenuIndex')) || 0;
    });

    useEffect(() => {
        // Save the active menu index to localStorage whenever it changes.
        localStorage.setItem('activeMenuIndex', activeMenu);
    }, [activeMenu]);


        //   GETTING CURRENT USER
    useEffect(() => {
        auth.onAuthStateChanged( async (user) => {
            if (user) {
                const userUID = user.uid;
                const userDocRef = doc(firestore, 'User', userUID);

                try {
                    const userData = await getDoc(userDocRef);

                    if (userData.exists()) {
                        const userInfo = userData.data();

                        if (userInfo) {
                            const loggedUser = userInfo.username;
                            const userImage = userInfo.userImage;

                            setloggedUser(loggedUser);
                            setuserImage(userImage);
                        }
                    }
                }
                catch (err) {

                }
            }
        })
    })



        //   DYNAMICALLY CREATING SIDEBAR MENUITEMS
    const menus = [
        { name: 'Dashboard', icon: LuLayoutDashboard, color: '', active: true },
        { name: 'Completed', icon: GoChecklist, color: '', active: false },
        { name: 'Tasks', icon: GoTasklist, color: '', active: false },
        { name: 'Note', icon: VscNotebook, color: '', active: false},
        { name: 'Calendar', icon: IoCalendarOutline, color: '', active: false, alert: false},
    ]

    // const adds = [
    //     { icon: MdAdd, color: 'lightslategray', onclick: openModal }
    // ]

  return (
    <aside className='h-[100svh] w-[50px] relative z-50 flex justify-center items-center border-r border-r-gray-300'>
        <nav className='h-[100svh] w-[50px] flex flex-col flex-grow fixed px-2 py-2 items-center justify-between text-sm md:text-md'>
        {/* <button className='p-1.5 flex mt-1 ml-auto mr-[-15px] bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-white hover:border-white'><LuPanelRightOpen /></button> */}

            {/* <div className='flex-1 flex flex-col px-2 py-2 items-center justify-around text-sm bg-white h-full md:text-md m-auto'> */}
                <Box className="flex gap-1 items-center font-['Montserrat Alternates'] mx-auto">
                    <img src={Logo} alt="Memomaze" className='w-9' />
                    {/* <h1 className='hidden md:flex font-medium text-sm lg:text-lg'>Memomaze</h1> */}
                </Box>

                <ul className='flex flex-col items-center justify-center gap-4'>
                    {/* <p>Menu</p> */}
                    {menus.map((menu, index) => (
                        <li key={index} onClick={() => setActiveMenu(index)} className={`flex gap-1 items-center cursor-pointer px-1 py-1 relative group rounded-lg ${ activeMenu === index  ? 'bg-neutral-300 text-gray-900 hover:bg-neutral-500 hover:text-white' : 'hover:bg-neutral-500 hover:text-white '}`}>
                            {React.createElement(menu.icon, {color: menu.color, size: 25})}
                            <div className='absolute rounded-md px-2 py-1 ml-10 bg-neutral-500 font-medium z-50 invisible opacity-10 translate-x-1 transition-all group-hover:visible group-hover:opacity-100 group:hover:z-50 group-hover:translate-x-0'>{menu.name}</div>

                            {/* <div className=''>
                                {menu.name}
                            </div> */}
                        </li>
                    ))}
                </ul>

                <hr className='my-1 w-[80%]' />
                
                {/* <ul className='flex items-center justify-center'>
                    {adds.map((add, index) => (
                        <li key={index} className={`flex gap-1 items-center cursor-pointer px-1 py-1 relative group rounded-lg hover:border-neutral-200 hover:shadow-md text-gray-500`}>
                            {React.createElement(add.icon, {color: add.color, size: 25})}
                            <div className='absolute rounded-md px-2 py-1 ml-10 bg-blue-400 text-white font-medium invisible opacity-10 w-20 translate-x-1 transition-all group-hover:visible group-hover:opacity-100 z-50 group:hover:z-50 group-hover:translate-x-0'>{add.name}</div>
                        </li>
                    ))}
                </ul> */}

                <button className='flex items-center justify-center cursor-pointer px-1 py-1 relative group rounded-lg hover:border-neutral-200 hover:bg-neutral-500 hover:shadow-xl text-gray-500 hover:text-white'>
                    <MdAdd size={25} onClick={openModal} />
                </button>

               
                <div className='border-t flex flex-col items-center justify-between gap-2'>
                    <Box display='flex' flexDir='column' gap='2' p='1' alignItems='center' rounded='lg'>
                        <RiSettingsLine size={['25']} className='hover:bg-neutral-500 hover:text-white py-1 cursor-pointer rounded-lg' />
                        <RiNotification3Line size={['25']} className='hover:bg-neutral-500 hover:text-white py-1 cursor-pointer rounded-lg' />
                    </Box>
                    <button className='p-1 rounded-lg hover:bg-neutral-500 hover:text-white' onClick={toggleTheme} >
                        {theme === 'dark' ? <PiMoonDuotone size='20' /> : <LuSunDim size='20' />}
                    </button>

                    <NavLink to='profile'>
                        <Box className="cursor-pointer group" display='flex' gap='2' alignItems='center'>
                            <Avatar size={['xs', 'sm']} name={loggedUser} src={userImage} />
                        </Box>
                    </NavLink>
                </div>
            {/* </div> */}

            
        </nav>
    </aside>
  )
}

export default Sidebar