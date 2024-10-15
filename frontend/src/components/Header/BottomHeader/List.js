import React, { useState } from 'react';
import one from '../../../assets/1.jpg';
import two from '../../../assets/2.png';
import three from '../../../assets/3.png';
import four from '../../../assets/4.png';
import five from '../../../assets/5.jpg';

const List = ({ mouseEvent, title }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (item) => setHoveredItem(item)

    const handleMouseLeave = () => setHoveredItem(null);

    const categories = [
        {
            title: 'FASHION',
            image: one,
            items: ['Men Fashion', 'Women Fashion', 'Handbags', 'Western Wear', 'T-Shirt']
        },
        {
            title: 'SPORTS',
            image: two,
            items: ['T-Shirts', 'Motorcycles', 'Blouses', 'Car Lights', 'Car Accessories']
        },
        {
            title: 'TRAVEL & VACATION',
            image: three,
            items: ['Hotels & Resorts', 'Best Tours', 'Vacation Rentals', 'Infocus', 'Restaurants']
        },
        {
            title: 'ELECTRONICS',
            image: four,
            items: ['Mobile & Tablets', 'Head Phones', 'USB & HDD', 'Laptop', 'Sound']
        },
        {
            title: 'GEAR',
            image: five,
            items: ['Scarest', 'G25Silver', 'Pear Jewelry', 'Hammock', 'Telescope']
        }
    ];

    return (
        <div
            onMouseLeave={() => mouseEvent(title)}
            className='absolute top-14 left-0 bg-white text-gray-500 flex flex-row gap-6 justify-between p-6 items-center w-full shadow-md z-10'
        >
            {categories.map((category, index) => (
                <div key={index} className={`${index === 0 ? "" :"border-l-[1px] pl-6"} w-[20%]`}>
                    {title !== 'shop' && (
                        <img className='mb-2' src={category.image} alt={category.title} />
                    )}
                    <h1 className='mb-2 text-black font-normal text-[16px]'>{category.title}</h1>
                    <ul className='flex flex-col gap-3 text-[14px] capitalize'>
                        {category.items.map((item, idx) => (
                            <li
                                key={idx}
                                className='hover:text-orange-400'
                                onMouseEnter={() => handleMouseEnter(`${category.title}-${item}`)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hoveredItem === `${category.title}-${item}` && (
                                    <div className="inline-flex h-0.5 mr-1 mb-1 bg-orange-400 transform" />
                                )}
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default List;
