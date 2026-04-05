"use client"

import React from 'react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import image1 from '@/public/images/icon-1-service-marketing-template.svg'
import {motion} from 'framer-motion'
import { fadeIn } from '../lib/variants'

interface Props {
      service: Services

}

interface Services {
      id: string
      description: string
      name: string
      icon: string
}

const CardService = ({service}: Props) => {
  return (
    <>
    <motion.div 
    variants={fadeIn("up", 0.2)}
    initial="hidden"
    whileInView={"show"}
    viewport={{ once: false, amount: 0.5 }}
    className="px-2 py-16">
            <Card className='rounded-[50px] bg-white border-none shadow-md group'>
                  <Link href={`/service/${service.id}`}>
                        <CardContent className="px-10 py-12 h-[400px] lg:h-[320px] xl:h-[270px]">
                              <motion.div 
                              whileHover={{ scale: 1.02, transition: {type: 'spring', duration: 0.7} }}
                              className='flex flex-col gap-5 lg:flex lg:flex-row items-start lg:gap-1'>
                                    <div className='w-[40%]'>
                                          {/* <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw'
                                                className='rounded-3xl' /> */}
                                          <img src={service.icon} alt="image-service" className='rounded-3xl' />
                                    </div>
                                    <div className='w-[100%]'>
                                          <h4 className='text-3xl font-bold mb-3'>{service.name || 'Lorem'}</h4>
                                          <p className='text-[17.5px] font-semibold text-gray-500 mb-5 leading-7'>
                                                {service.description 
                                                ? `${service.description.substring(0, 50)}${service.description.length > 50 ? '...' : ''}` 
                                                : 'Lorem ipsum'}
                                          </p>
                                          <h5 className='flex items-center gap-2 text-lg font-bold group-hover:text-red-500 transition-all
                                          duration-300'>
                                                Learn More
                                                <ArrowRight size={18} className='group-hover:text-red-500 group-hover:translate-x-2
                                                transition-all duration-300' />
                                          </h5>
                                    </div>
                              </motion.div>
                        </CardContent>
                  </Link>
            </Card>
      </motion.div>
    </>
  )
}

export default CardService
