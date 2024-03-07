import React from 'react'
import Link from 'next/link'

import Theme from './Theme'
import Logo from './Logo'

export default function Navbar() {

    return (
        <nav className='flex px-[5vw] py-[3vh]  z-50 sticky top-0 flex-row items-center justify-between shadow-md backdrop-blur bg-[--clr-base]/50 '>
            <ul className='flex flex-row gap-2 items-center justify-between'>
                <Logo/>
            </ul>
            <ul className='flex flex-row gap-2 font-medium items-center justify-between text-base '>
                <li>
                    <Link href='/discover'>Discover</Link>
                </li>
                <li>
                    <Link href='/community'>Community</Link>
                </li>
                <li>
                <Link href='/careers'>Join the Team</Link>
                </li>
            </ul>
            <ul>
                <Theme/>
            </ul>
        </nav>
    )
}