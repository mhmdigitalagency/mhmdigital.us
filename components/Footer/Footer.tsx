"use client"

import Link from 'next/link'
import React from 'react'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'
import {motion} from 'framer-motion'
import { opacite } from '../../variants'
import Image from 'next/image'
import image1 from '@/public/images/LOGO .png'

const Footer = () => {
  return (
      <>
      <motion.div
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}>
            <hr />
            <div className='px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]
            py-[80px] flex flex-col lg:flex-row items-center justify-between gap-8'>
                  <div className='w-full lg:w-[48%]'>
                        <div className='flex items-center gap-1 w-[40%] md:w-[30%]'>
                              <Link href={'/'}>
                                    <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw'
                                    className='w-[100%]' />
                              </Link>
                        </div>
                        <p className='text-base text-gray-500 pt-6'>
                        A digital growth agency helping businesses thrive with innovative solutions tailored to your needs.
                        </p>
                  </div>
                  <div className='w-full lg:w-[52%]'>
                        <h5 className='text-xl sm:text-lg font-semibold pb-6'>Subscribe to our newsletter</h5>
                        <div className='flex items-center justify-between px-4 py-3 border rounded-full'>
                              <Input placeholder='Enter your email' className='border-none w-[70%] rounded-full text-xl placeholder:text-base' />
                              <button className='block sm:flex items-center w-[30%] gap-2 bg-red-500 text-white 
                              rounded-full px-3 sm:px-9 py-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
                                    <h5 className='font-semibold text-[10px] xs:text-[16px]'>Subscribe</h5>
                                    <ArrowRight className='text-white hidden sm:block group-hover:translate-x-2 transition-all duration-500' />
                              </button>
                        </div>
                  </div>
            </div>
      </motion.div>
      <motion.div
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }} 
      className='px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
            <hr />
            <div className='pt-[100px]'>
                  <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full pb-5'>
                        <div className='w-full'>
                              <h5 className='text-xl font-bold'>Menu</h5>
                              <div className='pt-6'>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/'}>Home</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/about'}>About</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/services'}>Services</Link>
                                    </p>
                                    {/* <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/case-studies'}>Case Studies</Link>
                                    </p> */}
                              </div>
                        </div>
                        <div className='w-full'>
                              <h5 className='text-xl font-bold'>Company</h5>
                              <div className='pt-6'>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/terms-and-conditions'}>Terms</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/privacy'}>Privacy Policy</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'https://www.linkedin.com/company/mhm-digital/'}>
                                          Carrers
                                          </Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/process'}>Our Process</Link>
                                    </p>
                              </div>
                        </div>
                        <div className='w-full'>
                              <h5 className='text-xl font-bold'>Sites</h5>
                              <div className='pt-6'>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/site-map'}>Site Map</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'https://mhmdigital.us/blog'}>Blog</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/faq'}>FAQ</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'/contact'}>Contact</Link>
                                    </p>
                              </div>
                        </div>
                        <div className='w-full'>
                              <h5 className='text-xl font-bold'>Tools</h5>
                              <div className='pt-6'>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'https://mhmdigital.io'}>Marketing Tools</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'https://mhmdigital.io/file-transfer/'}>File Transfer</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'https://mhmdigital.io/social-proof/'}>Social Proof</Link>
                                    </p>
                                    <p className='mb-3 text-base sm:text-lg text-gray-500'>
                                          <Link className='hover:underline' href={'https://mhmdigital.io/analytics/'}>Analytics</Link>
                                    </p>
                              </div>
                        </div>
                  </div>
            </div>
            <hr />
            <div className='py-[10px] flex items-center gap-1'>
                  <p>Copyright ©2024</p>
                  <Link className='text-blue-600' href={'/https://mhmdigital.agency/'}>
                        MHM Digital Agency
                  </Link>
            </div>
      </motion.div>
      </>
  )
}

export default Footer