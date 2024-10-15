import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/dist/rsuite.min.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './App.css';
import Main from './Main/Main';
import { getUser } from "./redux/auth/authActions.js";
import { resetAuthState, setUserInfo, setUserToken } from './redux/auth/authSlice.js';
import { getAllProducts } from './redux/product/productSlice.js';
import { AddToCart, Contact, Footer, Gallery, Header, ProtectedRoute, Checkout } from './components';
import { AboutUs, Cart, ContactUs, Error, ForgotPassword, Login, SignUp, UpdateProfile, Wishlist } from './pages';
import { decryptUserData, isExpired, resetLocalStorage, publishable_key } from './utls/data.js';
import { getCart } from './redux/cart/cartActions.js';
import { getWishlist } from './redux/wishlist/wishlistActions.js';

const stripePromise = loadStripe(publishable_key);

const App = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const [token, setToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isUserDataValid, setIsUserDataValid] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    const userExpiry = localStorage.getItem("userExpiry");

    const tokenValid = localToken && !isExpired(tokenExpiry);
    const userDataValid = !isExpired(userExpiry);

    setToken(localToken);
    setIsTokenValid(tokenValid);
    setIsUserDataValid(userDataValid);

    if (tokenValid && userDataValid) {
      const userData = decryptUserData();
      if (userData) {
        dispatch(setUserInfo(userData.data));
        dispatch(setUserToken(localToken));
      }
    } else if (tokenValid) {
      dispatch(getUser());
    }
    dispatch(getCart());
    dispatch(getWishlist());
    dispatch(getAllProducts());

    // Set a timeout to reset state after 1 hour
    const timeoutId = setTimeout(() => {
      dispatch(resetAuthState());
      resetLocalStorage();
    }, 3600 * 1000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [dispatch]);


  return (
    <>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path='/payment/checkout' element={
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        } />
        <Route path='/' element={<Main />} />
        <Route path='api/product/:id' element={<AddToCart />} />
        <Route
          path="/user/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/signup"
          element={
            <ProtectedRoute>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
        <Route path="/user/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/user/forgot-password' element={<ForgotPassword />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Gallery />
      <Contact />
      <div className='my-2 bg-gray-400 h-[1px] w-full' />
      <Footer />
    </>
  );
}

export default App;
