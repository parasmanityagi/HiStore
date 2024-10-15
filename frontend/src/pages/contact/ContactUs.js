import React, { useEffect } from 'react'

import { HomeBanner } from '../../components';

const ContactUs = () => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = 'Contact Us';

        return () => {
            document.title = originalTitle;
        };
    }, []);
    return (
        <div className='w-full sm:w-[90%] m-auto my-8 px-2 sm:px-0'>
            <HomeBanner text='CONTACT US' />

            <div className='grid grid-cols-3 gap-4 my-8 sm:my-20'>

                {/* first container for contact form */}
                <div className='col-span-3 lg:col-span-2 p-2 shadow-sm border-[1px] rounded-md'>
                    <h1 className='text-[22px] capitalize mb-2'>Contact us</h1>
                    <form className='text-gray-400'>
                        <div className='w-full'>
                            <label htmlFor="username">Username</label>
                            <input className='w-full border-[2px] rounded-md p-2 my-1 outline-none' type="text" />
                        </div>

                        <div className='w-full'>
                            <label htmlFor="email">Email</label>
                            <input className='w-full border-[2px] rounded-md p-2 my-1 outline-none' type="email" />
                        </div>


                        <div className='w-full'>
                            <label htmlFor="message">Message</label>
                            <textarea className='w-full border-[2px] rounded-md p-2 my-1 outline-none' name="message" rows="10" />
                        </div>

                        <button className='w-44 bg-gray-600 p-3 rounded-md my-3 text-white float-end' type="submit">Send Message</button>
                    </form>
                </div>


                {/* second container for contact details */}
                <div className='col-span-3 lg:col-span-1 p-2 shadow-sm h-fit py-4 border-[1px] rounded-md'>
                    <h1 className='text-[22px] capitalize mb-2'>Store information</h1>
                    
                    <div className='text-gray-400 font-light text-[14px]'>
                        <div className='flex flex-row gap-6 flex-wrap mb-2'>
                            <span>
                                <i className='bi bi-geo-alt-fill mr-1' />
                                Address:
                            </span>

                            <span>
                                SP HiStore
                                <br />
                                United States
                            </span>
                        </div>

                        <div className='flex flex-row gap-6 flex-wrap'>
                            <span>
                                <i className='bi bi-envelope-fill mr-1' />
                                Email Us:
                            </span>
                            <span>histore@example.com</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ContactUs