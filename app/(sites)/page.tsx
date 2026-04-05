import About from '@/components/Pages_components/Home/About'
import Banner from '@/components/Pages_components/Home/Banner'
import Blog from '@/components/Pages_components/Home/Blog'
import Case from '@/components/Pages_components/Home/Case'
import Contact from '@/components/Pages_components/Home/Contact'
import Process from '@/components/Pages_components/Home/Process'
import Services from '@/components/Pages_components/Home/Services'
import Testimonial from '@/components/Pages_components/Home/Testimonial'
import Why from '@/components/Pages_components/Home/Why'
import { prisma } from '@/lib/prisma'
import React from 'react'

async function page () {

  const services = await prisma.service.findMany()

  return (
    <div>
      <Banner />
      {/* <Services />
      <Why />
      <About />
      <Process /> */}
      {/* <Case /> */}
      {/* <Testimonial /> */}
      {/* <Blog /> */}
      <Contact services={services} />
    </div>
  )
}

export default page
