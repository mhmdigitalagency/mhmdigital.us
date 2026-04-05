"use client"

import React from 'react'
import {motion} from 'framer-motion'
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'

const ContactButton = () => {
  return (
    <>
      <Link href={'/contact'} className='hidden xl:block group'>
            <motion.button 
            whileHover={{ y: -8, transition: {type: 'spring'} }}
            className='flex items-center gap-2
            bg-red-500 text-white
            rounded-full px-6 py-4.5
            shadow-[rgba(13,38,76,0.19)_0px_9px_20px] cursor-pointer'>
                  <h5 className='font-semibold text-base'>Get in Touch</h5>
                  <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
            </motion.button>
      </Link>
    </>
  )
}

export default ContactButton
