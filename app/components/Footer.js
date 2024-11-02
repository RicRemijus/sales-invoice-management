import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black text-white py-4'>
        <div className="container mx-auto text-center">
            <strong>&copy; {new Date().getFullYear()} Remijus. All rights reserved.</strong>
        </div>
    </footer>
  )
}

export default Footer;