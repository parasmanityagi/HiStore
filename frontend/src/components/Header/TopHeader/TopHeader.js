import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import logo from '../../../assets/logo.png';
import logout from '../../../assets/logout.png';
import updateProfile from '../../../assets/update-profile.png';
import deleteProfile from '../../../assets/delete-profile.png';
import wishlistIcon from '../../../assets/wishlist.png'
import { resetAuthState } from '../../../redux/auth/authSlice';
import backendURL, { resetLocalStorage } from '../../../utls/data';
import { resetCartState } from '../../../redux/cart/cartSlice';
import { deleteUser } from '../../../redux/auth/authActions';
import SearchPanel from '../../searchPanel/SearchPanel';

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const [search, setSearch] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);
  const cart = useSelector((state) => state.cart.cart);
  const [showProfileMenu, setShowProfileMenu] = useState(false);


  const toggleMenu = () => setShowProfileMenu((prev) => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Scroll to the form when the component mounts
  useEffect(() => {
    const scrollToProduct = () => {
      if (headerRef.current) {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scrollToProduct();
  }, []);

  // Logout user
  const logoutUser = async () => {
    toggleMenu();
    try {
      resetLocalStorage();
      dispatch(resetCartState());
      dispatch(resetAuthState());
      toast.success("Logout Successful!");
    } catch (error) {
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  // Delete user
  const deleteAccount = async () => {
    toggleMenu();
    toast.info("Deleting Account...");

    const response = await dispatch(deleteUser());
    dispatch(resetAuthState());
    resetLocalStorage();
    dispatch(resetCartState());

    if (deleteUser.fulfilled.match(response)) {
      toast.success(response.payload.message || "Account Deleted");
      navigate('/');
    } else {
      toast.error(response.payload.message || "Account Deletion Failed. Please try again.");
    }
  };

  return (
    <div
      ref={headerRef}
      className='flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between pb-4 sm:pb-8 pt-2 md:py-8 px-1 sm:px-20'>
      {/* Logo */}
      <Link to='/'><img src={logo} alt="logo" /></Link>

      {!search ? (
        <div className='flex flex-row items-center gap-6'>
          {/* Search panel for desktop */}
          <span className='relative w-72 hidden sm:block text-gray-500'>
            <SearchPanel />

          </span>

          {/* Search icon for mobile and tablet devices */}
          <span
            onClick={() => setSearch(true)}
            className='border-2 text-gray-400 sm:hidden cursor-pointer rounded-full p-0.5 px-2'
          >
            <i className='bi bi-search text-[20px]' />
          </span>

          {!user ? (
            <Link to='/user/login'>
              <i className='bi bi-person text-[24px] opacity-70' />
            </Link>
          ) : (
            <>
              <img
                className='w-10 h-10 p-1 rounded-full -mr-2'
                src={`${backendURL}/api/user/image/${user?.profile}`}
                alt={user?.username}
              />
              {cart && cart?.products && cart?.products?.length > 0 && (
                <span className='relative'>
                  <Link to='/cart'>
                    <i className='bi bi-cart text-[24px] opacity-70' />
                  </Link>
                  <span className='absolute top-0 -right-3 text-[12px] bg-red-500 rounded-full px-1 text-white font-black'>
                    {cart.products.length}
                  </span>
                </span>
              )}
              <div className='relative' ref={menuRef}>
                <i onClick={toggleMenu} className='bi bi-gear text-[24px] opacity-70 cursor-pointer' />
                {showProfileMenu && (
                  <ul className='absolute top-10 -right-2 flex flex-col flex-nowrap gap-1 w-36 py-1 rounded-md z-50 bg-blue-300'>
                    <li className='cursor-pointer p-1'>
                      <img
                        className='w-6 h-6 inline mr-1 rounded-full'
                        src={`${backendURL}/api/user/image/${user?.profile}`}
                        alt={user?.username}
                      />
                      <span>Profile</span>
                    </li>
                    <hr className='bg-white h-[2px] w-full' />


                    <li onClick={logoutUser} className='cursor-pointer p-1'>
                      <img className='w-6 h-6 inline mr-1' src={logout} alt='logout' />
                      <span>Logout</span>
                    </li>
                    <hr className='bg-white h-[2px] w-full' />


                    <li className='cursor-pointer p-1'>
                      <Link to='/user/wishlist' onClick={() => toggleMenu()}>
                        <img className='w-5 h-5 inline mr-1' src={wishlistIcon} alt='update-user' />
                        <span>Wishlist</span>
                      </Link>
                    </li>
                    <hr className='bg-white h-[2px] w-full' />


                    <li className='cursor-pointer p-1'>
                      <Link to='/user/update-profile' onClick={() => toggleMenu()}>
                        <img className='w-5 h-5 inline mr-1' src={updateProfile} alt='update-user' />
                        <span>Update Profile</span>
                      </Link>
                    </li>
                    <hr className='bg-white h-[2px] w-full' />


                    <li onClick={deleteAccount} className='cursor-pointer p-1'>
                      <img className='w-5 h-5 inline mr-1' src={deleteProfile} alt='delete-user' />
                      <span>Delete Account</span>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className='relative flex w-full text-gray-600'>
          <div className='w-full'>

            <SearchPanel setSearch={setSearch} />

          </div>

        </div>
      )}
    </div>
  );
};

export default TopHeader;
