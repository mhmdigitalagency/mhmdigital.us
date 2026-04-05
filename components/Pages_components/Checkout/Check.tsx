// "use client"

// import React, { useState, useTransition } from 'react'
// import { useRouter } from "next/navigation";
// import { useToast } from '@/components/ui/use-toast';
// import {motion} from 'framer-motion'
// import { getCart, removeFromCart } from '@/lib/cartUtils'
// import { Carts } from '@/types/carts'
// import { Input } from '@/components/ui/input'
// import { checkoutSchema } from '@/schemas';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { checkOut } from '@/actions/checkout';
// import image1 from '@/public/images/icon-1-packages-marketing-template.png'
// import Image from 'next/image'
// import { useSession } from 'next-auth/react';
// import {
//       AlertDialog,
//       AlertDialogAction,
//       AlertDialogCancel,
//       AlertDialogContent,
//       AlertDialogDescription,
//       AlertDialogFooter,
//       AlertDialogHeader,
//       AlertDialogTitle,
//       AlertDialogTrigger,
//     } from "@/components/ui/alert-dialog"

// type Input = z.infer<typeof checkoutSchema>;

// interface Orders {
//       id: string;
//       userId: string;
//       price: number;
//       status: string | null;
// }

// interface Props {
//       orders: Orders[]
// }

// const Check = () => {

//   const { data: session, status } = useSession();
//   const router = useRouter()
//   const {toast} = useToast()
//   const [carts, setCarts] = useState<Carts>(getCart());
//   const [isDialogOpen, setIsDialogOpen] = useState(false)

//   const [error, setError] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition()

//   const form = useForm<Input>({
//     resolver: zodResolver(checkoutSchema),
//     defaultValues: {
//           name: session?.user.name || '',
//           email: session?.user.email || '',
//           phoneNumber: "",
//           billingAddress: "",
//           billingCity: "",
//           billingPostal: "",
//           shippingAddress: "",
//           shippingCity: "",
//           shippingPostal: "",
//           price: carts.items?.map((item) => Number(item.packageDuration) * item.quantity)?.reduce((total, item) => 
//             { return total + item}, 0),
//           packageIds: carts.items.map((item) => item.packageId)
//     }
//   })

//   const handleRemoveFromCart = (packageId: string) => {
//       removeFromCart(packageId);
//       }

//       const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
//             setError("")

//             if (!session) {
//                   toast({
//                     title: "Error",
//                     description: "You must be logged in to order!",
//                     variant: "destructive"
//                   });
//                   router.push("/connexion");
//                   return;
//             }
        
//             startTransition(async () => {
//                 try {
//                     const data = await checkOut(values);
        
//                     if (data?.error) {
//                         setError(data.error);
//                         return;
//                     }
        
//                     for (const packageId of values.packageIds) {
//                         handleRemoveFromCart(packageId);
//                     }
        
//                     setIsDialogOpen(true);
                    
//                   //   const orderId = data.orderId;
        
//                   //   router.push(`/details/${orderId}`);
//                 } catch (error) {
//                     setError("An error has occurred.");
//                 }
//             });
//       }

//   return (
//       <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, transition: {duration: 0.8, delay: 0.3} }} 
//       >
//             <div className='bg-slate-100 py-28'>
//                   <div className='px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
//                         <h2 className='font-extrabold pb-4 text-[60px]'>Checkout</h2>
//                         <p className='text-gray-400 max-w-[40rem] text-[18px] font-semibold'>
//                               Please review your checkout details below. If everything is correct, 
//                               place your order and you will receive more information via email.
//                         </p>
//                   </div>
//             </div>
//             <div className='py-16 px-4 xl:px-14 xxl:px-[10rem] xll:px-[20rem] xxx:px-[22%] lll:px-[25%]'>
//                   <Form {...form}>
//                         <form 
//                         onSubmit={form.handleSubmit(onSubmit)}>
//                               <div className='flex items-start gap-10 flex-wrap lg:flex-nowrap'>
//                                     <div className='w-full lg:w-[65%]'>
//                                           <div className='px-8 py-10 border rounded-[50px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
//                                                 <div className='flex justify-between items-center'>
//                                                       <h3 className='text-xl font-bold'>Customer Info</h3>
//                                                       <h3 className='text-xl font-semibold text-red-500'>* Required</h3>
//                                                 </div>
//                                                 <div className='w-full mt-8'>
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="name"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>Name*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               value={session?.user.name ?? ''}
//                                                                               disabled
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                 </div>
//                                                 <div className='w-full mt-8'>
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="email"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>Email*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               value={session?.user.email ?? ''}
//                                                                               disabled
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                 </div>
//                                                 <div className='w-full mt-8'>
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="phoneNumber"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>Phone number*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               disabled={isPending} 
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                 </div>
//                                           </div>
//                                           <div className='px-8 py-10 border rounded-[50px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-10'>
//                                                 <div className='flex justify-between items-center'>
//                                                       <h3 className='text-xl font-bold'>Payment Info</h3>
//                                                       <h3 className='text-xl font-semibold text-red-500'>* Required</h3>
//                                                 </div>
//                                                 <div className='w-full mt-8'>
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="shippingAddress"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>Shipping address*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               disabled={isPending} 
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                 </div>
//                                                 <div className='w-full mt-8 flex items-center justify-between gap-5'>
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="shippingCity"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>City*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               disabled={isPending} 
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="shippingPostal"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>Postal code*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               disabled={isPending} 
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                 </div>
//                                                 <div className='w-full mt-8'>
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="billingAddress"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>Billing address*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               disabled={isPending} 
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                 </div>
//                                                 <div className='w-full mt-8 flex items-center justify-between gap-5'>
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="billingCity"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>City*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               disabled={isPending} 
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                       <FormField
//                                                       control={form.control}
//                                                       name="billingPostal"
//                                                       render={({ field }) => (
//                                                             <FormItem className='w-full'>
//                                                                   <FormLabel className='text-base font-bold'>Postal code*</FormLabel>
//                                                                   <FormControl>
//                                                                         <Input placeholder="" {...field}
//                                                                               disabled={isPending} 
//                                                                               className='border rounded-full text-xl px-4 py-7 
//                                                                               placeholder:text-base hover:border-black/50 transition-all
//                                                                               duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                                         />
//                                                                   </FormControl>
//                                                                   <FormMessage />
//                                                             </FormItem>
//                                                       )}
//                                                       />
//                                                 </div>
//                                           </div>
//                                           <div className='px-8 py-10 border rounded-[50px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-10'>
//                                                 <h3 className='text-xl font-bold'>Items in Order</h3>
//                                                 <div className='mt-8'>
//                                                 {
//                                                       carts?.items.length === 0 ? 
//                                                       (
//                                                       <div className='mt-10'>
//                                                             <h5 className='mb-10 text-lg text-slate-500'>No items found.</h5>
//                                                       </div>
//                                                       )
//                                                       :
//                                                       (
//                                                       <div className=''>
//                                                       {carts.items?.map((item) => (
//                                                             <div key={item.packageId} className='mt-5 border-b py-4'>
//                                                                   <div className='row sm:flex items-center justify-between'>
//                                                                         <div className='row gap-5'>
//                                                                               <div className='flex items-center gap-5'>
//                                                                                     <div className='w-[40%]'>
//                                                                                           <p className='text-base font-bold text-red-500'>
//                                                                                                 {item?.package?.service.name}
//                                                                                           </p>
//                                                                                           <Image src={image1} alt='image1' priority width={0} height={0} 
//                                                                                           sizes='100vw' className='rounded-xl w-full' />
//                                                                                     </div>
//                                                                                     <div>
//                                                                                           <h3 className='text-base font-extrabold'>
//                                                                                                 {item?.package?.name ?? 'Package name not available'}
//                                                                                           </h3>
//                                                                                           <p className='font-semibold'>
//                                                                                                 Quantité : <span>{item.quantity}</span>
//                                                                                           </p>
//                                                                                           {item?.package && (item.package.priceByMonth || item.package.priceByYear) ? (
//                                                                                                 <h5 className='text-slate-500 font-bold'>
//                                                                                                       Package Duration : 
//                                                                                                       <span className='text-black'>
//                                                                                                       {item.packageDuration === item.package.priceByMonth
//                                                                                                             ? '1 Month'
//                                                                                                             : item.packageDuration === item.package.priceByYear
//                                                                                                             ? '1 Year'
//                                                                                                             : ''}
//                                                                                                       </span>
//                                                                                                 </h5>
//                                                                                           ) : null}
//                                                                                     </div>
//                                                                               </div>
//                                                                         </div>
//                                                                         <div>
//                                                                         <p className='font-semibold'>
//                                                                               $ {item.quantity * (item?.packageDuration ?? item?.package?.price ?? 0)}.00 USD
//                                                                         </p>
//                                                                         </div>
//                                                                   </div>
//                                                             </div>
//                                                       ))}
//                                                       </div>
//                                                       )
//                                                 }
//                                                 </div>
//                                           </div>
//                                     </div>
//                                     <div className='w-full lg:w-[35%]'>
//                                           <div className='px-8 py-10 border rounded-[50px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
//                                                 <div className=''>
//                                                       <h3 className='text-xl font-bold'>Order Summary</h3>
//                                                       <div className='row sm:flex items-center justify-between mt-5'>
//                                                             <h5 className='text-slate-500 font-medium text-[18px]'>Subtotal</h5>
//                                                             <p className='font-semibold text-slate-500 text-[18px]'>
//                                                                   $ {carts.items?.map((item) => Number(item.packageDuration) * item.quantity)?.reduce((total, item) => 
//                                                                         { return total + item}, 0)}.00 USD
//                                                             </p>
//                                                       </div>
//                                                       <div className='row sm:flex items-center justify-between mt-2'>
//                                                             <h5 className='text-slate-500 font-medium text-[18px]'>Total</h5>
//                                                             <p className='font-bold text-xl'>
//                                                                   $ {carts.items?.map((item) => Number(item.packageDuration) * item.quantity)?.reduce((total, item) => 
//                                                                         { return total + item}, 0)}.00 USD
//                                                             </p>
//                                                       </div>
//                                                       <div className='mt-5'>
//                                                             <h5 className='text-base font-semibold mb-2'>Discount Code</h5>
//                                                             <Input placeholder="" disabled={isPending} 
//                                                             className='border rounded-full text-xl px-4 py-7 
//                                                             placeholder:text-base hover:border-black/50 transition-all
//                                                             duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
//                                                             />
//                                                       </div>
//                                                       <div className='mt-5'>
//                                                             <motion.button
//                                                             whileHover={{ y: -8, transition: {type: 'spring'} }} 
//                                                             className=' bg-white text-red-500 w-full
//                                                             rounded-full px-10 py-5 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'>
//                                                                   <h5 className='font-semibold text-[17px]'>Apply</h5>
//                                                             </motion.button>
//                                                       </div>
//                                                       <div className='mt-20'>
//                                                             <button
//                                                             type='submit'
//                                                             className='flex flex-col items-center justify-center bg-red-500 text-white 
//                                                             rounded-full px-10 py-6 hover:bg-red-400 w-full
//                                                             shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] group'>
//                                                                   <h5 className='font-semibold text-base sm:text-[20px]'>Place order</h5>
//                                                             </button>
//                                                       </div>
//                                                 </div>
//                                           </div>
//                                     </div>
//                               </div>
//                         </form>
//                   </Form>
//                   <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                         <AlertDialogTrigger asChild>
//                               <button className='hidden'></button>
//                         </AlertDialogTrigger>
//                         <AlertDialogContent>
//                               <AlertDialogHeader>
//                               <AlertDialogTitle>Package ordered!</AlertDialogTitle>
//                               </AlertDialogHeader>
//                               <AlertDialogFooter>
//                               <AlertDialogAction onClick={() => window.location.reload()}>
//                               <p className='text-white'>0K</p>
//                               </AlertDialogAction>
//                               </AlertDialogFooter>
//                         </AlertDialogContent>
//                   </AlertDialog>
//             </div>
//       </motion.div>
//   )
// }

// export default Check
