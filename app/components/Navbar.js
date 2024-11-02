import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="bg-black">
        <div className="container h-16 flex justify-between items-center">
            <div className="ml-16 text-white">                           
               <Link href='/' className="font-bold">Total<span className="text-[red] text-1xl">Secure</span></Link>
            </div>
            <nav>
            <ul className="flex space-x-4 text-white">
            <li><Link href={'/'} className='hover:text-[crimson]' >Products</Link></li>
            <li><Link href={'/'} className='hover:text-[crimson]'>Services</Link></li>
            <li><Link href={'/'} className='hover:text-[crimson]'>About Us</Link></li>
            <li><Link href={'/'} className='hover:text-[crimson]'>Contact Us</Link></li>
        </ul>
            </nav>
        </div>
        
    </header>
  )
}

export default Navbar;