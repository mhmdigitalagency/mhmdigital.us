"use client"

import React from 'react'
import image1 from '@/public/images/image-1-about-mission-marketing-template.jpg'
import image2 from '@/public/images/image-2-about-mission-marketing-template.jpg'
import { Minus } from 'lucide-react'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { opacite, fadeIn } from '../../../lib/variants'

const Mission = () => {
  return (
    <div className='pt-[100px] pb-[300px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <motion.div 
      variants={opacite("up", 0.5)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className='flex flex-col xl:flex-row items-center gap-28 justify-between'>
            <div className='w-full flex flex-col items-center justify-center xl:block xl:w-[50%]'>
                  <div className="flex items-center gap-2 mb-3"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-semibold"> 
                              Our Mission
                        </h5> 
                  </div>
                  <h1 className='text-3xl md:text-[44px] text-center xl:text-left font-bold leading-tight mb-10 max-w-xl'>
                  Empowering Startups to Succeed
                  </h1>
                  <p className='text-lg xl:text-[18px] font-medium text-center xl:text-left text-gray-500 mb-10 max-w-2xl'>
                  Our mission is to help startups and businesses reach their full potential. We create tailored marketing strategies that drive growth and deliver measurable results, aligning our efforts with your unique goals.
                  </p>
                  <p className='text-lg xl:text-[18px] font-medium text-center xl:text-left text-gray-500 max-w-2xl'>
                  We’re committed to leveraging innovative solutions and data-driven insights to support your success. As your trusted partner, we provide the expertise needed to navigate the market and achieve your objectives.
                  </p>
            </div>
            <motion.div 
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }} 
            className="w-[80%] lg:w-[50%] relative">
                  <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='w-[450px] rounded-[50px]
                        shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]' />
                  <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                        className='w-[450px] rounded-[50px] object-cover absolute right-0 top-[330px]
                        shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]' />
            </motion.div>
      </motion.div>
    </div>
  )
}

export default Mission
