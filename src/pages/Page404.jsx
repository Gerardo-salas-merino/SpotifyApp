import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <section className='h-screen flex items-center justify-center bg-blue-950'>
      <div className='text-center rounded-md h-[600px] w-[700px]'>
        
        <div className='justify-center items-center grid mt-[30%]'>
          <h1 className='text-9xl font-bold text-white'>404</h1>
          <h2 className='text-2xl text-gray-600'>Oops! Page not found.</h2>
          <p className='text-gray-500'>We can't find the page you're looking for.</p>
        </div>
      
        
       
        <Link to='/' className='text-blue-500 hover:underline mt-4 block'>Go back to home</Link>
        
        
      </div>
  </section>
  )
}

export default Page404