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
            expand={true}
            richColors
            closeButton
            containerStyle={{ marginRight: '2%' }}
            />
    </div>
  )
}

export default Toast