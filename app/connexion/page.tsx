// "use client"

// import React, { useState } from 'react'
// // import { useRouter } from "next/navigation";
// import { useToast } from '@/components/ui/use-toast';
// import { Input } from "@/components/ui/input"
// import { Eye, Mail } from 'lucide-react'
// import Link from 'next/link'
// import {z} from 'zod'
// import { redirect, useSearchParams } from 'next/navigation'
// import { useTransition } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { loginSchema } from '@/schemas'
// import {
//       Form,
//       FormControl,
//       FormField,
//       FormItem,
//       FormMessage,
//     } from "@/components/ui/form"
// import { FormError } from '@/components/form-error'
// import { FormSuccess } from '@/components/form-success'
// // import { signIn, useSession } from 'next-auth/react'
// // import { login } from '@/actions/login'
// import Google from '@/components/svg/Google'
// import { Button } from '@/components/ui/button'
// import { DEFAULT_LOGIN_REDERICT } from '@/routes'
// import {motion} from 'framer-motion'
// import Image from 'next/image';
// import image1 from '@/public/images/3.png'

//     type Input = z.infer<typeof loginSchema>;

// const Page = () => {

//       // const router = useRouter();
//       const {toast} = useToast()
//       // const searchParams = useSearchParams()
//       // const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
//       // ? "Email already in use with different provider"
//       // : ""
//       const [error, setError] = useState<string | undefined>("");
//       const [success, setSuccess] = useState<string | undefined>("");
//       const [isPending, startTransition] = useTransition()
//       const form = useForm<Input>({
//             resolver: zodResolver(loginSchema),
//             defaultValues: {
//                   email: "",
//                   password: "",
//             }
//         })

//       // const onSubmit = (values: z.infer<typeof loginSchema>) => {
//       //       setError("")
//       //       setSuccess("")

//       //       startTransition(() => {
//       //             login(values)
//       //             .then((data) => {
//       //                   setError(data?.error)
//       //                   toast({
//       //                         title: "Success",
//       //                         description: "Utilisateur connecté",
//       //                         variant: "default"
//       //                   })
//       //                   window.location.reload()
//       //             })
//       //       })
//       // }

//       // const onClick = (provider: "google" | "github") => {
//       //       signIn(provider, {
//       //             callbackUrl: DEFAULT_LOGIN_REDERICT,
//       //       })
//       // }

//       // const session = useSession()
//       // const user = session.data?.user

//       // if(user) return redirect('/settings')

//   return (
//     <div className='pt-[80px] container pb-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[25rem]'>
//       <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, transition: {duration: 0.8, delay: 0.3} }}  
//       className='w-full flex flex-col items-center justify-center'>
//                   <Form {...form}>
//                         <form className='px-10 py-10 border rounded-2xl w-full lg:w-[55%]' 
//                         // onSubmit={form.handleSubmit(onSubmit)}
//                         >
//                               <div className='flex flex-col items-center justify-center mb-5'>
//                                     <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw'
//                                     className='w-[10%]' />
//                                     <p>You don't have an account?</p>
//                                     <Link href={'/inscription'} className='hover:underline duration-300 text-gray-500'>
//                                           Sign up
//                                     </Link>
//                               </div>
//                               <div className='flex flex-col items-center justify-between gap-5 mb-7'>
//                                     <div className='flex items-center rounded-full p-3 gap-2 w-full'>
//                                           {/* email */}
//                                           <FormField
//                                           control={form.control}
//                                           name="email"
//                                           render={({ field }) => (
//                                                 <FormItem className='w-full'>
//                                                       <FormControl>
//                                                             <Input placeholder="example@gmail.com" {...field}
//                                                                   disabled={isPending} 
//                                                                   className='border rounded-full text-xl px-4 py-8 placeholder:text-base'
//                                                             />
//                                                       </FormControl>
//                                                       <FormMessage />
//                                                 </FormItem>
//                                           )}
//                                           />
//                                           <Mail className='text-gray-400' size={36} />
//                                     </div>
//                                     <div className='flex items-center rounded-full p-3 gap-2 w-full'>
//                                           {/* password */}
//                                           <FormField
//                                           control={form.control}
//                                           name="password"
//                                           render={({ field }) => (
//                                                 <FormItem className='w-full'>
//                                                 <FormControl>
//                                                       <Input placeholder="Password" {...field} type='password'
//                                                             disabled={isPending} 
//                                                             className='border rounded-full text-xl px-4 py-8 placeholder:text-base'
//                                                       />
//                                                 </FormControl>
//                                                 <FormMessage />
//                                                 </FormItem>
//                                           )}
//                                           />
//                                           <Eye className='text-gray-400' size={36} />
//                                     </div>  
//                               </div>
//                               <FormError message={error} />
//                               <br />
//                               <FormSuccess message={success} />
//                               <div className='flex flex-col items-center justify-center mt-6'>
//                                           <Button disabled={isPending}  type='submit' 
//                                           className='flex items-center justify-center gap-2 w-full bg-red-500 text-white 
//                                           rounded-full px-10 py-8 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:bg-red-600'>
//                                                 <h5 className='font-semibold text-[20px]'>Sign in</h5>
//                                           </Button>
//                               </div>
//                               <h5 className='flex flex-col items-center justify-center mt-3'>Or</h5>
//                         <hr />
//                         <div className='flex items-center justify-center mt-4'>
//                               <Button 
//                               // onClick={() => onClick('google')} 
//                               variant='outline' type='button' 
//                               className='flex items-center gap-3 py-7 rounded-full w-full hover:bg-slate-200'>
//                                     <Google />
//                                     <p className='text-xl font-light'>Connect with Google</p>
//                               </Button>
//                         </div>
//                         </form>
//                   </Form>
//             </motion.div>
//     </div>
//   )
// }

// export default Page

import LoginForm from '@/components/AuthPages/Login-form'
import { MagicLinkLoginForm } from '@/components/magic-link-login-form'
import ReturnButton from '@/components/return-button'
import SignInOAuthButton from '@/components/sign-in-oauth-button'
import Link from 'next/link'
import Image from 'next/image';
import image1 from '@/public/images/3.png'

type Props = {
  searchParams: Promise<{
    callbackURL?: string;
  }>;
};

function safeCallback(cb?: string) {
  const value = cb?.trim();
  if (!value) return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  return value;
}

const page = async ({ searchParams }: Props) => {
      const sp = await searchParams;
      const callbackURL = safeCallback(sp?.callbackURL);

  return (
      <div className='min-h-screen bg-slate-100'>
            <div className='px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10 md:py-20'>
                  <ReturnButton href='/' label='Back to home' />
                  <br />
                  <div className="py-10 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto bg-white rounded-md shadow-md px-6 mt-8">
                        <div className='mb-8 border-b py-3 w-full flex items-center justify-center gap-4 flex-col'>
                              <Image src={image1} alt='image1' priority width={0} height={0} sizes='100vw'
                              className='w-12' />
                              <h5 className='text-center text-xl md:text-2xl font-semibold'>Sign in</h5>
                        </div>
                        <div className="mb-8">
                              <h5 className="text-xs md:text-sm font-medium leading-snug max-w-full md:max-w-md">
                                    Welcome back
                              </h5>
                              <h5 className="mt-2 text-xs md:text-sm font-medium leading-snug max-w-full md:max-w-md">
                                    Sign in to access your orders, saved designs, and checkout faster.
                              </h5>
                        </div>
                        <LoginForm callbackURL={callbackURL ?? undefined} />
                        <div className="flex items-center gap-4 w-full my-6">
                              <div className="flex-1 h-px bg-gray-300"></div>

                              <span className="text-sm font-medium uppercase">
                              or
                              </span>

                              <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                        <div className='my-8 w-full flex flex-col justify-center items-center gap-4'>
                              <SignInOAuthButton provider="google" callbackURL={callbackURL ?? undefined} />
                        </div>
                        {/* <MagicLinkLoginForm callbackURL={callbackURL ?? undefined} /> */}
                        <div className="mt-8 flex items-center gap-1 text-xs md:text-sm">
                              <p className="">
                                    You don&apos;t have an account ?
                              </p>
                              <Link href={callbackURL ? `/inscription?callbackURL=${encodeURIComponent(callbackURL)}` : "/inscription"} className='underline text-black hover:text-blue-400 
                              transition-all duration-500'>
                                    Sign up
                              </Link>
                        </div>
                        <div className="mt-8 flex items-center gap-3 flex-wrap text-ss md:text-xs font-medium">
                              <Link href={'/help'} className='hover:underline hover:text-blue-400
                              transition-all duration-500'>
                                    Need Help?
                              </Link>
                              <Link href={'/privacy'} className='hover:underline hover:text-blue-400
                              transition-all duration-500'>
                                    Privacy
                              </Link>
                        </div>
                  </div>
            </div>
      </div>
  )
}

export default page
