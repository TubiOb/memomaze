import React from 'react'
import { MdSpaceDashboard, MdPerson4 } from "react-icons/md";
import { BiTask, BiSolidCategoryAlt } from "react-icons/bi";
import { LuTrash2, LuAlarmClock } from "react-icons/lu";
import Sidebar from './Sidebar';

const SidebarItem = () => {

    const menus = [
        { name: 'Dashboard', icon: MdSpaceDashboard, active: true },
        { name: 'Profile', icon: MdPerson4, active: false },
        { name: 'Completed Tasks', icon: BiTask, active: false },
        { name: 'Trash', icon: LuTrash2, active: false },
        { name: 'Reminder', icon: LuAlarmClock, active: false, alert: false},
    ]

    const notes = [
        { name: 'Categories', icon: BiSolidCategoryAlt, active: false, subcategories: [
            { name: 'Family', active: false },
            { name: 'Work', active: false, },
        ]},
    ]

    const tasks = [
        { name: 'Categories', icon: BiSolidCategoryAlt, active: false, subcategories: [
            { name: 'Family', active: false },
            { name: 'Work', active: false, },
        ] }
    ]

    console.log('Notes:', notes);
    console.log('Tasks:', tasks);

  return (
    // <Sidebar menus={menus} notes={notes} tasks={tasks} />
    <div>
        
    </div>
  )
}

export default SidebarItem