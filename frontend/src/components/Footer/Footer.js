import React, { useState, useEffect } from 'react';
import payment from '../../assets/payment.png'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='w-full px-2 lg:px-0 lg:w-[90%] m-auto mt-20 mb-10 relative'>
      <div className='flex flex-col md:flex-row items-start'>
        <div className='w-full md:w-2/6'>
          <h3 className='text-[18px] font-medium uppercase w-full'>Contact Details</h3>
          <div className='h-0.5 w-14 my-2 rounded-md bg-orange-400' />
          <div className='text-[14px] text-gray-400 my-5'>
            <i className='bi bi-house-door text-black text-[15px]' />
            <span>
              <span className='text-black text-[15px] ml-1'>Address: </span>No 40 Baria Thai Ha Sreet 133/2 NewYork, USD.
            </span>
          </div>
          <div className='text-[14px] text-gray-400 my-5'>
            <i className='bi bi-send text-black text-[15px]' />
            <span>
              <span className='text-black text-[15px] ml-1'>Email: </span>example@ecommerce.com
            </span>
          </div>
          <div className='text-[14px] text-gray-400 my-5'>
            <i className='bi bi-telephone text-black text-[15px]' />
            <span>
              <span className='text-black text-[15px] ml-1'>Phone: </span>(888) 1900 86420 - (444) 1900 56789
            </span>
          </div>
        </div>

        <div className='w-full md:w-1/6'>
          <h3 className='text-[18px] font-medium uppercase w-full'>Information</h3>
          <div className='h-0.5 w-14 my-2 rounded-md bg-orange-400' />
          <ul className='text-[14px] text-gray-400 my-5'>
            <li className='mb-3 capitalize'>about store</li>
            <li className='mb-3 capitalize'>new collection</li>
            <li className='mb-3 capitalize'>contact us</li>
            <li className='mb-3 capitalize'>latest news</li>
            <li className='mb-3 capitalize'>our sitemap</li>
          </ul>
        </div>

        <div className='w-full md:w-1/6'>
          <h3 className='text-[18px] font-medium uppercase w-full'>Customer Care</h3>
          <div className='h-0.5 w-14 my-2 rounded-md bg-orange-400' />
          <ul className='text-[14px] text-gray-400 my-5'>
            <li className='mb-3 capitalize'>my account</li>
            <li className='mb-3 capitalize'>faqs</li>
            <li className='mb-3 capitalize'>gifts sports</li>
            <li className='mb-3 capitalize'>about us</li>
            <li className='mb-3 capitalize'>extras</li>
          </ul>
        </div>

        <div className='w-full md:w-2/6'>
          <h3 className='text-[18px] font-medium uppercase w-full'>Follow Socials</h3>
          <div className='h-0.5 w-14 my-2 rounded-md bg-orange-400' />
          <ul className='text-[14px] text-gray-400 my-5'>
            <li className='mb-3 capitalize'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </li>
            <li className='mt-6 capitalize flex flex-wrap gap-2'>
              <i className='flex-nowrap bi bi-facebook bg-blue-600 p-3 text-white text-[16px] rounded-sm' />
              <i className='flex-nowrap bi bi-twitter bg-sky-400 p-3 text-white text-[16px] rounded-sm' />
              <i className='flex-nowrap bi bi-google bg-amber-600 p-3 text-white text-[16px] rounded-sm' />
              <i className='flex-nowrap bi bi-pinterest bg-red-600 p-3 text-white text-[16px] rounded-sm' />
              <i className='flex-nowrap bi bi-linkedin bg-zinc-600 p-3 text-white text-[16px] rounded-sm' />
            </li>
          </ul>
        </div>
      </div>

      <div className='w-full my-10 h-[1px] bg-gray-400' />

      <div className='flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center'>
        <span className='text-gray-400 text-[14px]'>
          SP HiStore 2024 Demo Store. Designed By <span className='text-orange-500'>/parasmanityagi</span>
        </span>
        <img className='h-fit sm: h-8 sm:w-fit w-full' src={payment} alt="payment_methods" />
        {isVisible && (
          <span
            onClick={scrollToTop}
            className='fixed bottom-2 right-1 py-0.5 px-2 cursor-pointer rounded-full bg-gray-700 text-white text-[30px]'
          >
            <i className='bi bi-chevron-double-up' />
          </span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
