'use client'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const MainNav = ({className}) => {
    const pathName = usePathname()
    const params = useParams()
    const routes = [
        {
            href: `/${params.websiteId}/settings`,
            label: "Settings",
            active: pathName === `/${params.websiteId}/settings`
        }
    ]
  return (
    <nav className='flex items-center space-x-4 lg:space-x-6'>
        {routes.map((route) => (
            <Link 
            key={route.href}
            href={route.href}
            className=''
            >
            {route.label}
            </Link>
        ))}
    </nav>
  )
}

export default MainNav