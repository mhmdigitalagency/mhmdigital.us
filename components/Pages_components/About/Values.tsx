"use client"

import React from 'react'
import image1 from '@/public/images/icon-1-values-marketing-template.svg'
import image2 from '@/public/images/icon-2-values-marketing-template.svg'
import image3 from '@/public/images/icon-3-values-marketing-template.svg'
import image4 from '@/public/images/icon-4-values-marketing-template.svg'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { opacite } from '../../../lib/variants'

const Values = () => {
  return (
    <div className='py-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <div className='flex flex-col items-center justify-center'>
            <h5 className="text-red-500 text-xl font-semibold"> 
            Our Values
            </h5> 
            <h1 className='text-3xl md:text-[44px] text-center font-semibold leading-tight mb-10 max-w-xl'>
            What Drives Us
            </h1>
      </div>
      <motion.div 
      variants={opacite("up", 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className='mt-10 grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-8 bg-[url("/images/bg.jpeg")]'>
            <div className='bg-white py-12 px-8 rounded-3xl border
            shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]
             flex flex-col lg:flex-row items-start gap-6
             '>
                  <div className='w-full lg:w-[20%]'>
                        <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-3xl' />
                  </div>
                  <div className='w-full lg:w-[80%]'>
                        <h5 className='text-3xl font-bold mb-3'>Efficiency</h5>
                        <p className='text-lg text-gray-500'>
                        Delivering results with precision and speed.
                        </p>
                  </div>
            </div>
            <div className='bg-white py-12 px-8 rounded-3xl border
            shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]
             flex flex-col lg:flex-row items-start gap-6
             '>
                  <div className='w-full lg:w-[20%]'>
                        <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-3xl' />
                  </div>
                  <div className='w-full lg:w-[80%]'>
                        <h5 className='text-3xl font-bold mb-3'>Accountability</h5>
                        <p className='text-lg text-gray-500'>
                        Taking responsibility and ownership in every project.
                        </p>
                  </div>
            </div>
            <div className='bg-white py-12 px-8 rounded-3xl border
            shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]
             flex flex-col lg:flex-row items-start gap-6
             '>
                  <div className='w-full lg:w-[20%]'>
                        <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-3xl' />
                  </div>
                  <div className='w-full lg:w-[80%]'>
                        <h5 className='text-3xl font-bold mb-3'>Commitment</h5>
                        <p className='text-lg text-gray-500'>
                        Dedicated to achieving your goals and exceeding expectations.
                        </p>
                  </div>
            </div>
            <div className='bg-white py-12 px-8 rounded-3xl border
            shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]
             flex flex-col lg:flex-row items-start gap-6
             '>
                  <div className='w-full lg:w-[20%]'>
                        <Image src={image4} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-3xl' />
                  </div>
                  <div className='w-full lg:w-[80%]'>
                        <h5 className='text-3xl font-bold mb-3'>Team Work</h5>
                        <p className='text-lg text-gray-500'>
                        Collaborating effectively to achieve collective success.
                        </p>
                  </div>
            </div>
      </motion.div>
    </div>
  )
}

export default Values
