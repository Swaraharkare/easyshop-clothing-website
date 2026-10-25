import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-9 flex flex-col md:flex-row gap-16 shadow-2xl p-6 border border-gray-200'>
          <img className='w-full md:max-w-[550px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Welcome to <span className='text-pink-500 font-semibold text-lg'>easyshop</span>!</p>
              <p>
We are an online clothing store that's all about helping you look and feel your best. Whether you're dressing up for a special day or keeping it casual, we have got clothes that match your style and make you feel confident.

Our goal is to bring you great quality, trendy, and comfortable clothing at prices that make sense. We believe that fashion should be fun, easy, and for everyone.
</p>
              <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
              <p>Thanks for stopping by—we're so glad you're here!</p>

              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission is to make stylish, comfortable, and affordable clothing for everyone. We want to help people feel good in what they wear, every day.We're here to bring you fresh fashion, easy shopping, and a great experience—because getting dressed should be fun and simple.</p>
              
          </div>
          
      </div>
<div className='shadow-2xl p-5 border border-gray-200 mb-10'>
      <div className=' text-xl py-4 '>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'> We promise top quality in every piece—carefully checked for comfort, fit, and durability.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>Shop anytime, anywhere with fast delivery and easy returns.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>We're here to help—friendly support, quick responses, and customer care you can count on.</p>
          </div>
      </div>
</div>
      
      
    </div>
  )
}

export default About
