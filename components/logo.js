import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link
    href="/"
    >
    <img
    height={79}
    width={79}
    src='../logo.png'
    />
    
    </Link>
  )
}

export default Logo