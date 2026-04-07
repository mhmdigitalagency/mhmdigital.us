"use client"

import React, { useState, useTransition } from 'react'
import {z} from 'zod'
import { useRouter } from "next/navigation";
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image'
import image1 from '@/public/images/icon-1-contact-marketing-template.svg'
import image2 from '@/public/images/icon-2-contact-marketing-template.svg'
import image3 from '@/public/images/V13.png'
import {
      Form as Forms,
      FormControl,
      FormField,
      FormItem,
      FormMessage,
    } from "@/components/ui/form"
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Building, Mail, Smartphone, UserRound } from 'lucide-react'
import {motion} from 'framer-motion'
import { opacite } from '@/lib/variants'
import { contact } from '@/actions/contact'
import { contactSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

const Contact = ({services}: Props) => {

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
                              description: "Message envoyé",
                              variant: "default"
                        })
                        window.location.reload();
                  })
            })
      }

  return (
      <div className='px-4 xl:px-14 pb-25 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'>
            <hr />
            <motion.div
            variants={opacite("up", 0.3)}
            viewport={{ once: false, amount: 0.2 }} 
            className='pt-25 flex flex-col xl:flex-row items-center justify-between gap-10'>
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
                              <h5 className='text-xl text-gray-500 font-bold'>+1 888 903 7679</h5>
                        </div>
                        <div className='flex items-center gap-3 pt-6'>
                              <Image src={image3} alt='image1' priority width={0} height={0} sizes='100vw' 
                              className='rounded-lg w-15.5' />
                              <h5 className='text-xl text-gray-500 font-bold'>SEATTLE WA 98118</h5>
                        </div>
                  </div>
                  <div className='w-full xl:w-[52%]'>
                  <Forms {...form}>
                  <form
                        className='rounded-[36px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 md:px-10'
                        onSubmit={form.handleSubmit(onSubmit)}
                  >
                        <div className='mb-8 border-b border-gray-100 pb-6'>
                        <h2 className='text-2xl font-bold text-gray-900 md:text-3xl'>
                        Send us a message
                        </h2>
                        <p className='mt-2 text-sm leading-6 text-gray-500'>
                        Fill out the form below and our team will get back to you shortly.
                        </p>
                        </div>

                        <div className='grid gap-5 sm:grid-cols-2'>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                              <FormItem className='w-full'>
                              <FormControl>
                              <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
                                    <UserRound className='h-5 w-5 shrink-0 text-gray-400' />
                                    <Input
                                    placeholder="Full name *"
                                    {...field}
                                    disabled={isPending}
                                    className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
                                    />
                              </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                              <FormItem className='w-full'>
                              <FormControl>
                              <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
                                    <Mail className='h-5 w-5 shrink-0 text-gray-400' />
                                    <Input
                                    type="email"
                                    placeholder="Email *"
                                    {...field}
                                    disabled={isPending}
                                    className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
                                    />
                              </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                        )}
                        />
                        </div>

                        <div className='mt-5 grid gap-5 sm:grid-cols-2'>
                        <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                              <FormItem className='w-full'>
                              <FormControl>
                              <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
                                    <Smartphone className='h-5 w-5 shrink-0 text-gray-400' />
                                    <Input
                                    placeholder="Phone number *"
                                    {...field}
                                    disabled={isPending}
                                    className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
                                    />
                              </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                              <FormItem className='w-full'>
                              <FormControl>
                              <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
                                    <Building className='h-5 w-5 shrink-0 text-gray-400' />
                                    <Input
                                    placeholder="Company name"
                                    {...field}
                                    disabled={isPending}
                                    className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
                                    />
                              </div>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                        )}
                        />
                        </div>

                        <div className='mt-5'>
                        <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                              <FormItem className='w-full'>
                              <FormControl>
                              <select
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={isPending}
                                    className='w-full cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-base text-gray-700 transition-all duration-300 hover:border-black focus:border-red-300 focus:bg-white focus:outline-none'
                              >
                                    <option value="">Select a service *</option>
                                    {services.map((item) => (
                                    <option key={item.id} value={item.name}>
                                    {item.name}
                                    </option>
                                    ))}
                              </select>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                        )}
                        />
                        </div>

                        <div className='mt-5'>
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                              <FormItem className='w-full'>
                              <FormControl>
                              <Textarea
                                    placeholder="Describe your project..."
                                    {...field}
                                    disabled={isPending}
                                    className='min-h-42.5 rounded-3xl border-gray-200 bg-gray-50 px-5 py-4 text-base placeholder:text-gray-400 transition-all duration-300 hover:border-black focus:border-red-300 focus:bg-white'
                              />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                        )}
                        />
                        </div>

                        <div className='mt-5'>
                        <FormError message={error} />
                        </div>

                        <div className='mt-8'>
                        <motion.button
                        whileHover={{ y: -6 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isPending}
                        className='flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-8 py-4 text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70'
                        type='submit'
                        >
                        <h5 className='font-semibold text-base sm:text-lg'>
                              {isPending ? "Sending..." : "Get in Touch"}
                        </h5>
                        <ArrowRight className='h-5 w-5 text-white' />
                        </motion.button>
                        </div>
                  </form>
                  </Forms>
                  </div>
            </motion.div>
      </div>
  )
}

export default Contact