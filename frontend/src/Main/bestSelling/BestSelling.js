import React, { useState } from 'react'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { featureProduct } from '../../utls/data.js';
import { QuickView, AddToCart } from '../../components';

const BestSelling = () => {
  
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
    acc[element.title] = false;
    return acc;
  }, {});

  const [hover, setHover] = useState(initialHoverState);

  const openHover = (title) => {
    setHover(prev => ({
      ...prev,
      [title]: true
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
  let [activeCart, setActiveCart] = useState(false);


  let [item, setItem] = useState({ sales: false, price: false, date: false, name: false })
  let active = (title) => {
    if (item[title]) {
      setItem(prev => ({ ...prev, [title]: false }))
    } else {
      setItem({ sales: false, price: false, date: false, name: false })
      setItem(prev => ({ ...prev, [title]: true }))
    }
  }


  return (
    <>
      <div className='my-20'>
        <h1 className='text-[22px] font-medium uppercase text-center w-full'>Best Selling Products </h1>
        <div className='h-0.5 w-14 my-2 m-auto rounded-md bg-orange-400' />
        <ul className='hidden sm:flex flex-row items-center justify-center gap-12 my-4 uppercase text-[14px]'>
          <li
            onClick={() => active('sales')}
            className={`cursor-pointer border-b-2 ${item.sales ? "border-black" : "border-transparent"}`}
          >
            sales
          </li>

          <li
            onClick={() => active('price')}
            className={`cursor-pointer border-b-2 ${item.price ? "border-black" : "border-transparent"}`}
          >
            price
          </li>

          <li
            onClick={() => active('date')}
            className={`cursor-pointer border-b-2 ${item.date ? "border-black" : "border-transparent"}`}
          >
            date add
          </li>

          <li
            onClick={() => active('name')}
            className={`cursor-pointer border-b-2 ${item.name ? "border-black" : "border-transparent"}`}
          >
            Name
          </li>
        </ul>

        <div className='flex sm:hidden justify-center'>
          <select className='p-2 rounded-md' name="category">
            <option className='cursor-pointer' value="sales">sales</option>
            <option className='cursor-pointer' value="price">price</option>
            <option className='cursor-pointer' value="date">date add</option>
            <option className='cursor-pointer' value="name">Name</option>
          </select>
        </div>

        <Carousel responsive={responsive} infinite={true}>
          {
            featureProduct.map((data, idx) => (
              <div
                key={idx}
                className='relative p-2 w-64'
                onMouseEnter={() => openHover(data.title)}
                onMouseLeave={() => closeHover()}
              >
                <img className='w-full h-76' src={data.src} alt={data.title} />
                <span className='mt-1 text-[12px] truncate w-64 text-gray-400'>{data.category}</span>
                <h4 className='my-1 text-[16px] truncate w-64 hover:text-orange-400'>{data.title}</h4>
                <div className='text-orange-400 font-bold'>&#36;{data.price}</div>
                <span className='inline-flex gap-2 mt-2'>
                  <div className='bg-gray-300 rounded-full w-4 h-4' />
                  <div className='bg-orange-400 rounded-full w-4 h-4' />
                </span>

                {
                  hover[data.title] &&
                  <div className='absolute top-0 left-0 w-[248px] h-[325px] backdrop-blur-[2px] overflow-hidden p-2'>
                    <span className='absolute top-[35%] left-[42%] shadow-xl cursor-pointer bg-white py-1 px-3 rounded-full'>
                      <i onClick={() => { setProduct(data); setActiveCart(true) }} title='Add to Cart'
                        className="bi bi-basket text-[25px] text-black font-bold" />
                    </span>
                    <span className='absolute -bottom-8 -right-7 shadow-2xl cursor-pointer bg-black pb-6 pl-2 pr-8 rounded-full'>
                      <i onClick={() => { setQuickView(true); setProduct(data) }} title='Quick View'
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
      {
        activeCart && <AddToCart product={product} onClose={setActiveCart} />
      }
    </>
  )
}

export default BestSelling