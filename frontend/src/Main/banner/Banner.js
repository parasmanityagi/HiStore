import React, { useState } from 'react'
import banner1 from '../../assets/banner-1.jpg'
import banner2 from '../../assets/banner-2.jpg'
import banner3 from '../../assets/banner-3.jpg'

const Banner = () => {
    let [img, setImg] = useState({ first: false, second: false, third: false });
    let openHover = (name) => {
        setImg(prev => ({
            ...prev, [name]: true
        }))
    }

    let closehover = () => {
        setImg({ first: false, second: false, third: false })
    }
    return (
        <div className='flex flex-col sm:flex-row gap-6 my-20'>
            <div>
                <img onMouseEnter={() => openHover('first')} onMouseLeave={() => closehover()}
                    className={`w-full ${img.first && "banner_animate"}`} src={banner1} alt="banner-1" />
            </div>
            <div className='flex flex-col gap-6'>
                <img onMouseEnter={() => openHover('second')} onMouseLeave={() => closehover()}
                    className={`${img.second && "banner_animate"}`} src={banner2} alt="banner-2" />
                <img onMouseEnter={() => openHover('third')} onMouseLeave={() => closehover()}
                    className={img.third && "banner_animate"} src={banner3} alt="banner-3" />
            </div>
        </div>
    )
}

export default Banner