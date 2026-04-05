"use client"

import React from 'react'
import image1 from '@/public/images/thumbnail-image-5-blog-marketing-template-p-1080.jpeg'
import image2 from '@/public/images/thumbnail-image-6-blog-marketing-template-p-1080.jpeg'
import { Minus, Search, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { opacite } from '../../../lib/variants'

const Blog = () => {
  return (
    <motion.div
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }} 
    className='px-4 xl:px-14 py-[150px] xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 lg:mb-3'>
            <div className=''>
                  <div className="flex items-end gap-2"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-semibold"> 
                              Blog & News
                        </h5> 
                  </div>
                  <h2 className='text-[32px] sm:text-[44px] max-w-xl font-semibold leading-tight mb-4'>
                        Browse our articles on marketing and growth
                  </h2>
            </div>
            <div>
                  <Link href={''}>
                        <motion.button
                        whileHover={{ y: -10, transition: {type: 'spring'} }} 
                        className=' bg-white text-red-500 rounded-full px-10 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                              <h5 className='font-semibold text-base md:text-[20px]'>Browse Articles</h5>
                        </motion.button>
                  </Link>
            </div>
      </div>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-10'>
            <div className='w-full'>
                  <Card className='rounded-[50px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <Link href={''}>
                              <div className='p-7'>
                              <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                                    className='rounded-[50px]' />
                              </div>
                              <div className='px-7 pt-5 pb-16 relative'>
                                    <div className="bg-red-500 flex items-center gap-2 absolute rounded-full -top-12 left-20 px-4 py-2">
                                          <Search className='text-white' />
                                          <h5 className="text-white text-xl font-semibold"> 
                                                SEO
                                          </h5> 
                                    </div>
                                    <h2 className='text-lg md:text-2xl max-w-xl font-bold leading-tight mb-3'>
                                    5 SEO factors to consider for your website to rank better
                                    </h2>
                                    <p className='text-base md:text-xl text-gray-500 max-w-xl'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Phasellus mi pharetra mauris nulla purus facilisis cras posuere...
                                    </p>
                              </div>
                        </Link>
                  </Card>
            </div>
            <div className='w-full'>
                  <Card className='rounded-[50px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
                        <Link href={''}>
                              <div className='p-7'>
                              <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                                    className='rounded-[50px]' />
                              </div>
                              <div className='px-7 pt-5 pb-16 relative'>
                                    <div className="bg-blue-600 flex items-center gap-2 absolute rounded-full -top-12 left-20 px-4 py-2">
                                          <TrendingUp className='text-white' />
                                          <h5 className="text-white text-lg font-semibold"> 
                                          Growth
                                          </h5> 
                                    </div>
                                    <h2 className='text-2xl max-w-xl font-bold leading-tight mb-3'>
                                    What is growth hacking and how to apply it to your startup
                                    </h2>
                                    <p className='text-xl text-gray-500 max-w-xl'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Phasellus mi pharetra mauris nulla purus facilisis cras posuere...
                                    </p>
                              </div>
                        </Link>
                  </Card>
            </div>
      </div>
    </motion.div>
  )
}

export default Blog
