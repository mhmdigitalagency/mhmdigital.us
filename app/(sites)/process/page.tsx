import Contact from '@/components/Pages_components/Home/Contact'
import Process from '@/components/Pages_components/Home/Process'
import { prisma } from '@/lib/prisma'
import React from 'react'

const page = async () => {

      const services = await prisma.service.findMany()

  return (
    <div>
      <Process />
      <Contact services={services} />
    </div>
  )
}

export default page
