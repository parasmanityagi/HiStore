import React from 'react'
import skirtsDresses from '../../assets/skirts-dresses.jpg'
import trousersJeans from '../../assets/trousers-jeans.jpg'
import shoesSandals from '../../assets/shoes-sandals.jpg'
import bagBackpacks from '../../assets/bag-backpacks.jpg'

const Category = () => {
    return (
        <div className='text-center'>
            <h1 className='uppercase text-[22px] font-medium'>Shop By Category</h1>
            <div className='m-auto w-16 h-0.5 my-2 bg-orange-400 rounded-md'/>
            <p className='text-gray-400 text-[12px] md:text-[14px] mb-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                <br/>dolore magna aliqua. Ut enim ad minim veniam
            </p>

            <div className='flex flex-row flex-wrap md:flex-nowrap justify-evenly md:justify-between items-start gap-6'>
                <div className='cursor-pointer min-h-52 w-60'>
                    <img className='hover:opacity-65 w-full' src={skirtsDresses} alt="skirts-dresses" />
                    <h2 className='uppercase hover:text-orange-400 text-[14px] sm:text-[16px]'>Skirts & Dresses </h2>
                    <p className='text-gray-400 text-[12px] sm:text-[14px]'>9 Products</p>
                </div>

                <div className='cursor-pointer min-h-52 w-60'>
                    <img className='hover:opacity-65 w-full' src={trousersJeans} alt="trousers-jeans" />
                    <h2 className='uppercase hover:text-orange-400 text-[14px] sm:text-[16px]'>Trousers & Jeans</h2>
                    <p className='text-gray-400 text-[12px] sm:text-[14px]'>3 Products</p>
                </div>

                <div className='cursor-pointer min-h-52 w-60'>
                    <img className='hover:opacity-65 w-full' src={bagBackpacks} alt="bag-backpacks" />
                    <h2 className='uppercase hover:text-orange-400 text-[14px] sm:text-[16px]'>Bag & Backpacks</h2>
                    <p className='text-gray-400 text-[12px] sm:text-[14px]'>3 Products</p>
                </div>

                <div className='cursor-pointer min-h-52 w-60'>
                    <img className='hover:opacity-65 w-full' src={shoesSandals} alt="shoes-sandals" />
                    <h2 className='uppercase hover:text-orange-400 text-[14px] sm:text-[16px]'>Shoes & Sandals</h2>
                    <p className='text-gray-400 text-[12px] sm:text-[14px]'>1 Products</p>
                </div>
            </div>
        </div>
    )
}

export default Category