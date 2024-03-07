import React from 'react'
import { useUser } from '../UserContext'

const TasksLayout = () => {
    const currentUser = useUser();
    console.log(currentUser);
  return (
    <div>

    </div>
  )
}

export default TasksLayout