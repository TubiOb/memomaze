import React from 'react'
import { Toaster } from 'sonner'
import '../index.css'

const Toast = ({ showToast }) => {

  return (
    <div>
        <Toaster
            position='top-right'
            visibleToasts={2}
            dir='rtl'
            theme="light"
            invert={true}
            richColors
            closeButton
            />
    </div>
  )
}

export default Toast