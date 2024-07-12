'use client'
import React from 'react'
import {FiHome, FiMessageCircle, FiSettings} from "react-icons/fi"
import { useParams, usePathname } from 'next/navigation'
import SideBarItem from './side-bar-item'



const SideBarLinks = () => {
    const params = useParams()
    const pathname = usePathname()
    const routes = [
        {
            icon: <FiHome />,
            label: "Site Home",
            href: `/${params.websiteId}`
        },
        {
            icon: <FiMessageCircle />,
            label: "Hero Section",
            href: `/${params.websiteId}/hero`
        },
        {
            icon: <FiSettings />,
            label: "Settings",
            href: `/${params.websiteId}/settings`
        },
        // {
        //     icon: <FiMenu />,
        //     label: "Dashboard",
        //     href: "/dashboard"
        // },
        // {
        //     icon: <FiBarChart />,
        //     label: "Analytics",
        //     href: "/teacher/numbers"
        // },
        // {
        //     icon: <FiSearch/>,
        //     label: "Browse",
        //     href: "/search"
        // }
    ]
    const links = routes;
  return (
    <div
    className='flex flex-col w-full pt-4'
    >
    {links.map( route => (
        <SideBarItem
            icon={route.icon}
            key={route.href}
            label={route.label}
            href={route.href}
        />
    ))}
    </div>
  )
}

export default SideBarLinks