"use client"

import React from 'react'
import image1 from '@/public/images/image-1-home-advantage-marketing-template.svg'
import image2 from '@/public/images/image-2-home-advantage-marketing-template.svg'
import Image from 'next/image'
import { ArrowRight, Check, Minus } from 'lucide-react'
import Link from 'next/link'
import {motion} from 'framer-motion'
import { opacite } from '../../../lib/variants'

const Why = () => {
  return (
    <div className='pb-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%] pt-[150px] xl:pt-0'>
      <motion.div 
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className='flex-col xl:flex-row flex items-center justify-between gap-0 xl:gap-10'>
            <div className="relative bg-[url('/images/bg.jpeg')] w-[40%]">
                  <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' className='w-[90%] -mt-20' />
                  <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' className=' absolute left-[0px] top-[20px] xl:left-[80px] xl:top-[40px]' />
            </div>
            <div className='w-full xl:w-[45%] flex flex-col justify-center items-center xl:block mt-[200px]'>
                  <div className="flex items-center gap-2 mb-3"> 
                        <Minus className='text-red-500' />
                        <h5 className=" text-red-500 text-[18px] font-extrabold"> 
                        Why Choose MHM Digital?
                        </h5> 
                  </div>
                  <h2 className='text-3xl md:text-[44px] max-w-xl font-bold leading-snug mb-4 text-center xl:text-left lg:max-w-lg'>
                  Why work with us?
                  </h2>
                  <p className='text-lg text-gray-500 max-w-xl text-center xl:text-left'>
                  We transform your vision into reality, with strategies focused on elevating your brand and driving measurable success.
                  </p>
                  <div className='mt-8 flex items-center gap-4'>
                        <span className='w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center'>
                              <Check />
                        </span>
                        <h5 className='text-xl font-medium'>Expert team dedicated to your growth</h5>
                  </div>
                  <div className='mt-4 flex items-center gap-4'>
                        <span className='w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center'>
                              <Check />
                        </span>
                        <h5 className='text-xl font-medium'>7+ years of experience</h5>
                  </div>
                  <div className='mt-4 flex items-center gap-4'>
                        <span className='w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center'>
                              <Check />
                        </span>
                        <h5 className='text-xl font-medium'>Proven success, guaranteed to deliver results</h5>
                  </div>
                  <div className='mt-10'>
                        <Link href={'/contact'}>
                              <motion.button 
                              whileHover={{ y: -10, transition: {type: 'spring'} }}
                              className='flex items-center gap-2 bg-red-500 text-white rounded-full px-7 py-5 
                              shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
                                    <h5 className='font-semibold text-[17px]'>Get in Touch</h5>
                                    <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                              </motion.button>
                        </Link>
                  </div>
            </div>
      </motion.div>
    </div>
  )
}

export default Why
