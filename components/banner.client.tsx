'use client'
import React, { MouseEventHandler } from 'react'

const Banner = ({handleOnClick, buttonText}:{
  handleOnClick:MouseEventHandler<HTMLButtonElement> | undefined,
  buttonText?:string
}) => {
  

  return (
    <div className='mb-12 grid lg:mb-24 lg:grid-cols-2'>
        <div className="z-20 flex flex-col px-20 md:pt-12 sm:text-center lg:items-start lg:pl-0 lg:text-left">
           <h1 className='my-2 flex-wrap'>
             <span className='pr-2 text-white'>Coffee</span>
             <span className='text-gray-900'>Connoisseur</span>
           </h1>
       
    <p className='font-sans text-xl font-semibold text-gray-900 md:mt-5 lg:text-2xl' >Welcome to the cofee shop locator</p>
    <div className='mt-12'>
     <button onClick={handleOnClick}>{buttonText}</button>
    </div>
    </div>
    </div>
  )
}

export default Banner
