import Contact from '@/components/Pages_components/Home/Contact'
import Process from '@/components/Pages_components/Home/Process'
import { db } from '@/lib/db'
import React from 'react'

const page = async () => {

      const services = await db.service.findMany()

  return (
    <div>
      <Process />
      <Contact services={services} />
    </div>
  )
}

export default page
