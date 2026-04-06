"use client"

import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import Link from 'next/link'

const NavMobile = () => {

      const links = [
            {
                  name: "home",
                  path: "/"
            },
            {
                  name: "about",
                  path: "/about"
            },
            {
                  name: "Notary Public",
                  path: "https://Notary.mhmdigital.us/"
            },
            {
                  name: "services",
                  path: "/services"
            },
            {
                  name: "packages",
                  path: "/packages"
            },
            {
                  name: "get in touch",
                  path: "/contact"
            },
      ]
      const pathName = usePathname()

      const [open, setOpen] = useState<Boolean>(false)

      const toggle = () => {
      setOpen(!open)
      }

  return (
    <div className='xl:hidden'>
      <button className='size-8 sm:size-10 
      rounded-full flex items-center justify-center bg-red-500 text-white 
      shadow-[rgba(13,38,76,0.19)_0px_9px_20px]'>
            <div onClick={toggle}>
                  {
                        open ? <RiCloseFill color='white' className='text-base md:text-xl cursor-pointer' /> : 
                        <RiMenu3Fill color='white' className='text-base md:text-xl cursor-pointer' />
                  }
                  
            </div>
      </button>
      <div className={`absolute shadow-sm transition-all duration-500 
            ${open ? 'top-[6.3rem] bg-white left-0 right-0 z-50 transition-all duration-500 ease-in-out min-h-screen' 
            : '-top-250 left-0 right-0 transition-all duration-500 ease-in-out min-h-screen'}`}>
            <hr />
            <div className='px-4 flex flex-col items-start justify-start gap-10 py-8'>
            {links.map((link, index) => (
                  <Link
                  key={index} href={link.path} className={`${link.path === pathName && "text-gray-500 border-b-2 border-gray-500"}
                  capitalize font-medium hover:text-gray-500 transition-all w-fit text-base duration-300
                  `}>
                        <h5 onClick={toggle}>{link.name}</h5>
                  </Link>
            ))}
            </div>
      </div>
    </div>
  )
}

export default NavMobile
