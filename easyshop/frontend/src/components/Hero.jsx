import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 bg-gradient-to-r from-pink-500 to-violet-300 shadow-lg shadow-black rounded-xl'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#000000]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#000000]'></p>
                    <p className=' font-medium text-lg md:text-base text-red-800'>LIVE FOR FASHION</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-3xl leading-relaxed'>Fashion Up Your Look</h1>
                <div className='flex items-center gap-2'>
                    <p className=' font-medium text-xl md:text-base pb-4 text-violet-800'>Live for Influetial and Innovative fashion! </p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='font-medium text-sm md:text-base w-35 h-29 p-2  rounded-lg text-white bg-black'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
      </div>
      {/* Hero Right Side */}
      <img className='w-full rounded-r-lg sm:w-1/2' src={assets.hero} alt="" />
    </div>
  )
}

export default Hero
