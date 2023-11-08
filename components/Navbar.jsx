import React from 'react'
import Link from 'next/link'


export const Navbar = () => {
  return (
    <div>
      <ul className='flex justify-between items-center'>
        <div>
          <Link href="/">
            <li>Home</li>
          </Link>
        </div>
        <div className='flex gap-10'>
          <Link href="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link href="/login">
            <li>Login</li>
          </Link>
          <Link href="/signup">
            <li>SignUp</li>
          </Link>
        </div>
      </ul>
    </div>
  )
}
