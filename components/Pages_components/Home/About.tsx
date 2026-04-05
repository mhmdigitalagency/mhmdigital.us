"use client"

import { ArrowRight, Minus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import image1 from '@/public/images/image-1-home-about-marketing-template.svg'
import image2 from '@/public/images/image-2-home-about-marketing-template.svg'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { fadeIn } from '@/lib/variants'

const 
About = () => {
  return (
      <div className='pb-[200px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
            <hr />
            <div className='pt-[100px]'>
                  <motion.div
                  variants={fadeIn("up", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.5 }} 
                  className='flex-col xl:flex-row flex items-center justify-between gap-10'>
                        <div className='mt-[0px] w-full xl:w-[45%] flex flex-col justify-center items-center xl:block'>
                              <div className="flex items-center gap-2 mb-3"> 
                                    <Minus className='text-red-500' />
                                    <h5 className="text-red-500 text-[18px] font-extrabold"> 
                                          About Us
                                    </h5> 
                              </div>
                              <h2 className='text-3xl md:text-[40px] max-w-xl font-bold leading-tight mb-4 text-center xl:text-left lg:max-w-lg'>
                              Your dedicated partner in driving marketing success
                              </h2>
                              <p className='text-lg font-semibold text-gray-500 xl:max-w-xl text-center xl:text-left max-w-2xl leading-relaxed'>
                              We function as an extension of your marketing team, seamlessly integrating 
                              our expertise to amplify your brand’s impact. Our approach is rooted in 
                              collaboration, delivering personalized strategies that align with your business goals. 
                              With a passion for innovation and a commitment to results, we help you grow, evolve, 
                              and lead in your industry.
                              </p>
                              <div className='mt-10'>
                                    <Link href={'/about'}>
                                          <motion.button 
                                          whileHover={{ y: -10, transition: {type: 'spring'} }}
                                          className='flex items-center gap-2 bg-red-500 text-white rounded-full px-7 py-5 
                                          shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
                                                <h5 className='font-semibold text-[17px]'>About Us</h5>
                                                <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                                          </motion.button>
                                    </Link>
                              </div>
                        </div>
                        <div className="relative w-[40%]">
                              <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' className='w-full' />
                              <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' className='absolute left-0 lg:-left-[7.5rem] top-[20px] xl:top-[50px] xl:w-[50%] w-[50%]' />
                        </div>
                  </motion.div>
            </div>
      </div>
  )
}

export default 
About