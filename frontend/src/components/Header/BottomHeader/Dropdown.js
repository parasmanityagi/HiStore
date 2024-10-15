import React, { useState } from 'react'

const Dropdown = ({ mouseEvent, title }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    let [open, setopen] = useState(false)

    const handleMouseEnter = (item) => setHoveredItem(item)

    const handleMouseLeave = () => setHoveredItem(null);
    return (
        <ul
            onMouseLeave={() => mouseEvent(title)}
            className='absolute top-14 bg-white text-gray-500 w-48 flex flex-col gap-4 p-4 shadow-md z-10'
        >
            <li
                className='hover:text-orange-400 relative'
                onMouseEnter={() => handleMouseEnter('mobile & table')}
                onMouseOver={()=>setopen(true)}
                onMouseLeave={handleMouseLeave}
            >
                {hoveredItem === 'mobile & table' && (
                    <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                )}
                <span>Mobile & Table</span>
                <i className='ml-2 bi bi-chevron-right' />

                {open && 
                    <ul onMouseLeave={()=>setopen(false)} className='absolute top-0 left-[110%] bg-white text-gray-500 flex flex-col gap-4 pb-4 px-4 w-60 shadow-md z-10'>
                        <li
                            className='hover:text-orange-400 border-b-[1px] pb-1'
                            onMouseEnter={() => handleMouseEnter('Laptops & Tablets')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hoveredItem === 'Laptops & Tablets' && (
                                <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                            )}
                            Laptops & Tablets
                        </li>
                        <li
                            className='hover:text-orange-400 border-b-[1px] pb-1'
                            onMouseEnter={() => handleMouseEnter('Computer Accessories')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hoveredItem === 'Computer Accessories' && (
                                <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                            )}
                            Computer Accessories
                        </li>
                        <li
                            className='hover:text-orange-400 border-b-[1px] pb-1'
                            onMouseEnter={() => handleMouseEnter('Printing Services')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hoveredItem === 'Printing Services' && (
                                <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                            )}
                            Printing Services
                        </li>
                        <li
                            className='hover:text-orange-400 border-b-[1px] pb-1'
                            onMouseEnter={() => handleMouseEnter('Paper & Paperboard')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hoveredItem === 'Paper & Paperboard' && (
                                <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                            )}
                            Paper & Paperboard
                        </li>
                        <li
                            className='hover:text-orange-400'
                            onMouseEnter={() => handleMouseEnter('Transport Packagi')}
                            onMouseLeave={handleMouseLeave}
                        >
                            {hoveredItem === 'Transport Packagi' && (
                                <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                            )}
                            Transport Packagi
                        </li>
                    </ul>}
            </li>
            <li
                className='hover:text-orange-400'
                onMouseEnter={() => handleMouseEnter('headphone')}
                onMouseLeave={handleMouseLeave}
            >
                {hoveredItem === 'headphone' && (
                    <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                )}
                Headphone
            </li>
            <li
                className='hover:text-orange-400'
                onMouseEnter={() => handleMouseEnter('laptop')}
                onMouseLeave={handleMouseLeave}
            >
                {hoveredItem === 'laptop' && (
                    <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                )}
                Laptop
            </li>
        </ul>
    )
}

export default Dropdown