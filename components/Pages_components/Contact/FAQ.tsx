"use client"

import { Minus } from 'lucide-react'
import React from 'react'
import {
      Accordion,
      AccordionContent,
      AccordionItem,
      AccordionTrigger,
    } from "@/components/ui/accordion"
import {motion} from 'framer-motion'
import { fadeIn } from '../../../lib/variants'

const FAQ = () => {
  return (
    <div className='py-25 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
      <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10'>
            <div className='w-full xl:w-[52%]'>
                  <div className="flex items-end gap-2"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-semibold">               
                        FAQs
                        </h5> 
                  </div>
                  <h2 className='text-3xl md:text-[45px] font-bold leading-tight mb-4'>
                  Frequently Asked Questions
                  </h2>
            </div>
            <div className='w-full xl:w-[48%]'>
                  <p></p>
            </div>
      </div>
      <motion.div 
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6'>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        1. What services does MHM Digital offer?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        MHM Digital offers a range of services including Branding, Web Design & Development, 
                        Digital Marketing (Social Media Marketing, SEO, PPC, Content Marketing, Email Marketing), 
                        Mobile App Development, Animation, and Mobile & Online Notarization.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        2. How do I choose the right package for my needs?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        We offer Starter, Growth, and Ultimate packages for each service to cater 
                        to different needs and budgets. You can find detailed descriptions of 
                        each package on our Packages page. If you need further assistance, feel 
                        free to contact us.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
      </motion.div>
      <motion.div 
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6'>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        3. How can I get a quote for a custom project?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        To get a personalized quote, please contact us with details about your project. 
                        We’ll review your requirements and provide a tailored proposal.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg font-bold'>
                        4. What is the process for starting a project with MHM Digital?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        Once you reach out to us, we’ll discuss your project requirements and goals. 
                        After agreeing on the scope and package, we’ll start with a marketing plan, 
                        execute the strategy, and then focus on growth and scaling. Detailed steps 
                        are outlined on our Our Process page.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
      </motion.div>
    </div>
  )
}

export default FAQ