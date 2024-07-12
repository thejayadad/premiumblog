import React from 'react'
import {  currentUser,} from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import SettingsForm from './_components/settings-form';

const SettingsPage = async ({params}) => {
    const user = await currentUser()
    const websiteId = params.websiteId

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
    if(!website){
        redirect('/')
    }
  return (
    <section className='flex max-w-screen-lg mx-auto flex-col'>
        <div className='flex-1 space-y-4 w-full p-8 pt-6'>
          <SettingsForm initialData={website} />
        </div>
    </section>
  )
}

export default SettingsPage