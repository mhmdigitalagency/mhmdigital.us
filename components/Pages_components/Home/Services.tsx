import React from 'react'
import { Minus } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { prisma } from '@/lib/prisma'
import CardService from '@/components/CardService'


const Services = async () => {

      const services = await prisma.service.findMany()

  return (
      <div className='bg-[#e1dfe252] py-20'>
            
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] relative'>
                  <div className='pb-17.5 sm:pb-22.5 lg:pb-0'>
                        <div className="flex items-center gap-2 mb-3"> 
                              <Minus className='text-red-500' />
                              <h5 className="text-red-500 text-[18px] font-extrabold"> 
                                    Our Services
                              </h5> 
                        </div>
                        <h2 className='text-3xl md:text-[44px] max-w-md md:max-w-2xl font-bold leading-snug'>
                              High-impact marketing services to grow your startup
                        </h2>
                  </div>
                  <div className='mt-6 lg:mt-0 w-full'>
                  <Carousel opts={{align: "start",}} className="max-w-full">
                        <CarouselContent>
                              {
                                    services.map((service, index) => {
                                          return (
                                                <CarouselItem className="w-full lg:basis-1/2" key={index}>
                                                      <CardService service={service} />
                                                </CarouselItem>
                                          )
                                    })
                              }
                        </CarouselContent>
                        <div className='absolute top-0 sm:-top-10 lg:-top-25 left-36 lg:left-auto lg:right-16'>
                              <CarouselPrevious 
                              className='h-17.5 w-17.5 md:h-21.25 md:w-21.25 left-32.5 md:-left-35 hover:bg-red-500 
                              hover:text-white shadow-[rgba(13,38,76,0.19)_0px_9px_20px]' />
                              <CarouselNext 
                              className='h-17.5 w-17.5 md:h-21.25 md:w-21.25 hover:bg-red-500 hover:text-white
                              shadow-[rgba(13,38,76,0.19)_0px_9px_20px]' />
                        </div>
                  </Carousel>
                  </div>
            </div>
      </div>
  )
}

export default Services