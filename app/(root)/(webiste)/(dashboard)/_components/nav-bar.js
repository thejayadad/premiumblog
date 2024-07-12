import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import WebsiteSwitch from './website-switch'
import prisma from '@/lib/prisma'
import {  currentUser,} from "@clerk/nextjs/server";


const Navbar = async () => {
    const user = await currentUser()
    if(!user){
    redirect("/sign-in")   
    }
    const userId = user.firstName
    const userWebsites = await prisma.website.findMany({
        where: {
          userId: userId,
        },
      });
  return (
    <header className='p-4 border-b h-full flex items-center justify-between bg-white shadow-sm'>
        <div className='flex justify-between w-full'>
            <div>
              <WebsiteSwitch items={userWebsites} />
            </div>
            <div>
                <MainNav className="mx-6" />
            </div>
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton />
            </div>
        </div>        
    </header>
  )
} 

export default Navbar