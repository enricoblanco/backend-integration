'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Signup = () => {

  const [error, setError] = useState(null)
  const router = useRouter()

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    setError('')
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    if(!isValidEmail(email)) {
      setError('Invalid email')
      return;
    }

    if(!password || password.length < 8) {
      setError('Password is invalid')
      return;
    }
    
    try {
      const res = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
    
      if (res.status === 400) {
        setError('E-mail already exists');
      } else if (res.status === 201) {
        setError(null);
        router.push('/login');
      } else {
        setError('Unexpected response status: ' + res.status);
      }
    } catch (err) {
      console.log(err);
      setError('Something went wrong');
    }
  }

  return(
    <div className='flex flex-col items-center justify-between p-24'>
      <div className='bg-[#212121] p-8 rounded shadow-md w-96'>
        <h1 className='text-4xl text-center font-semibold mb-8'>Register</h1>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 text-black'>
            <input 
              required 
              type='text' 
              placeholder='Name' 
              className='p-2 rounded outline-none' 
            />
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
            <button type='submit' className='p-2 rounded bg-[#4285F4] text-white font-semibold'>Register</button>
            {error && <p className='text-red-500 text-center'>{error}</p>}
        </form>
        <div className='flex items-center gap-2 mt-4'>
          <hr className='w-full'/>
          <p className='text-center'>OR</p>
          <hr className='w-full'/>
        </div>
        <Link href='/login'>
          <p className='text-center mt-4 cursor-pointer'>Already have an account? Login</p>
        </Link>
      </div>
    </div>
  )
}

export default Signup
