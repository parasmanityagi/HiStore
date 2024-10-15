import React, { useState } from 'react'
import { brands } from '../../utls/data.js'

const Brand = () => {
    const numbersArray = Array.from({ length: 12 }, (_, index) => index + 1);

    const initialState = numbersArray.reduce((acc, number) => {
        acc[number] = false;
        return acc;
    }, {});

    const [isHover, setIsHover] = useState(initialState);

    const openHover = (val) => {
        setIsHover(prev => ({
            ...prev, [val]: true
        }));
    }

    const closeHover = () => {
        setIsHover(initialState);
    }

    return (
        <div className='my-20'>
            <h1 className='text-[22px] font-medium uppercase text-center w-full'>Featured Brands</h1>
            <div className='h-0.5 w-14 my-2 m-auto rounded-md bg-orange-400' />

            <ul className='flex flex-row flex-wrap gap-6 h-60 sm:h-80 overflow-auto justify-evenly sm:justify-between items-center mt-4'>
                {
                    brands.map((brand, idx) => (
                        <li
                            key={idx}
                            onMouseOver={() => openHover(idx + 1)}
                            onMouseLeave={closeHover}
                            className={`w-24 sm:w-44 h-24 sm:h-44 rounded-md p-2 shadow-md ${isHover[idx + 1] && 'border-[1px] shadow-lg' }`}
                        >
                            <img src={brand} alt={`brand-${idx}`} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Brand;
