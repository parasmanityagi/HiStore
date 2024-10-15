import React, { useState, useEffect } from 'react';
import img1 from '../../../assets/slide-img-1.jpg';
import img2 from '../../../assets/slide-img-2.jpg';
import img3 from '../../../assets/slide-img-3.jpg';

const Slider = () => {
  const img = [img1, img2, img3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); 

      setTimeout(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % img.length);
        setFade(true); 
      }, 500); 
    }, 2500);

    return () => clearInterval(intervalId);
  }, [img.length]);

  return (
    <div className="slider-container">
      <img
        src={img[currentSlide]}
        alt="slider_image"
        className={`slider-image ${fade ? 'fade-in' : 'fade-out'}`}
      />
      <div className='absolute top-[40%] right-6'>
        <div onClick={()=>setCurrentSlide(0)} className={`rounded-full mb-6 ${currentSlide===0? 'bg-orange-400':"bg-gray-500"} h-2 z-20 w-2 `}/>
        <div onClick={()=>setCurrentSlide(1)} className={`rounded-full mb-6 ${currentSlide===1? 'bg-orange-400':'bg-gray-500'} h-2 z-20 w-2 `}/>
        <div onClick={()=>setCurrentSlide(2)} className={`rounded-full ${currentSlide===2? 'bg-orange-400':'bg-gray-500'} h-2 z-20 w-2 `}/>
      </div>
    </div>
  );
};

export default Slider;
