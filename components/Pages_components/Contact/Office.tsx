"use client"

import { Minus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'
import { opacite, fadeIn } from '../../../lib/variants'

const Office = () => {
  return (
    <div className='bg-[#e1dfe23c] py-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <motion.div 
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }} 
      className='flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10'>
            <div className='w-full xl:w-[52%]'>
                  <div className="flex items-end gap-2"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-semibold">               
                        Our Offices
                        </h5> 
                  </div>
                  <h2 className='text-3xl md:text-[45px] max-w-xl font-bold leading-tight mb-4'>
                  Come and visit one of our offices over the world
                  </h2>
            </div>
            <div className='w-full xl:w-[48%]'>
                  <p className='text-lg text-gray-500'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Curabitur id neque, malesuada sapien dictum lacinia sed 
                  tellus integer. Ante phasellus morbi id sollicitudin odio amet.
                  </p>
            </div>
      </motion.div>
      <motion.div 
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.5 }} 
      className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            <div className='bg-white p-5 rounded-3xl
             shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
             flex flex-col lg:flex-row items-start gap-5
             '>
                  <div>
                        <h4 className='w-10 h-6 bg-red-500 p-4 rounded'></h4>
                  </div>
                  <div>
                        <h5 className='text-xl font-bold mb-2'>San Fransisco, USA</h5>
                        <p className='text-lg text-gray-400 mb-2'>1650 Page. San Francisco, California(CA), 94117</p>
                        <p className='text-lg text-red-400 mb-2'>(415) 203 - 7468</p>
                        <Link href={''} className='text-base text-red-400'>sanfrancisco@agencypro.com</Link>
                  </div>
            </div>
            <div className='bg-white p-5 rounded-3xl
             shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
             flex flex-col lg:flex-row items-start gap-5
             '>
                  <div>
                        <h4 className='w-10 h-6 bg-red-500 p-4 rounded'></h4>
                  </div>
                  <div>
                        <h5 className='text-xl font-bold mb-2'>San Fransisco, USA</h5>
                        <p className='text-lg text-gray-400 mb-2'>1650 Page. San Francisco, California(CA), 94117</p>
                        <p className='text-lg text-red-400 mb-2'>(415) 203 - 7468</p>
                        <Link href={''} className='text-base text-red-400'>sanfrancisco@agencypro.com</Link>
                  </div>
            </div>
            <div className='bg-white p-5 rounded-3xl
             shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
             flex flex-col lg:flex-row items-start gap-5
             '>
                  <div>
                        <h4 className='w-10 h-6 bg-red-500 p-4 rounded'></h4>
                  </div>
                  <div>
                        <h5 className='text-xl font-bold mb-2'>San Fransisco, USA</h5>
                        <p className='text-lg text-gray-400 mb-2'>1650 Page. San Francisco, California(CA), 94117</p>
                        <p className='text-lg text-red-400 mb-2'>(415) 203 - 7468</p>
                        <Link href={''} className='text-base text-red-400'>sanfrancisco@agencypro.com</Link>
                  </div>
            </div>
      </motion.div>
    </div>
  )
}

export default Office