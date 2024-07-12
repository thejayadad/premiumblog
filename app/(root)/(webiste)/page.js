import React from 'react'
import SiteModal from '@/components/site-modal';
import CreateWebsiteForm from '@/components/form/create-website-form';
import prisma from '@/lib/prisma'
import {  currentUser,} from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

const HomePage = async () => {
  const user = await currentUser()
   
  if(!user){
  redirect("/sign-in")   
  }
  const userId = user.firstName
  const website = await prisma.website.findFirst({
      where: {
          userId: userId
      }
  })
  if(website){
      redirect(`/${website.id}`)
  }


  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <h1 className='text-xl font-semibold' >Create Your First Website</h1>
      <SiteModal
        header={'Create Your First Website'}
        description={<CreateWebsiteForm />}
        button={'Click Here'}
      />
    </div>
  )
}

export default HomePage