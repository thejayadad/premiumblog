'use client'
import HeadingText from '@/components/heading-text'
import { Button, Divider } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import HeroList from './hero-list'

const HeroSection = ({data}) => {
  console.log("Data " + data)
    const router = useRouter()
    const params = useParams()
  return (
    <div>
        <div className='flex items-center justify-between'>
        <HeadingText
        title={` Hero Banners (${data.length})` }
        description={"Update your hero section below"}
        />
        <Button 
        isIconOnly color="success"
        className='text-white' 
        onClick={() => router.push(`/${params.websiteId}/hero/new`)}>
          <FiPlusCircle className='h-4 w-4' />
        </Button>
    </div>
    <Divider className='mb-8 mt-8' />
      <HeroList data={data} />
    </div>
  )
}

export default HeroSection