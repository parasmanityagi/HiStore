import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';


import { QuickView } from '../../components';
import backendURL from '../../utls/data';
import { Link } from 'react-router-dom';

const FeatureProduct = ({ heading }) => {
    let featureProduct = useSelector(state => state.product.products)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1080 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1080, min: 815 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 815, min: 500 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 500, min: 0 },
            items: 1
        }
    };


    const initialHoverState = featureProduct.reduce((acc, element) => {
        acc[element.name] = false;
        return acc;
    }, {});

    const [hover, setHover] = useState(initialHoverState);

    const openHover = (name) => {
        setHover(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const closeHover = () => {
        const resetHoverState = Object.keys(hover).reduce((acc, key) => {
            acc[key] = false;
            return acc;
        }, {});

        setHover(resetHoverState);
    };

    let [quickView, setQuickView] = useState(false);
    let [product, setProduct] = useState({})



    return (
        <>
            <div className='flex flex-col gap-6 my-20'>
                <h1 className='text-[22px] font-medium uppercase text-center w-full'>{heading}</h1>
                <div className='h-0.5 w-14 m-auto rounded-md bg-orange-400' />
                <Carousel responsive={responsive} infinite={true} >
                    {
                        featureProduct.map((data, idx) => (
                            <div
                                key={idx}
                                className='relative p-2 w-64'
                                onMouseEnter={() => openHover(data.name)}
                                onMouseLeave={() => closeHover()}
                            >
                                <img
                                    className='w-full h-76'
                                    src={`${backendURL}/api/products/image/${data?.image}`}
                                    alt={data.name} />
                                <span className='mt-1 text-[12px] truncate w-64 text-gray-400'>{data.category}</span>
                                <h4 className='my-1 text-[16px] truncate w-64 hover:text-orange-400'>{data.name}</h4>
                                <div className='text-orange-400 font-bold'>&#36;{data.price}</div>
                                <span className='inline-flex gap-2 mt-2'>
                                    <div className='bg-gray-300 rounded-full w-4 h-4' />
                                    <div className='bg-orange-400 rounded-full w-4 h-4' />
                                </span>

                                {
                                    hover[data.name] &&
                                    <div
                                        className='absolute top-0 left-0 w-[248px] h-[325px] backdrop-blur-[2px] overflow-hidden p-2'>
                                        <span
                                            className='absolute top-[35%] left-[42%] shadow-xl cursor-pointer bg-white py-1 px-3 rounded-full'>
                                            <Link to={`/api/product/${data._id}`}>
                                                <i
                                                    title='Add to Cart'
                                                    className="bi bi-basket text-[25px] text-black font-bold" />
                                            </Link>
                                        </span>
                                        <span
                                            className='absolute -bottom-8 -right-7 shadow-2xl cursor-pointer bg-black pb-6 pl-2 pr-8 rounded-full'>
                                            <i
                                                onClick={() => { setQuickView(true); setProduct(data) }}
                                                title='Quick View'
                                                className="bi bi-eye text-[25px] text-white font-bold" />
                                        </span>
                                    </div>
                                }

                            </div>
                        ))
                    }
                </Carousel>
            </div>


            {
                quickView && <QuickView product={product} onClose={setQuickView} />
            }
        </>
    );
};

export default FeatureProduct;

