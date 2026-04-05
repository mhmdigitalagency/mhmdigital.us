"use client"

import React from 'react'
import image1 from '@/public/images/image-4-team-marketing-template-p-500.jpeg'
import image2 from '@/public/images/image-5-team-marketing-template-p-500.jpeg'
import image3 from '@/public/images/image-6-team-marketing-template-p-500.jpeg'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import {motion} from 'framer-motion'
import { opacite } from '../../../lib/variants'

const Team = () => {
  return (
    <div className='py-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <div className='flex flex-col items-center justify-center'>
            <h5 className="text-red-500 text-xl font-semibold"> 
            Our Team
            </h5> 
            <h1 className='text-3xl md:text-[44px] text-center font-semibold leading-tight mb-10 max-w-xl'>
            The amazing team behind Mhm Digital
            </h1>
      </div>
      <motion.div 
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }} 
      className='mt-28 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-8'>
            
            <div className='bg-white px-8 py-10 rounded-3xl relative shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'>
                  <div className='absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-full w-full' />
                  </div>
                  <div className='pt-24 flex flex-col items-center justify-center'>
                        <Link href={''} className='text-center'>
                              <h4 className='text-2xl font-bold mb-2'>Jhon Carter</h4>
                              <h5 className='text-xl text-red-500 mb-4'>CEO & Co-Founder of Agencypro</h5>
                              <p className='text-center text-lg text-gray-500'>
                                    Lorem ipsum consectetur amet sit comeneer ilremsolme 
                                    dolce issilmolil olme diment solem ipum adolem.
                              </p>
                        </Link>
                        <div className='mt-6 flex items-center gap-5'>
                              <span className='rounded-full p-3 bg-blue-500 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaFacebook className='text-white' />
                              </span>
                              <span className='rounded-full p-3 bg-blue-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaTwitter className='text-white' />
                              </span>
                              <span className='rounded-full p-3 bg-blue-500 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaLinkedin className='text-white' />
                              </span>
                        </div>
                  </div>
            </div>
            
            
            <div className='bg-white px-8 py-10 rounded-3xl relative shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mt-[150px] md:mt-0'>
                  <div className='absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-full w-full' />
                  </div>
                  <div className='pt-24 flex flex-col items-center justify-center'>
                        <Link href={''} className='text-center'>
                              <h4 className='text-2xl font-bold mb-2'>Jhon Carter</h4>
                              <h5 className='text-xl text-red-500 mb-4'>CEO & Co-Founder of Agencypro</h5>
                              <p className='text-center text-lg text-gray-500'>
                                    Lorem ipsum consectetur amet sit comeneer ilremsolme 
                                    dolce issilmolil olme diment solem ipum adolem.
                              </p>
                        </Link>
                        <div className='mt-6 flex items-center gap-5'>
                              <span className='rounded-full p-3 bg-blue-500 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaFacebook className='text-white' />
                              </span>
                              <span className='rounded-full p-3 bg-blue-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaTwitter className='text-white' />
                              </span>
                              <span className='rounded-full p-3 bg-blue-500 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaLinkedin className='text-white' />
                              </span>
                        </div>
                  </div>
            </div>
            
            
            <div className='bg-white px-8 py-10 rounded-3xl relative shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mt-[150px] xl:mt-0'>
                  <div className='absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-full w-full' />
                  </div>
                  <div className='pt-24 flex flex-col items-center justify-center'>
                        <Link href={''} className='text-center'>
                              <h4 className='text-2xl font-bold mb-2'>Jhon Carter</h4>
                              <h5 className='text-xl text-red-500 mb-4'>CEO & Co-Founder of Agencypro</h5>
                              <p className='text-center text-lg text-gray-500'>
                                    Lorem ipsum consectetur amet sit comeneer ilremsolme 
                                    dolce issilmolil olme diment solem ipum adolem.
                              </p>
                        </Link>
                        <div className='mt-6 flex items-center gap-5'>
                              <span className='rounded-full p-3 bg-blue-500 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaFacebook className='text-white' />
                              </span>
                              <span className='rounded-full p-3 bg-blue-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaTwitter className='text-white' />
                              </span>
                              <span className='rounded-full p-3 bg-blue-500 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
                                    <FaLinkedin className='text-white' />
                              </span>
                        </div>
                  </div>
            </div>
            
      </motion.div>
            <div className='mt-16 flex flex-col items-center justify-center'>
                  <Link href={''}>
                        <motion.button
                        whileHover={{ y: -10, transition: {type: 'spring'} }}  
                        className='flex items-center gap-2 bg-red-500 text-white 
                        rounded-full px-10 py-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
                              <h5 className='font-semibold text-[20px]'>Join Our Team</h5>
                              <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                        </motion.button>
                  </Link>
            </div>
    </div>
  )
}

export default Team
