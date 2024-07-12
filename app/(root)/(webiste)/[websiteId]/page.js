import prisma from '@/lib/prisma';
import React from 'react'

const Dashboard = async ({params}) => {
  // Destructure 'id' from 'params'
  console.log("Params " + params.websiteId)
  const maybeId = await params.websiteId;
  

  // Log to verify the value of 'id'
  console.log("Website ID:", maybeId);
 const website = await prisma.website.findFirst({
    where: {
      id: maybeId
    }
 })
  return (
    <section className='flex max-w-screen-lg mx-auto flex-col'>
        <div className='flex-1 space-y-4 w-full p-8 pt-6'>
        
      </div>
    </section>
  )
}

export default Dashboard