import React from 'react'
import { useUser } from '../UserContext'

const NotesLayouts = () => {
    const currentUser = useUser();
    console.log(currentUser);
  return (
    <div>

    </div>
  )
}

export default NotesLayouts