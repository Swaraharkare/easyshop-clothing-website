import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-9 flex flex-col justify-center md:flex-row gap-10 mb-28 shadow-2xl p-6 border border-gray-200'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-rose-600'>Our Store</p>
          <p className=' text-black'>easyshop Private Limited,
            <br /> Buildings Alyssa, Begonia & 
            <br />Clove Embassy Tech Village,
             <br /> Outer Ring Road Devarabeesanahalli Village, 
             <br />Bengaluru, 560103, Karnataka, India</p>
          <p className=' text-gray-700'>Tel: 044-45614700 <br /> Email: admin@easyshop.com</p>
          </div>
      </div>

      
    </div>
  )
}

export default Contact
