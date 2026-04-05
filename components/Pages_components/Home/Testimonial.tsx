"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import image1 from '@/public/images/image-2-testimonial-marketing-template.png'
import image2 from '@/public/images/image-1-testimonial-marketing-template.png'
import image3 from '@/public/images/logo-1-companies-marketing-template.svg'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { opacite } from '../../../lib/variants'

const Testimonial = () => {
  return (
    <div className='bg-[#e1dfe23c] py-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <motion.div
      variants={opacite("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }} 
      className='flex flex-col items-center justify-center'>
            <div className="mb-3"> 
                  <h5 className="text-red-500 text-xl font-semibold text-center"> 
                  Testimonials
                  </h5> 
            </div>
            <h2 className='text-3xl md:text-[44px] max-w-xl font-semibold leading-tight mb-4 text-center'>
            Hear what our amazing customers say
            </h2>
            <div className='mt-20 w-full px-10 xl:px-16'>
                  <Carousel className="max-w-full">
                        <CarouselContent>
                              <CarouselItem>
                                    <div className="xl:px-16">
                                    <Card className='px-10 bg-white py-14 border-none rounded-[50px] 
                                    shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                    <CardContent className="flex flex-col lg:flex-row items-center gap-5 justify-between">
                                          <div className='w-full lg:w-[60%]'>
                                                <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' className='mb-6' />
                                                <h4 className='mb-6 text-xl sm:text-3xl font-semibold'>"Agencypro X helped us to reach our business goals"</h4>
                                                <p className='text-gray-500 text-base sm:text-xl'>
                                                Lorem ipsum dolor sit amet, consectetur 
                                                adipiscing elit. Vitae, aliquet duis 
                                                pellentesque pretium mattis orci. 
                                                Vestibulum nunc diam tellus ac tempor. 
                                                Nulla a commod.
                                                </p>
                                          <div className='pt-10'>
                                                <h5 className='text-xl font-semibold'>Jhon Carter</h5>
                                                <p className='text-red-400 text-xl'>CEO at Company</p>
                                          </div>
                                          </div>
                                          <div className="w-[40%]">
                                                <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                                                className='' />
                                          </div>
                                    </CardContent>
                                    </Card>
                                    </div>
                              </CarouselItem>
                              <CarouselItem>
                                    <div className="xl:px-16">
                                    <Card className='px-10 py-12 bg-white border-none rounded-[50px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                    <CardContent className="flex flex-col lg:flex-row items-center gap-5 justify-between">
                                          <div className='w-full lg:w-[60%]'>
                                          <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' className='mb-6' />
                                          <h4 className='mb-6 text-xl sm:text-3xl font-semibold'>"Agencypro X helped us to reach our business goals"</h4>
                                          <p className='text-gray-500 text-base sm:text-xl'>
                                          Lorem ipsum dolor sit amet, consectetur 
                                          adipiscing elit. Vitae, aliquet duis 
                                          pellentesque pretium mattis orci. 
                                          Vestibulum nunc diam tellus ac tempor. 
                                          Nulla a commod.
                                          </p>
                                          <div className='pt-10'>
                                                <h5 className='text-xl font-semibold'>Sophie Moore</h5>
                                                <p className='text-red-400 text-xl'>Head of Marketing at Company</p>
                                          </div>
                                          </div>
                                          <div className="w-[40%]">
                                                <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                                                className='' />
                                          </div>
                                    </CardContent>
                                    </Card>
                                    </div>
                              </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className='h-[65px] w-[65px] hover:bg-red-500 hover:text-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]' />
                        <CarouselNext className='h-[65px] w-[65px] hover:bg-red-500 hover:text-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]' />
                  </Carousel>
            </div>
            <div className='mt-20'>
                  <Link href={'/contact'}>
                        <motion.button 
                        whileHover={{ y: -10, transition: {type: 'spring'} }}
                        className='flex items-center gap-2 bg-red-500 text-white rounded-full px-10 py-6 
                        shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
                              <h5 className='font-semibold text-base md:text-[20px]'>Get in Touch</h5>
                              <ArrowRight className='text-white group-hover:translate-x-2 transition-all duration-500' />
                        </motion.button>
                  </Link>
            </div>
      </motion.div>
    </div>
  )
}

export default Testimonial
