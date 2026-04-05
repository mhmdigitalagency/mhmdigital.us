"use client"

// import React from 'react'
// import { ArrowRight, Minus } from 'lucide-react';
// import Link from 'next/link';
// import {motion} from 'framer-motion'
// import { fadeIn,opacite } from '../../../variants'

// const Banner = () => {
//   return (
//     <motion.div 
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1, transition: {duration: 2, delay: 0.5} }}
//     className='pb-[150px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
//       <div className='mt-24 flex flex-col justify-center items-center'>
//             <motion.div 
//             variants={opacite("up", 0.5)}
//             initial="hidden"
//             whileInView={"show"}
//             viewport={{ once: false, amount: 0.7 }}
//             className='w-full flex items-center flex-col justify-center'>
//                   <div className="flex items-center gap-2 mb-3"> 
//                         <Minus className='text-red-500' />
//                         <h5 className="text-red-500 text-lg font-bold"> 
//                         Digital Growth Agency
//                         </h5> 
//                   </div>
//                   <h1 className='text-[40px] sm:text-[64px] font-bold leading-tight mb-3 text-center max-w-3xl'>
//                   We help startups grow to the next level
//                   </h1>
//                   <p className='text-base font-semibold text-gray-500 text-center max-w-md lg:max-w-lg'>
//                         Lorem ipsum consectetur amet dolor sit comeneer ilrems dolce issilm acalrm leoinsion duycoqun cons.
//                   </p>
//                   <div className='flex flex-col justify-center gap-5 sm:flex sm:flex-row sm:justify-start items-center sm:gap-4 mt-10'>
//                         <Link href={'/contact'}>
//                               <motion.button 
//                               whileHover={{ y: -10, transition: {type: 'spring'} }}
//                               className='flex items-center gap-2 bg-red-500 text-white rounded-full px-10 py-5 
//                               shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
//                                     <h5 className='font-semibold text-[17px]'>Get in Touch</h5>
//                                     <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
//                               </motion.button>
//                         </Link>
//                         <Link href={'/services'}>
//                               <motion.button
//                                whileHover={{ y: -10, transition: {type: 'spring'} }} 
//                               className=' bg-white text-red-500 rounded-full px-10 py-5 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
//                                     <h5 className='font-semibold text-[17px]'>Browse Services</h5>
//                               </motion.button>
//                         </Link>
//                   </div>
//             </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// export default Banner

import React from 'react'
import { ArrowRight, Minus } from 'lucide-react';
import Link from 'next/link';
import {motion} from 'framer-motion'
import { fadeIn,opacite } from '../../../lib/variants'

const Banner = () => {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: {duration: 2, delay: 0.5} }}
    className='pb-25 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
      <div 
      className="mt-10 flex flex-col justify-center items-center bg-[url('/images/banner.jpeg')] relative bg-no-repeat bg-cover z-0 rounded-[30px] overflow-hidden">
            <motion.div
            className='w-full flex items-center flex-col justify-center relative top-0 left-0 h-full z-10 bg-black/50 py-24 px-5'>
                  <div className="flex items-center gap-2 mb-3"> 
                        <Minus className='text-white' />
                        <h5 className="text-white text-lg font-bold"> 
                        Digital Growth Agency
                        </h5> 
                  </div>
                  <h1 className='text-[40px] sm:text-[64px] text-white font-bold leading-tight mb-3 text-center '>
                  We Help startups & businesses grow.
                  </h1>
                  <p className='text-base font-semibold text-slate-200 text-center max-w-md lg:max-w-xl'>
                  We drive your success with tailored strategies, innovative designs, and cutting-edge digital 
                  solutions to elevate your brand.
                  </p>
                  <div className='flex flex-col justify-center gap-5 sm:flex sm:flex-row sm:justify-start items-center sm:gap-4 mt-10'>
                        <Link href={'/contact'}>
                              <motion.button 
                              whileHover={{ y: -10, transition: {type: 'spring'} }}
                              className='flex items-center gap-2 bg-red-500 text-white rounded-full px-10 py-5 
                              shadow-[rgba(13,38,76,0.19)_0px_9px_20px] group cursor-pointer'>
                                    <h5 className='font-semibold text-[17px]'>Get in Touch</h5>
                                    <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                              </motion.button>
                        </Link>
                        <Link href={'/services'}>
                              <motion.button
                               whileHover={{ y: -10, transition: {type: 'spring'} }} 
                              className='bg-white text-red-500 rounded-full px-10 py-5 shadow-[rgba(13,38,76,0.19)_0px_9px_20px] cursor-pointer'>
                                    <h5 className='font-semibold text-[17px]'>Browse Services</h5>
                              </motion.button>
                        </Link>
                  </div>
            </motion.div>
      </div>
    </motion.div>
  )
}

export default Banner