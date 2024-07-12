import React from 'react'
import WebsiteSwitch from './website-switch'
import prisma from '@/lib/prisma'
import {  currentUser,} from "@clerk/nextjs/server";
import SiteModal from '@/components/site-modal';
import {FiPlus} from "react-icons/fi"
import SideBarLinks from './side-bar-links';
import CreateWebsiteForm from '@/components/form/create-website-form';
import Logo from '@/components/logo';
import { Divider } from '@nextui-org/react';


const Sidebar = async ({items}) => {
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
    <div
    className='h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white'

    >      
     <div className='flex  justify-center border-b'>
        <Logo />
    </div>
    <div className='flex flex-col w-full p-4'>
      <div className=' flex flex-col space-y-4 border-b py-4x '>
        <WebsiteSwitch 
        items={userWebsites} />
        <SiteModal
        className='p-4'
          button={'New Website'}
          header={'New Website'}
          description={<CreateWebsiteForm />}
        />
      </div>
      <Divider className='mt-8' />
      <SideBarLinks />
    </div>
    </div>
  )
}

export default Sidebar