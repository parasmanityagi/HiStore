import React, { useEffect } from 'react'

import { HomeBanner } from '../../components';
import errorImg from '../../assets/error.jpeg'

const Error = () => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = 'Page Not Found'; 

        return () => {
            document.title = originalTitle;
        };
    }, []);
    return (
        <div className='w-full sm:w-[90%] m-auto my-8 px-2 sm:px-0'>
            <HomeBanner text='Page Not Found' />

            <div className='my-8 sm:my-20'>
                <img className='w-full sm:w-1/2 m-auto mb-5' src={errorImg} alt="error-page" />
            </div>
        </div>
    )
}

export default Error