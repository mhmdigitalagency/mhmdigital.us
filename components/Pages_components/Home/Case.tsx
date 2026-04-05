"use client"

import React from 'react'
import image1 from '@/public/images/company-logo-agencypro-x-webflow-template.svg'
import image2 from '@/public/images/enterprise-logo-agencypro-x-webflow-template.svg'
import { ArrowRight, Minus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { opacite } from '../../../lib/variants'

const Case = () => {

      const cases = [
            {id: 1, category: "Websites", desc: "Lorem ipsum", img1: "/images/company-logo-agencypro-x-webflow-template.svg", title: "lorem.com"},
            {id: 2, category: "Logos", desc: "Lorem ipsum", img1: "/images/enterprise-logo-agencypro-x-webflow-template.svg", title: "lorem-logo"},
          ];

  return (
    <motion.div
    variants={opacite("up", 0.3)}
    initial="hidden"
    whileInView={"show"}
    viewport={{ once: false, amount: 0.2 }} 
    className='px-4 xl:px-14 py-[100px] xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <div className='flex-col flex items-start xl:flex-row xl:items-center justify-between mb-8 xl:mb-5'>
            <div className=''>
                  <div className="flex items-center gap-2"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-semibold"> 
                              Case Studies
                        </h5> 
                  </div>
                  <h2 className='text-3xl md:text-[44px] max-w-xl font-bold leading-tight mb-4'>
                  See how we drive business success.
                  </h2>
            </div>
            <div>
                  <p className='text-base md:text-xl text-gray-500 max-w-xl'>
                  Browse through our detailed examples to understand our approach and the results we've delivered.
                  </p>
            </div>
      </div>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>
      {cases.map((item) => (
            <div className='w-full' key={item.id}>
              <Card className='rounded-[50px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                <Link href={`/case-study/${item.id}`}>
                  <div>
                    <Image
                      src={item.img1}
                      alt='image1'
                      priority
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='rounded-t-[50px] w-full'
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                    className='p-10'
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <h5 className="text-red-500 text-lg font-semibold">
                        {item.category}
                      </h5> 
                    </div>
                    <h2 className='text-2xl max-w-xl font-bold leading-tight mb-3'>
                      {item.title}
                    </h2>
                    <p className='text-base md:text-lg text-gray-500 max-w-xl'>
                      {item.desc}
                    </p>
                  </motion.div>
                </Link>
              </Card>
            </div>
          ))}
      </div>
      <div className='mt-16 flex flex-col items-center justify-center'>
            <div className='flex flex-col sm:flex-row items-center gap-4'>
                  <Link href={'/contact'}>
                        <motion.div 
                        whileHover={{ y: -10, transition: {type: 'spring'} }} 
                        className='flex items-center gap-2 bg-red-500 text-white rounded-full px-12 py-6 
                        shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
                              <h5 className='font-semibold text-base md:text-[20px]'>Get in Touch</h5>
                              <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                        </motion.div>
                  </Link>
                  <Link href={'/case-studies'}>
                        <motion.div 
                        whileHover={{ y: -10, transition: {type: 'spring'} }} 
                        className=' bg-white text-red-500 rounded-full px-12 py-6  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                              <h5 className='font-semibold text-base md:text-[20px]'>Browse Case Studies</h5>
                        </motion.div>
                  </Link>
            </div>
      </div>
    </motion.div>
  )
}

export default Case
