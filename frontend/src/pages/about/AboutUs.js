import React, { useEffect } from 'react'

import { HomeBanner } from '../../components'
import aboutUsImg from '../../assets/image-about-us.jpg'

const AboutUs = () => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = 'About Us';

        return () => {
            document.title = originalTitle;
        };
    }, []);
    return (
        <div className='w-full sm:w-[90%] m-auto my-8 px-2 sm:px-0'>
            <HomeBanner text='ABOUT US' />

            <div className='my-8 sm:my-20'>
                <img className='w-full mb-5' src={aboutUsImg} alt="about-us" />

                <div className='text-center'>
                    <h2 className='text-[20px]'>About Us</h2>

                    <p className='text-gray-400 text-[14px]'>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis partrient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                        <br /><br/>
                        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.

                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs