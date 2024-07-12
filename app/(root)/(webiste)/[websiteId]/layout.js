import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import {  currentUser,} from "@clerk/nextjs/server";
import DashNavbar from '../(dashboard)/_components/dash-navbar';
import Sidebar from '../(dashboard)/_components/side-bar';




export async function generateMetadata({ params }) {
  const user = await currentUser()
  const websiteId = params.id
  if(!user){
  redirect("/sign-in")   
  }
  const userId = user.firstName
  const website = await prisma.website.findFirst({
      where: {
          id: websiteId,
          userId: userId
      }
  })
 
  return {
    title: website.name,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}

const layout = async ({children, params}) => {
    const user = await currentUser()
    const websiteId = params.id
    if(!user){
    redirect("/sign-in")   
    }
    const userId = user.firstName
    const website = await prisma.website.findFirst({
        where: {
            id: params.id,
            userId: userId
        }
    })
  return (
    <div className='h-full'>
        <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <DashNavbar />        
      </div>
      <div className='hidden   md:flex md:w-56 flex-col fixed inset-y-0 z-50'>
      
      <Sidebar   />
      </div>
                
      <main className='md:pl-56 pt-[80px] h-full'>

        {children}
        </main>
        {/* <Navbar website={website} /> */}
  </div>

  )
}

export default layout