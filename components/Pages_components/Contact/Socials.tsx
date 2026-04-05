"use client"

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link'
import React from 'react'
import {motion} from 'framer-motion'
import { fadeIn } from '../../../lib/variants'

const Socials = () => {
  return (
      <div className='pb-25 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <div className='flex flex-col items-center justify-center'>
                  <h5 className="text-red-500 text-xl font-semibold">               
                        Follow Us
                  </h5> 
                  <h2 className='text-3xl md:text-[45px] font-semibold leading-tight mb-4 text-center max-w-2xl'>
                        Follow us for great content on growth marketing
                  </h2>
                  <div className='grid grid-cols-3 grid-rows-3 xs:grid-rows-2 md:grid-cols-5 md:grid-rows-1 gap-10 mt-10'>
                        <motion.div
                        variants={fadeIn("up", 0.3)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.2 }} 
                        className='rounded-3xl bg-blue-500 p-7 shadow-[rgba(13,38,76,0.19)_0px_9px_20px]'>
                              <Link href={'https://www.linkedin.com/company/mhm-digital/'} target='_blank'>
                                    <FaLinkedin size={42} className='text-white' />
                              </Link>
                        </motion.div>
                        <motion.div 
                        variants={fadeIn("up", 0.7)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.2 }} 
                        className='rounded-3xl bg-blue-600 p-7 shadow-[rgba(13,38,76,0.19)_0px_9px_20px]'>
                              <Link href={'https://www.facebook.com/mhmdigital.agency'} target='_blank'>
                                    <FaFacebook size={42} className='text-white' />
                              </Link>
                        </motion.div>
                        <motion.div 
                        variants={fadeIn("up", 1.1)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.2 }}
                        className='rounded-3xl bg-black p-7 shadow-[rgba(13,38,76,0.19)_0px_9px_20px]'>
                              <Link href={'https://x.com/mhm_digital'} target='_blank'>
                                    <FaXTwitter size={42} className='text-white' />
                              </Link>
                        </motion.div>
                        <motion.div
                        variants={fadeIn("up", 1.5)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.2 }} 
                        className='rounded-3xl bg-yellow-300 p-7 shadow-[rgba(13,38,76,0.19)_0px_9px_20px]'>
                              <Link href={'http://wa.me/12067710038'} target='_blank'>
                                    <FaWhatsapp size={42} className='text-white' />
                              </Link>
                        </motion.div>
                        <motion.div
                        variants={fadeIn("up", 1.9)}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: false, amount: 0.2 }} 
                        className='rounded-3xl p-7 bg-linear-to-b from-[#833ab4] to-[#fd1d1d] via-[#fcb045]
                        shadow-[rgba(13,38,76,0.19)_0px_9px_20px]'>
                              <Link href={'https://www.instagram.com/mhmdigital/'} target='_blank'>
                                    <FaInstagram size={42} className='text-white' />
                              </Link>
                        </motion.div>
                  </div>
            </div>
      </div>
  )
}

export default Socials