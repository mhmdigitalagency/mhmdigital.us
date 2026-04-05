"use client"

import { ArrowRight, Minus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import image1 from '@/public/images/icon-1-service-marketing-template.svg'
import image2 from '@/public/images/image-1-service-hero-marketing-template.svg'
import {motion} from 'framer-motion'
import Link from 'next/link'

interface Props {
      service: Services

}

interface Services {
      id: string
      description: string
      name: string
      icon: string
}

const Service = ({service}: Props) => {
  return (
    <>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: {duration: 1, delay: 0.3} }} 
      className='flex-col xl:flex-row flex items-start justify-between gap-10'>
            <div className='flex flex-col items-center justify-center w-full gap-8 mt-16 xl:items-start xl:w-[50%]'>
                  <div className="flex items-center gap-2"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-bold"> 
                              Service
                        </h5> 
                  </div>
                  <div className='flex items-center gap-5 flex-wrap'>
                        <h2 className='text-3xl md:text-[50px] max-w-md md:max-w-xl font-bold leading-tight'>
                              {service.name || 'Default name'}
                        </h2>
                        {/* <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='rounded-3xl' /> */}
                        <img src={service.icon} alt="image-service" className='rounded-3xl' />
                  </div>
                  <p className='text-lg text-center xl:text-left text-gray-500 font-semibold leading-9'>
                        {service.description || 'Default description'}
                  </p>
                  <div className='flex flex-col justify-center gap-5 sm:flex sm:flex-row sm:justify-start items-center sm:gap-4 mt-6'>
                        <Link href={'/contact'}>
                              <motion.button 
                              whileHover={{ y: -10, transition: {type: 'spring'} }}
                              className='flex items-center gap-2 bg-red-500 text-white rounded-full px-10 py-5 
                              shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group cursor-pointer'>
                                    <h5 className='font-semibold text-[17px]'>Contact us</h5>
                                    <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                              </motion.button>
                        </Link>
                        <Link href={'/services'}>
                              <motion.button
                               whileHover={{ y: -10, transition: {type: 'spring'} }} 
                              className='border bg-white text-red-500 rounded-full px-10 py-5 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] cursor-pointer'>
                                    <h5 className='font-semibold text-[17px]'>Browse Services</h5>
                              </motion.button>
                        </Link>
                  </div>
            </div>
            <div className='m-auto w-[50%] flex flex-col justify-center items-center xl:block'>
                  <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='w-full' />
            </div>
      </motion.div>
    </>
  )
}

export default Service
