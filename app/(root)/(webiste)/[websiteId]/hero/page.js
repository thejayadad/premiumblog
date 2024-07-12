import React from 'react'
import HeroSection from './_components/hero-section'
import prisma from '@/lib/prisma'

const HeroPage = async ({params}) => {
  console.log("heropage " + params.websiteId)
  const heroId = params.websiteId
  const heroPages = await prisma.hero.findMany({})
  return (
    <section className='flex max-w-screen-lg mx-auto flex-col'>
        <div className='flex-1 space-y-4 w-full p-8 pt-6'>
            <HeroSection data={heroPages} />
        </div>
    </section>
  )
}

export default HeroPage