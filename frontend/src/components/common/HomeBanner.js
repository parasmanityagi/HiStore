import React from 'react'
import { Link } from 'react-router-dom'

import bgImg from '../../assets/breadcumb.jpg'
const HomeBanner = ({text}) => {
    return (
        <div className='relative flex justify-center items-center h-52 sm:h-fit w-full'>
            <img className='h-full sm:h-fit' src={bgImg} alt="background_image" />
            <div className='absolute top-[40%] left-0 w-full'>
                <h1 className='text-[22px] font-medium text-center'>{text}</h1>
                <div>
                    <Link to='/' className='w-fit m-auto hover:text-blue-500 text-orange-400 block text-center'>Home</Link>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner