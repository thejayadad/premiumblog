import React from 'react'

const HeadingText = ({title, description}) => {
  return (
    <div>
        <h2 className='text-xl md:text-2xl font-bold tracking-tighter'>{title}</h2>
        <p className='text-sm md:text-md text-muted-foreground'>{description}</p>
    </div>
  )
}

export default HeadingText