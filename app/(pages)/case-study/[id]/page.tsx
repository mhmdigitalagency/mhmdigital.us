"use client"

import React from 'react'
import { ArrowRight, Minus } from 'lucide-react';
import {motion} from 'framer-motion'
import Image from 'next/image'
import image2 from '@/public/images/enterprise-logo-agencypro-x-webflow-template.svg'
import image3 from '@/public/images/image-project-overview-marketing-template.svg'
import Link from 'next/link';
import Banner from '@/components/Pages_components/Services/Banner';

const page = () => {
  return (
      // <div className='mt-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      //       <motion.div
      //       initial={{ opacity: 0 }}
      //       animate={{ opacity: 1, transition: {duration: 2, delay: 0.5} }}
      //       className='mb-24'
      //       >
      //             <div
      //             className='w-full xl:w-[60%] flex items-center flex-col justify-center xl:block'>
      //                   <div className="flex items-center gap-2 mb-3"> 
      //                         <Minus className='text-red-500' />
      //                         <h5 className="text-red-500 text-xl font-semibold"> 
      //                         Enterprise
      //                         </h5> 
      //                   </div>
      //                   <h1 className='text-[40px] sm:text-[62px] font-bold leading-tight mb-3 text-center xl:text-left max-w-xl lg:max-w-4xl'>
      //                   How we scalated 12 positions on Enterprise App Store rankings
      //                   </h1>
      //                   <p className='text-base font-semibold text-gray-500 text-center xl:text-left max-w-md lg:max-w-lg'>
      //                   Lorem ipsum consectetur amet dolor sit comeneer lomeipmil ilremsilom dolce issilm acalrm leoinsion duycoqun.
      //                   </p>
      //             </div>
      //       </motion.div>
      //       <div className='border-t py-20'>
      //             <div className='flex items-center md:justify-between gap-6 flex-wrap'>
      //                   <div>
      //                         <p className='font-bold mb-1 md:mb-4 text-[18px]'>Services</p>
      //                         <h3 className='text-gray-400 font-normal'>Paid Adversiting</h3>
      //                   </div>
      //                   <div>
      //                         <p className='font-bold mb-1 md:mb-4 text-[18px]'>Platforms</p>
      //                         <h3 className='text-gray-400 font-normal'>Facebook Creators</h3>
      //                   </div>
      //                   <div>
      //                         <p className='font-bold mb-1 md:mb-4 text-[18px]'>Project Timeline</p>
      //                         <h3 className='text-gray-400 font-normal'>2020 - 2021</h3>
      //                   </div>
      //                   <div>
      //                         <p className='font-bold mb-1 md:mb-4 text-[18px]'>Website</p>
      //                         <h3 className='text-gray-400 font-normal'>facebook.com</h3>
      //                   </div>
      //                   <div>
      //                         <p className='font-bold mb-1 md:mb-4 text-[18px]'>Increased in ROI revenue</p>
      //                         <h3 className='text-red-500 font-semibold'>56%</h3>
      //                   </div>
      //             </div>
      //       </div>
      //       <div className='mt-[50px]'>
      //             <div>
      //                   <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
      //                   className='rounded-[50px] w-full' />
      //             </div>
      //       </div>
      //       <div className='mt-[100px] mb-[150px]'>
      //             <div className='bg-white shadow-md w-[90%] md:w-[80%] lg:w-[70%] mx-auto rounded-[40px] px-6 md:px-10 lg:px-16 pt-24 pb-10'>
      //                   <div className='mb-[100px]'>
      //                         <h2 className='text-[30px] sm:text-[40px] font-bold'>Project Overview</h2>
      //                         <p className='text-base md:text-[18px] leading-8 font-semibold text-gray-500 mt-10'>
      //                               Proin sed libero enim sed faucibus turpis in. Nisi est sit amet facilisis. 
      //                               Venenatis cras sed felis eget velit. A erat nam at lectus urna duis convallis. 
      //                               Cras ornare arcu dui vivamus arcu felis. Viverra ipsum nunc aliquet bibendum enim 
      //                               facilisis gravida.
      //                         </p>

      //                         <p className='text-base md:text-[18px] leading-8 font-semibold text-gray-500 mt-10'>      
      //                               Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Et netus et malesuada 
      //                               fames. Vel orci porta non pulvinar neque laoreet suspendisse. Malesuada fames ac 
      //                               turpis egestas maecenas pharetra convallis.
      //                         </p>
      //                         <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' 
      //                         className='rounded-[50px] w-full mt-10' />
      //                   </div>
      //                   <hr />
      //                   <div className='mb-[100px] mt-[100px]'>
      //                         <h2 className='text-[30px] sm:text-[40px] font-bold'>Results</h2>
      //                         <p className='text-base md:text-[18px] leading-8 font-semibold text-gray-500 mt-10 mb-20'>
      //                               Aliquam id diam maecenas ultricies mi eget mauris pharetra. 
      //                               Mauris commodo quis imperdiet massa tincidunt nunc. Odio ut 
      //                               sem nulla pharetra diam sit. Interdum posuere lorem ipsum dolor 
      //                               sit amet consectetur adipiscing elit. Dignissim enim sit amet 
      //                               venenatis urna cursus eget.
      //                         </p>
      //                         <Link href={'/contact'}>
      //                               <motion.button 
      //                               whileHover={{ y: -10, transition: {type: 'spring'} }}
      //                               className='flex items-center gap-2 bg-red-500 text-white rounded-full px-10 py-5 
      //                               shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
      //                                     <h5 className='font-semibold text-[17px]'>Request a quote</h5>
      //                                     <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
      //                               </motion.button>
      //                         </Link>
      //                   </div>
      //             </div>
      //       </div>
      //       <Banner />
      // </div>
      <div className='mt-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
            <h2>Coming soon</h2>
      </div>
  )
}

export default page
