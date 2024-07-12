import React from 'react'

const layout = ({children}) => {
  return (
    <div
    className='flex flex-col h-screen justify-center items-center'
    >
        {children}
    </div>
  )
}

export default layout