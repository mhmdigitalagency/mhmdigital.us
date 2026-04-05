"use client"

import React, { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Minus, ArrowRight, Building, Mail, Smartphone, UserRound } from 'lucide-react'
import Image from 'next/image'
import image1 from '@/public/images/MOSS.png'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { Input } from "@/components/ui/input"
import {
  Form as Forms,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { FormError } from '@/components/form-error'
import { appointmentSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointment } from '@/actions/appointment'

type FormValues = z.infer<typeof appointmentSchema>

const Form = () => {
  const { toast } = useToast()
  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      role: "",
      industry: "",
      company: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    setError("")

    startTransition(async () => {
      const data = await appointment(values)

      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "Appointment request sent successfully.",
          variant: "default",
        })

        form.reset()
      } else {
        setError(data.error)

        toast({
          title: "Error",
          description: data.error || "Something went wrong.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2, delay: 0.5 } }}
      className='px-4 xl:px-14 pb-45 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'
    >
      <div className='block lg:flex items-start w-full mt-2 gap-6 xl:gap-16 border-t border-slate-200'>
        <div className='w-full lg:w-[40%] py-10 lg:py-20'>
          <div className='pb-17.5 sm:pb-22.5 lg:pb-0'>
            <div className="flex items-center gap-2 mb-3">
              <Minus className='text-red-500' />
              <h5 className="text-red-500 text-[18px] font-extrabold">
                Schedule a demo
              </h5>
            </div>

            <h2 className='text-4xl md:text-[40px] xl:text-[58px] max-w-md font-extrabold leading-tight'>
              Schedule a demo today!
            </h2>

            <p className='text-base md:text-lg font-medium text-slate-500 max-w-md lg:max-w-xl mt-5'>
              Schedule a free demo to discover how MHM Digital can support your business growth. In just a few minutes, get a personalized presentation of our services and solutions tailored to your needs.
            </p>

            <div className='mt-6'>
              <h3 className='text-xl md:text-2xl font-extrabold leading-snug'>
                Schedule a demo with :
              </h3>

              <div className='mt-3 flex items-center gap-4 p-5 border border-slate-200 rounded-[18px]'>
                <div className='w-20 h-20 rounded-[20px] overflow-hidden'>
                  <Image
                    src={image1}
                    alt='Mohamed Soumah'
                    priority
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-full h-auto'
                  />
                </div>

                <div>
                  <h5 className='font-bold text-base xl:text-lg'>Mohamed Soumah</h5>
                  <p className='text-base xl:text-lg text-red-500 rounded-xl'>
                    CEO & Founder of Mhm Digital
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full lg:w-[60%] bg-red-500 px-6 xl:px-16 py-10 lg:py-20'>
          <Forms {...form}>
            <form
              className='px-4 xl:px-12 py-20 border rounded-[50px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='border-b border-slate-200 pb-8 mb-8'>
                <h3 className='text-xl md:text-2xl font-extrabold leading-snug mb-3'>
                  Schedule your personalized demo
                </h3>

                <p className='text-base md:text-lg font-medium text-slate-500 max-w-md lg:max-w-xl mt-5'>
                  Fill out this quick form: our team will contact you to confirm the date and time of your appointment.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row items-center justify-between gap-5 mb-7'>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex items-center justify-between gap-2'>
                          <FormControl>
                            <Input
                              placeholder="Full name *"
                              {...field}
                              disabled={isPending}
                              className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300'
                            />
                          </FormControl>
                          <UserRound className='text-gray-400 shrink-0' size={36} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex items-center justify-between gap-2'>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email *"
                              {...field}
                              disabled={isPending}
                              className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300'
                            />
                          </FormControl>
                          <Mail className='text-gray-400 shrink-0' size={36} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex flex-col sm:flex-row items-center justify-between gap-5 mb-7'>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex items-center justify-between gap-2'>
                          <FormControl>
                            <Input
                              placeholder="Phone number *"
                              {...field}
                              disabled={isPending}
                              className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300'
                            />
                          </FormControl>
                          <Smartphone className='text-gray-400 shrink-0' size={36} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex items-center justify-between gap-2'>
                          <FormControl>
                            <Input
                              placeholder="Company name"
                              {...field}
                              disabled={isPending}
                              className='border h-14 rounded-full text-sm placeholder:text-base hover:border-black transition-all duration-300'
                            />
                          </FormControl>
                          <Building className='text-gray-400 shrink-0' size={36} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='flex flex-col sm:flex-row items-center justify-between gap-5 mb-7'>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex items-center justify-between gap-2'>
                          <FormControl>
                            <Input
                              placeholder="Role *"
                              {...field}
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
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <div className='flex items-center justify-between gap-2'>
                          <FormControl>
                            <Input
                              placeholder="Industry *"
                              {...field}
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

              <FormError message={error} />

              <div className='mt-6 flex items-center gap-5 flex-col sm:flex-row justify-start'>
                <motion.button
                  whileHover={{ y: -12, transition: { type: 'spring' } }}
                  disabled={isPending}
                  className='flex items-center gap-2 justify-center bg-red-500 text-white cursor-pointer rounded-full px-10 py-4 md:py-5 shadow-lg w-full disabled:opacity-70 disabled:cursor-not-allowed'
                  type='submit'
                >
                  <h5 className='font-semibold text-base sm:text-[20px]'>
                    {isPending ? "Sending..." : "Submit"}
                  </h5>
                  <ArrowRight className='text-white' />
                </motion.button>
              </div>
            </form>
          </Forms>
        </div>
      </div>
    </motion.div>
  )
}

export default Form