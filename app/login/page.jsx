'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const session = useSession()

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [session, router])

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    setError('')
    e.preventDefault()

    const email = e.target[0].value
    const password = e.target[1].value

    if (!isValidEmail(email)) {
      setError('Invalid email')
      return
    }

    if (!password || password.length < 8) {
      setError('Password is invalid')
      return
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (res?.error) {
      console.log(res.error)
      setError('Invalid email or password')
      if (res?.url) router.replace('/dashboard')
    } else {
      setError(null)
      router.replace('/dashboard')
    }
  }
  return (
    <div className='flex flex-col items-center justify-between p-24'>
    <div className='bg-[#212121] p-8 rounded shadow-md w-96'>
      <h1 className='text-4xl text-center font-semibold mb-8'>Login</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 text-black'>
          <input
            required
            type='email'
            placeholder='Email'
            className='p-2 rounded outline-none'
          />
          <input
            required
            type='password'
            placeholder='Password'
            className='p-2 rounded outline-none'
          />
          {/* <input
            required
            type='password'
            placeholder='Confirm Password'
            className='p-2 rounded outline-none'
          /> */}
          <button type='submit' className='p-2 rounded bg-[#4285F4] text-white font-semibold'>Login</button>
          {error && <p className='text-red-500 text-center'>{error}</p>}
      </form>
      <div className='flex items-center gap-2 mt-4'>
        <hr className='w-full'/>
        <p className='text-center'>OR</p>
        <hr className='w-full'/>
      </div>
      <Link href='/signup'>
        <p className='text-center mt-4 cursor-pointer'>Resgister</p>
      </Link>
    </div>
  </div>
  )
}

export default Login
