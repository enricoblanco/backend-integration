'use client'

import Link from 'next/link'
import React from 'react'

const Signup = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    console.log({name, email, password})
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
