"use client"

import React, { useState, useTransition } from 'react'
import {z} from 'zod'
import { useRouter } from "next/navigation";
import { useToast } from '@/components/ui/use-toast';
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import image1 from '@/public/images/icon-1-contact-marketing-template.svg'
import image2 from '@/public/images/icon-2-contact-marketing-template.svg'
import image3 from '@/public/images/V13.png'
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Building, Mail, Smartphone, UserRound } from 'lucide-react'
import {motion} from 'framer-motion'
import {
      Form as Forms,
      FormControl,
      FormField,
      FormItem,
      FormMessage,
    } from "@/components/ui/form"
import { FormError } from '@/components/form-error'
import { contact } from '@/actions/contact'
import { contactSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link';

type Input = z.infer<typeof contactSchema>;

interface Services {
      id: string;
      name: string;
      description: string;
      icon: string
}

interface Props {
      services: Services[]
}

const Form = ({services}: Props) => {

      const router = useRouter()
      const {toast} = useToast()
      const [error, setError] = useState<string | undefined>("");
      const [isPending, startTransition] = useTransition()
      const form = useForm<Input>({
            resolver: zodResolver(contactSchema),
            defaultValues: {
                  email: "",
                  name: "",
                  phoneNumber: "",
                  service: "",
                  description: "",
                  company: "",
            }
        })

      const onSubmit = (values: z.infer<typeof contactSchema>) => {
            setError("")

            startTransition(() => {
                  contact(values)
                  .then((data) => {
                        setError(data.error)
                        toast({
                              title: "Success",
                              description: "Message sent",
                              variant: "default"
                        })
                        window.location.reload();
                  })
            })
      }

  return (
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: {duration: 2, delay: 0.5} }} 
      className='px-4 xl:px-14 pb-[180px] xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
            <div
            className='pt-[150px] flex flex-col xl:flex-row items-center justify-between gap-10'>
                  <div className='w-full xl:w-[48%]'>
                        <div className="mb-3">
                              <h5 className="text-red-500 text-[18px] font-extrabold"> 
                              Get in touch 
                              </h5> 
                        </div>
                        <h1 className='text-[32px] sm:text-[40px] font-bold leading-tight mb-3'>
                        Ready to elevate your brand? 
                        </h1>
                        <p className='text-[18px] font-medium text-gray-500 mb-10'>
                        Contact us to discuss your project and discover how we can help you achieve your goals.
                        </p>
                        <div className='flex items-center gap-3'>
                              <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-xl' />
                              <h5 className='text-lg font-semibold'>contact@mhmdigital.us</h5>
                        </div>
                        <div className='flex items-center gap-3 pt-6'>
                              <Image src={image2} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-xl' />
                              <h5 className='text-xl text-gray-500 font-bold'>+1 206 771 0038</h5>
                        </div>
                        <div className='flex items-center gap-3 pt-6'>
                              <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-lg w-[62px]' />
                              <h5 className='text-xl text-gray-500 font-bold'>SEATTLE WA 98118</h5>
                        </div>
                  </div>
                  <div className='w-full xl:w-[52%]'>
                        <Forms {...form}>
                        <form className='px-8 py-20 border rounded-[50px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
                        onSubmit={form.handleSubmit(onSubmit)}>
                              <div className='flex flex-col sm:flex-row items-center justify-between gap-5 mb-7'>
                                    <div className='w-full'>
                                          {/* username */}
                                          <FormField
                                          control={form.control}
                                          name="name"
                                          render={({ field }) => (
                                                <FormItem className='w-full'>
                                                      <div className='flex items-center justify-between gap-2'>
                                                            <UserRound className='text-gray-400' size={36} />
                                                            <FormControl>
                                                                  <Input placeholder="Full name *" {...field}
                                                                        disabled={isPending} 
                                                                        className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300' 
                                                                  />
                                                            </FormControl>
                                                      </div>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                          />
                                    </div>
                                    <div className='w-full'>
                                          {/* email */}
                                          <FormField
                                          control={form.control}
                                          name="email"
                                          render={({ field }) => (
                                                <FormItem className='w-full'>
                                                      <div className='flex items-center justify-between gap-2'>
                                                            <Mail className='text-gray-400' size={36} />
                                                            <FormControl> 
                                                                        <Input placeholder="Email *" {...field}
                                                                              disabled={isPending} 
                                                                              className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300' 
                                                                        />      
                                                            </FormControl>
                                                      </div>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                          />
                                    </div>
                              </div>
                              <div className='flex flex-col sm:flex-row items-center justify-between gap-5 mb-7'>
                                    <div className='w-full'>
                                          {/* phoneNumber */}
                                          <FormField
                                          control={form.control}
                                          name="phoneNumber"
                                          render={({ field }) => (
                                                <FormItem className='w-full'>
                                                      <div className='flex items-center justify-between gap-2'>
                                                            <Smartphone className='text-gray-400' size={36} />
                                                            <FormControl>
                                                                  <Input placeholder="Pnone number *" {...field}
                                                                        disabled={isPending} 
                                                                        className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300' 
                                                                  />
                                                            </FormControl>
                                                      </div>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                          />
                                    </div>
                                    <div className='w-full'>
                                          {/* company */}
                                          <FormField
                                          control={form.control}
                                          name="company"
                                          render={({ field }) => (
                                                <FormItem className='w-full'>
                                                      <div className='flex items-center justify-between gap-2'>
                                                            <Building className='text-gray-400' size={36} />
                                                            <FormControl>
                                                                  <Input placeholder="Company name" {...field}
                                                                        disabled={isPending} 
                                                                        className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300' 
                                                                  />
                                                            </FormControl>
                                                      </div>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                          />
                                    </div>
                              </div>
                              <div className='mb-7'>
                                    <div className='w-full flex items-center justify-between rounded-full gap-2'>
                                          {/* service */}
                                          <FormField
                                                control={form.control}
                                                name="service"
                                                render={({ field }) => (
                                                      <FormItem className='w-full'>
                                                      <select onChange={field.onChange} defaultValue={field.value} required
                                                      className='w-full bg-white px-5 py-5 rounded-[40px] border 
                                                    hover:border-black transition-all duration-300 cursor-pointer'>
                                                            <option value="" className='text-gray-400'>Select a service *</option>
                                                            {
                                                                  services.map((item, index) => (
                                                                        <option key={index} value={item.name}>{item.name}</option>
                                                                  ))
                                                            }
                                                      </select>
                                                      </FormItem>
                                                )}
                                          />
                                    </div>
                              </div>
                              <div className='mb-7'>
                                    {/* description */}
                                    <FormField
                                          control={form.control}
                                          name="description"
                                          render={({ field }) => (
                                                <FormItem className='w-full'>
                                                      <FormControl>
                                                            <Textarea placeholder="Describe your project..." {...field}
                                                                  disabled={isPending} 
                                                                  className='rounded-3xl pt-5 pb-20 px-6 text-xl placeholder:text-base hover:border-black transition-all duration-300' 
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />
                              </div>
                              <FormError message={error} />
                              <br />
                              <div className='flex items-center gap-5 flex-col justify-start'>
                                    <motion.button 
                                          whileHover={{ y: -12, transition: {type: 'spring'} }}
                                          className='flex items-center justify-center gap-2 bg-red-500 text-white 
                                          rounded-full px-10 py-5 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-full' type='submit'>
                                          <h5 className='font-semibold text-base sm:text-[20px]'>Submit</h5>
                                          <ArrowRight className='text-white' />
                                    </motion.button>
                                          <h5>Or</h5>
                                    <Link href={'/appointment'} className='group w-full'>
                                          <motion.button 
                                                whileHover={{ y: -12, transition: {type: 'spring'} }}
                                                className='flex items-center gap-2 justify-center bg-black text-white 
                                                rounded-full px-10 py-5 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-full' type='submit'>
                                                <h5 className='font-semibold text-base sm:text-[20px]'>Schedule an appointment</h5>
                                                {/* <ArrowRight className='text-white' /> */}
                                          </motion.button>
                                    </Link>
                              </div>
                        </form>
                        </Forms>
                  </div>
            </div>
      </motion.div>
  )
}

export default Form
