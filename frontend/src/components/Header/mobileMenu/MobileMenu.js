import React, { useEffect, useState } from 'react'
import { Electronics, Fashion, Gear, mobileTablet, poster, Shop, Sport, travelVacation } from '../../../utls/data.js'
import { UlList } from '../../index.js'
import { Link } from 'react-router-dom';

const MobileMenu = ({ closeMenu }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    let [active, setActive] = useState({ shop: false, features: false, electronics: false });

    let initialState = Shop.reduce((acc, element) => {
        acc[element] = false
        return acc;
    }, {})

    let [subCategoryActive, setSubCategoryActive] = useState(initialState)

    let[mobileSubCategory, setSubCategory] = useState(false)

    let open = (name) => {
        setActive(prev => ({
            ...prev, [name]: true
        }));
    }

    let close = (name) => {
        setActive(prev => ({ ...prev, [name]: false }))

        if (name === 'shop') {
            const resetHoverState = Object.keys(subCategoryActive).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});

            setSubCategoryActive(resetHoverState);
        }
    }


    let openSubCategory = (name) => {
        setSubCategoryActive(prev => ({
            ...prev, [name]: true
        }))
    }

    let closeSubCategory = (name) => {
        setSubCategoryActive(prev => ({
            ...prev, [name]: false
        }))
    }

    return (
        <div className='fixed top-0 left-0 bg-black h-full text-white w-72 overflow-y-auto' style={{ zIndex: 9999 }}>
            <div className='text-[22px] font-medium p-2 border-b-[1px]'>
                <h1 className='inline w-fit'>MENU</h1>
                <i onClick={() => closeMenu(false)} className='cursor-pointer bi bi-x float-end' />
            </div>

            <ul className=''>
                <li className='border-b-[1px]'>
                    <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-1'>
                        <div className='p-2 '>Shop</div>
                        {
                            !active.shop ?
                                <i onClick={() => open('shop')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                :
                                <i onClick={() => close('shop')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                        }
                    </div>
                    <ul className={`px-2 pb-2 border-t-[1px] ${!active.shop && 'hidden'}`}>

                        <li className='border-b-[1px]'>
                            <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-2'>
                                <div className='py-2'>Fashion</div>
                                {
                                    !subCategoryActive.Fashion ?
                                        <i onClick={() => openSubCategory('Fashion')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                        :
                                        <i onClick={() => closeSubCategory('Fashion')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                }
                            </div>

                            <ul className={`p-2 ${!subCategoryActive.Fashion && 'hidden'}`}>
                                {Fashion.map((data, idx) => (
                                    <UlList title={data} key={idx} />
                                ))}
                            </ul>
                        </li>

                        <li className='border-b-[1px]'>
                            <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-2'>
                                <div className='py-2'>Sport</div>
                                {
                                    !subCategoryActive.Sport ?
                                        <i onClick={() => openSubCategory('Sport')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                        :
                                        <i onClick={() => closeSubCategory('Sport')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                }
                            </div>

                            <ul className={`p-2 ${!subCategoryActive.Sport && 'hidden'}`}>
                                {Sport.map((data, idx) => (
                                    <UlList title={data} key={idx} />
                                ))}
                            </ul>
                        </li>

                        <li className='border-b-[1px]'>
                            <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-2'>
                                <div className='py-2'>Travel & Vacation</div>
                                {
                                    !subCategoryActive.TravelVacation ?
                                        <i onClick={() => openSubCategory('TravelVacation')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                        :
                                        <i onClick={() => closeSubCategory('TravelVacation')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                }
                            </div>

                            <ul className={`p-2 ${!subCategoryActive.TravelVacation && 'hidden'}`}>
                                {travelVacation.map((data, idx) => (
                                    <UlList title={data} key={idx} />
                                ))}
                            </ul>
                        </li>

                        <li className='border-b-[1px]'>
                            <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-2'>
                                <div className='py-2'>Electronics</div>
                                {
                                    !subCategoryActive.Electronics ?
                                        <i onClick={() => openSubCategory('Electronics')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                        :
                                        <i onClick={() => closeSubCategory('Electronics')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                }
                            </div>

                            <ul className={`p-2 ${!subCategoryActive.Electronics && 'hidden'}`}>
                                {Electronics.map((data, idx) => (
                                    <UlList title={data} key={idx} />
                                ))}
                            </ul>
                        </li>

                        <li>
                            <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-2'>
                                <div className='py-2'>Gear</div>
                                {
                                    !subCategoryActive.Gear ?
                                        <i onClick={() => openSubCategory('Gear')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                        :
                                        <i onClick={() => closeSubCategory('Gear')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                }
                            </div>

                            <ul className={`p-2 ${!subCategoryActive.Gear && 'hidden'}`}>
                                {Gear.map((data, idx) => (
                                    <UlList title={data} key={idx} />
                                ))}
                            </ul>
                        </li>

                    </ul>
                </li>



                <li className='border-b-[1px]'>
                    <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-1'>
                        <div className='p-2'>Features</div>
                        {
                            !active.features ?
                                <i onClick={() => open('features')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                :
                                <i onClick={() => close('features')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                        }
                    </div>
                    <ul className={`p-2 ${!active.features && 'hidden'}`}>
                        {poster.map((src, idx) => (
                            <li key={idx} className='mb-3'>
                                <img src={src} alt={`poster-${idx}`} />
                            </li>
                        ))}
                    </ul>
                </li>


                <li className='border-b-[1px]'>
                    <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-1'>
                        <div className='p-2'>Electronics</div>
                        {
                            !active.electronics ?
                                <i onClick={() => open('electronics')} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                :
                                <i onClick={() => close('electronics')} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                        }
                    </div>

                    <ul className={`px-2 pb-2 ${!active.electronics && 'hidden'}`}>

                        <li className='border-b-[1px]'>
                            <div className='bg-gray-600 hover:bg-black flex flex-row justify-between items-center pl-2'>
                                <div className='py-2'>Mobile & Tablet</div>
                                {
                                    !mobileSubCategory ?
                                        <i onClick={() => setSubCategory(true)} className='cursor-pointer bi bi-plus float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                        :
                                        <i onClick={() => setSubCategory(false)} className='cursor-pointer bi bi-x float-end py-1.5 px-3 text-[20px] bg-black font-bold' />
                                }
                            </div>

                            <ul className={`p-2 ${!mobileSubCategory && 'hidden'}`}>
                                {mobileTablet.map((data, idx) => (
                                    <UlList title={data} key={idx} />
                                ))}
                            </ul>
                        </li>

                        {
                            ['Headphone', 'Laptop'].map((data,idx)=>(
                                <UlList title={data} key={idx} />
                            ))
                        }
                        

                    </ul>
                </li>



                
                <li className='bg-gray-600 p-2 border-b-[1px]'>
                    <Link to='/about-us'>About Us</Link>
                </li>
                <li className='bg-gray-600 p-2 border-b-[1px]'>
                    <Link to='/contact-us'>Contact</Link>
                </li>
            </ul>
        </div>
    )
}

export default MobileMenu