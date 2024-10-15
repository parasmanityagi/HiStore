import React, { useState } from 'react'
import TopHeader from './TopHeader/TopHeader';
import BottomHeader from './BottomHeader/BottomHeader';
import Slider from './Slider/Slider';
import { Routes, Route } from 'react-router-dom';
import MobileMenu from './mobileMenu/MobileMenu';

const Header = () => {
  let [menu, setMenu] = useState(false);

  return (
    <div>
      <TopHeader />
      <BottomHeader flag={menu} closeMenu={setMenu} />
      <Routes>
        <Route path='/' element={<Slider />} />
      </Routes>
      {menu && <MobileMenu closeMenu={setMenu}/>}
    </div>
  )
}

export default Header