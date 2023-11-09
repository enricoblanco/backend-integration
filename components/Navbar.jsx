'use client'

import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export const Navbar = () => {
  const { data: session } = useSession()

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

          {session
            ? (
            <>

                <li>{session.user.name}</li>
                <li>
                <button onClick={() => signOut()}>
                  Logout
                </button>
                </li>
            </>
              )
            : (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/signup">
                <li>SignUp</li>
              </Link>
            </>
              )}
        </div>
      </ul>
    </div>
  )
}
