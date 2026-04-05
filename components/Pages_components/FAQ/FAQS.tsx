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
    <div className='py-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
      <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-10'>
            <div className='w-full xl:w-[52%]'>
                  <div className="flex items-end gap-2"> 
                        <Minus className='text-red-500' />
                        <h5 className="text-red-500 text-xl font-semibold">               
                        FAQs
                        </h5> 
                  </div>
                  <h2 className='text-[45px] font-bold leading-tight mb-4'>
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
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
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
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
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
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
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
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
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
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        5. What should I include in my contact form submission?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        Please provide your name, business legal name (optional), address, contact 
                        information, and billing address. If you have any special requirements or 
                        questions, include them in the message section.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        6. How long does it take to complete a project?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        Project timelines vary depending on the complexity and scope of the service. 
                        We will provide an estimated timeline during the initial consultation and 
                        keep you updated throughout the process.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        7. Can I make changes to my order after it’s placed?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        If you need to make changes to your order, please contact us as soon as possible. 
                        We will do our best to accommodate your requests depending on the stage of your project.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        8. What are your payment options?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        We accept various payment methods including credit/debit cards and bank transfers. 
                        Payment details will be provided upon confirmation of your order.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        9. How do I contact customer support?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        You can reach our customer support team via email at contact@mhmdigital.us or 
                        by phone at +1 206 771 0038. We’re here to assist you with any questions or concerns.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
            <div>
                  <Accordion type="single" collapsible 
                  className="w-full bg-white
                  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
                  rounded-3xl
                  p-5
                  ">
                  <AccordionItem value="item-1">
                        <AccordionTrigger className='text-lg md:text-xl font-bold'>
                        10. Where can I find your Privacy Policy and Terms and Conditions?
                        </AccordionTrigger>
                        <AccordionContent className='text-gray-500 text-base md:text-lg'>
                        Our Privacy Policy and Terms and Conditions can be accessed through the links 
                        at the bottom of our website or directly at www.mhmdigital.us/policy.
                        </AccordionContent>
                  </AccordionItem>
                  </Accordion>
            </div>
      </motion.div>
    </div>
  )
}

export default FAQ