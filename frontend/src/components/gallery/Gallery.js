import React from 'react'
import { gallery } from '../../utls/data'


const Gallery = () => {
    return (
        <div className='my-20'>
            <h1 className='text-[22px] font-medium uppercase text-center w-full'>Gallery Image</h1>
            <div className='h-0.5 w-14 my-2 m-auto rounded-md bg-orange-400' />

            <ul className='flex flex-row flex-nowrap items-center mt-4 overflow-y-auto'>
                {
                    gallery.map((img, idx) => (
                        <li
                            key={idx}
                            className='rounded-md p-2 min-w-24 min-h-24'                        >
                            <img src={img} alt={`gallery-${idx}`} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Gallery