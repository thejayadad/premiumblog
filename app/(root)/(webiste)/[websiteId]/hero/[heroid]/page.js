import prisma from '@/lib/prisma'
import React from 'react'
import HeroClient from '../_components/hero/hero-client'

const HeroPage = async ({params}) => {
    console.log("heropage new " + params.herId)
    const heroId = params.heroId

    const hero = await prisma.hero.findFirst({
        where: {
            websiteId: heroId
        }
    })
  return (
    <section className='flex max-w-screen-lg mx-auto flex-col'>
        <div className='flex-1 space-y-4 w-full p-8 pt-6'>
            Existing Hero: {hero?.label}  ID: {hero?.id} IMAGE: {hero?.imageUrl}
           <HeroClient
           id={hero.id}
           initialData={hero}
           />
        </div>
    </section>
  )
}

export default HeroPage