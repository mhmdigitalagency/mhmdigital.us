"use client"

import { User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SignInButton = () => {

  const pathName = usePathname()
  const link = [
    {
      name: "Sign in",
      path: "/connexion"
    }
  ]

  return (
    <>
      {
        link.map((item, index) => (
          <Link key={index} href={item.path} 
            className={`${pathName === item.path && "text-red-500 border-b-2 border-red-500"} 
            flex hover:text-red-500 duration-300 text-sm md:text-[15.5px] font-medium gap-1 items-start`}>
                <User className='size-5 md:size-6' /><span className='hidden sm:block'>{item.name}</span>
          </Link>
        ))
      }
    </>
  )
}

export default SignInButton
