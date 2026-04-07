// "use client"

// import React, { useState, useTransition } from 'react'
// import { motion } from 'framer-motion'
// import { Minus, ArrowRight, Building, Mail, Smartphone, UserRound, Briefcase, Layers3 } from 'lucide-react'
// import Image from 'next/image'
// import image1 from '@/public/images/MOSS.png'
// import { z } from 'zod'
// import { useToast } from '@/components/ui/use-toast'
// import { Input } from "@/components/ui/input"
// import {
//   Form as Forms,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form"
// import { FormError } from '@/components/form-error'
// import { appointmentSchema } from '@/schemas'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { appointment } from '@/actions/appointment'

// type FormValues = z.infer<typeof appointmentSchema>

// const Form = () => {
//   const { toast } = useToast()
//   const [error, setError] = useState<string | undefined>("")
//   const [isPending, startTransition] = useTransition()

//   const form = useForm<FormValues>({
//     resolver: zodResolver(appointmentSchema),
//     defaultValues: {
//       email: "",
//       name: "",
//       phoneNumber: "",
//       role: "",
//       industry: "",
//       company: "",
//     },
//   })

//   const onSubmit = async (values: FormValues) => {
//     setError("")

//     startTransition(async () => {
//       try {
//         const data = await appointment(values)

//         if (data?.success) {
//           toast({
//             title: "Success",
//             description: data.message || "Appointment request sent successfully.",
//             variant: "default",
//           })

//           form.reset()
//         } else {
//           const message = data?.error || "Something went wrong."

//           setError(message)

//           toast({
//             title: "Error",
//             description: message,
//             variant: "destructive",
//           })
//         }
//       } catch (error) {
//         console.error(error)

//         setError("Something went wrong.")

//         toast({
//           title: "Error",
//           description: "Something went wrong.",
//           variant: "destructive",
//         })
//       }
//     })
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
//       className='px-4 xl:px-14 pb-25 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]'
//     >
//       <hr />

//       <div className='pt-20 flex flex-col xl:flex-row items-start justify-between gap-10'>
//         <div className='w-full xl:w-[42%]'>
//           <div className="flex items-center gap-2 mb-3">
//             <Minus className='text-red-500' />
//             <h5 className="text-red-500 text-[18px] font-extrabold">
//               Schedule a demo
//             </h5>
//           </div>

//           <h2 className='text-[32px] sm:text-[40px] xl:text-[52px] font-bold leading-tight mb-4'>
//             Schedule a demo today!
//           </h2>

//           <p className='text-[18px] font-medium text-gray-500 mb-8 max-w-xl'>
//             Schedule a free demo to discover how MHM Digital can support your business growth.
//             In just a few minutes, get a personalized presentation of our services and solutions tailored to your needs.
//           </p>

//           <h3 className='text-xl md:text-2xl font-extrabold leading-snug mb-4'>
//             Schedule a demo with:
//           </h3>

//           <div className='mt-3 flex items-center gap-4 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm'>
//             <div className='h-20 w-20 overflow-hidden rounded-[20px]'>
//               <Image
//                 src={image1}
//                 alt='Mohamed Soumah'
//                 priority
//                 width={0}
//                 height={0}
//                 sizes='100vw'
//                 className='h-full w-full object-cover'
//               />
//             </div>

//             <div>
//               <h5 className='text-base xl:text-lg font-bold text-gray-900'>
//                 Mohamed Soumah
//               </h5>
//               <p className='text-base xl:text-lg text-red-500 font-medium'>
//                 CEO & Founder of MHM Digital
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className='w-full xl:w-[58%]'>
//           <Forms {...form}>
//             <form
//               className='rounded-[36px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 md:px-10'
//               onSubmit={form.handleSubmit(onSubmit)}
//             >
//               <div className='mb-8 border-b border-gray-100 pb-6'>
//                 <h3 className='text-2xl font-bold text-gray-900 md:text-3xl'>
//                   Schedule your personalized demo
//                 </h3>

//                 <p className='mt-2 text-sm leading-6 text-gray-500'>
//                   Fill out the form below and our team will get back to you shortly.
//                 </p>
//               </div>

//               <div className='grid gap-5 sm:grid-cols-2'>
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem className='w-full'>
//                       <FormControl>
//                         <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
//                           <UserRound className='h-5 w-5 shrink-0 text-gray-400' />
//                           <Input
//                             placeholder="Full name *"
//                             {...field}
//                             disabled={isPending}
//                             className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem className='w-full'>
//                       <FormControl>
//                         <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
//                           <Mail className='h-5 w-5 shrink-0 text-gray-400' />
//                           <Input
//                             type="email"
//                             placeholder="Email *"
//                             {...field}
//                             disabled={isPending}
//                             className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className='mt-5 grid gap-5 sm:grid-cols-2'>
//                 <FormField
//                   control={form.control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem className='w-full'>
//                       <FormControl>
//                         <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
//                           <Smartphone className='h-5 w-5 shrink-0 text-gray-400' />
//                           <Input
//                             placeholder="Phone number *"
//                             {...field}
//                             disabled={isPending}
//                             className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="company"
//                   render={({ field }) => (
//                     <FormItem className='w-full'>
//                       <FormControl>
//                         <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
//                           <Building className='h-5 w-5 shrink-0 text-gray-400' />
//                           <Input
//                             placeholder="Company name"
//                             {...field}
//                             disabled={isPending}
//                             className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className='mt-5 grid gap-5 sm:grid-cols-2'>
//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem className='w-full'>
//                       <FormControl>
//                         <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
//                           <Briefcase className='h-5 w-5 shrink-0 text-gray-400' />
//                           <Input
//                             placeholder="Role *"
//                             {...field}
//                             disabled={isPending}
//                             className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="industry"
//                   render={({ field }) => (
//                     <FormItem className='w-full'>
//                       <FormControl>
//                         <div className='flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm'>
//                           <Layers3 className='h-5 w-5 shrink-0 text-gray-400' />
//                           <Input
//                             placeholder="Industry *"
//                             {...field}
//                             disabled={isPending}
//                             className='border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400'
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <div className='mt-5'>
//                 <FormError message={error} />
//               </div>

//               <div className='mt-8'>
//                 <motion.button
//                   whileHover={{ y: -6 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={isPending}
//                   className='flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-8 py-4 text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70'
//                   type='submit'
//                 >
//                   <h5 className='font-semibold text-base sm:text-lg'>
//                     {isPending ? "Sending..." : "Schedule a Demo"}
//                   </h5>
//                   <ArrowRight className='h-5 w-5 text-white' />
//                 </motion.button>
//               </div>
//             </form>
//           </Forms>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default Form