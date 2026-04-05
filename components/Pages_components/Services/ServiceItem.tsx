"use client"

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import image1 from '@/public/images/icon-1-service-marketing-template.svg'
import {motion} from 'framer-motion'

interface Props {
      service: Services

}

interface Services {
      id: string
      description: string
      name: string
      icon: string
}

const ServiceItem = ({service}: Props) => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: {duration: 1, delay: 0.3} }}
    >
      <motion.div
      whileHover={{ scale: 1.02, transition: {type: 'spring', duration: 0.7} }}
      >
            <Link href={`/service/${service.id}`} className='flex flex-col xl:flex-row items-start gap-4 xl:gap-1 border rounded-[50px]
            bg-white px-10 py-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group h-100 lg:h-92.5 xl:h-70'>
                  <div className='w-[40%]'>
                        {/* <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='rounded-3xl' /> */}
                        <img src={service.icon} alt="image-service" className='rounded-3xl' />
                  </div>
                  <div className='w-full'>
                        <h4 className='text-3xl font-bold mb-3'>{service.name || 'Default name'}</h4>
                        <p className='text-[17.5px] font-semibold text-gray-500 mb-5 leading-7'>
                              {service.description 
                              ? `${service.description.substring(0, 50)}${service.description.length > 50 ? '...' : ''}` 
                              : 'Lorem ipsum'}
                        </p>
                        <h5 className='flex items-center gap-2 text-lg font-bold group-hover:text-red-500 transition-all duration-300'>
                              Learn More
                              <ArrowRight size={18} className='group-hover:text-red-500 group-hover:translate-x-2
                              transition-all duration-300' />
                        </h5>
                  </div>
            </Link>
      </motion.div>
      
    </motion.div>
  )
}

export default ServiceItem
