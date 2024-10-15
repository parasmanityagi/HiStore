import React, { useState } from 'react';
import List from './List';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

const BottomHeader = ({ flag, closeMenu }) => {
  const [toggle, setToggle] = useState({
    shop: false,
    feature: false,
    electronics: false
  });

  const openList = (title) => {
    setToggle(prevState => {
      const newState = {
        shop: false,
        feature: false,
        electronics: false
      };

      if (newState.hasOwnProperty(title)) {
        newState[title] = true;
      }

      return newState;
    });
  };

  const closeList = (title) => {
    setToggle(prevState => ({
      ...prevState,
      [title]: false
    }));
  };

  return (
    <div className='px-1 sm:px-20 bg-black'>
      <div className='flex flex-row text-white justify-between text-[15px] py-4 relative h-14 md:h-auto'>

        {/* HAMBURGER MENU FOR MOBILE AND TABLET DEVICES */}
        <div className='relative lg:hidden'>
          {!flag ?
            <i onClick={() => closeMenu(true)} className='bi bi-list text-[40px] cursor-pointer absolute -top-5' />
            :
            <i onClick={() => closeMenu(false)} className='bi bi-x text-[40px] cursor-pointer absolute -top-5' />}
        </div>


        {/* desktop menu */}
        <ul className='cursor-pointer hidden lg:flex flex-row gap-6 uppercase'>
          <li>
            <Link to='/'>Home</Link>
          </li>

          <li
            onMouseEnter={() => openList('shop')}
            title='shop'
          >
            <div>
              <span>Shop</span>
              <i className={`bi bi-chevron-${toggle.shop ? 'down' : 'up'}`} />
              {toggle.shop && <List mouseEvent={closeList} title='shop' />}
            </div>
          </li>

          <li
            onMouseEnter={() => openList('feature')}
            title='feature'
          >
            <div>
              <span>Features</span>
              <i className={`bi bi-chevron-${toggle.feature ? 'down' : 'up'}`} />
              {toggle.feature && <List mouseEvent={closeList} title='feature' />}
            </div>
          </li>

          <li
            onMouseEnter={() => openList('electronics')}
            title='electronics'
          >
            <div>
              <span>Electronics</span>
              <i className={`bi bi-chevron-${toggle.electronics ? 'down' : 'up'}`} />
              {toggle.electronics && <Dropdown mouseEvent={closeList} title='electronics' />}
            </div>
          </li>

          
          <li>
            <Link to='/about-us'>About Us</Link>
          </li>
          <li>
            <Link to='/contact-us'>Contact</Link>
          </li>
        </ul>


        <ul className='hidden md:flex flex-row gap-6'>
          <li className='relative'>
            NEW ARRIVALS
            <span className='bg-gray-500 absolute -top-5 right-0 pb-1.5 px-1 text-[11px]'
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 66%, 46% 66%, 28% 100%, 28% 68%, 0 68%)" }}>
              New
            </span>
          </li>
          <li className='relative'>
            HOT SALE
            <span className='bg-red-500 absolute -top-5 right-0 pb-1.5 px-1 text-[11px]'
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 66%, 46% 66%, 28% 100%, 28% 68%, 0 68%)" }}>
              Sale
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomHeader;
