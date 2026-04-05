import { Minus } from 'lucide-react'
import React from 'react'
import Banner from '@/components/Pages_components/Services/Banner'
import { prisma } from '@/lib/prisma'
import ServiceItem from '@/components/Pages_components/Services/ServiceItem'

const page = async () => {

      const services = await prisma.service.findMany()

  return (
    <>
    <div className='mt-25 pb-37.5 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
      <div className='flex flex-col xl:flex-row xl:items-center justify-between mb-10 xl:mb-6'>
            <div className='w-full xl:w-[52%]'>
                  <div className="flex items-end gap-2"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-semibold"> 
                              Our Services
                        </h5> 
                  </div>
                  <h2 className='text-3xl md:text-[55px] font-bold leading-tight mb-4'>
                  High-impact services
                  </h2>
            </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-5 w-full'>
            {
                  services.map((service, index) => (
                  <div key={index}>
                        <ServiceItem service={service} />
                  </div> 
            ))}     
      </div>
    </div>
    <Banner />
    </>
  )
}

export default page