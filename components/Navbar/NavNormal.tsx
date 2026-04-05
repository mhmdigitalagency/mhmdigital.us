"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavNormal = () => {
    const links = [
        {
            name: "home",
            path: "/",
        },
        {
            name: "about",
            path: "/about",
        },
        {
            name: "Notary Public",
            path: "https://Notary.mhmdigital.us/",
            external: true,
        },
        {
            name: "services",
            path: "/services",
        },
        {
            name: "packages",
            path: "/packages",
        },
        // {
        //     name: "case studies",
        //     path: "/case-studies",
        // },
    ];

    const pathName = usePathname();

    return (
        <div className="hidden xl:flex items-center gap-7 text-[15px]">
            {links.map((link, index) => (
                link.external ? (
                    <a
                        key={index}
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="capitalize font-medium hover:text-red-500 transition-all"
                    >
                        <h5>{link.name}</h5>
                    </a>
                ) : (
                    <Link
                        key={index}
                        href={link.path}
                        className={`${link.path === pathName && "text-red-500 border-b-2 border-red-500"}
                        capitalize font-medium hover:text-red-500 transition-all`}
                    >
                        <h5>{link.name}</h5>
                    </Link>
                )
            ))}
        </div>
    );
};

export default NavNormal;
