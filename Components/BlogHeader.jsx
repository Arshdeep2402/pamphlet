"use client"
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const BlogHeader = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.status === 200) {
      setMessage('You have subscribed successfully!');
      setIsSuccess(true);
      setEmail('');
    } else {
      setMessage(data.message || 'An error occurred. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} /> </button>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]' onSubmit={handleSubmit}>
          <input 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your Email' 
            className='pl-4 outline-none' 
          />
          <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white' >
            Subscribe
          </button>
        </form>
        {message && (
          <p className={`mt-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default BlogHeader
