import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';


import { HomeBanner } from '../../components';
import { login } from '../../redux/auth/authActions';
import { toast } from 'react-toastify';
import { getCart } from '../../redux/cart/cartActions';
import { getWishlist } from '../../redux/wishlist/wishlistActions';

const Login = () => {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ email: "", password: "" });

    let { loading } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // First, display a loading toast or message if needed
        toast.info("Logging in...");

        // Dispatch the login action
        const resultAction = await dispatch(login(formData));

        // Check if the login was successful
        if (login.fulfilled.match(resultAction)) {
            dispatch(getCart())
            dispatch(getWishlist())
            // If successful, show success toast
            toast.success(resultAction.payload.message || 'Login successful!');
            setFormData({ email: "", password: "" });
        } else {
            // If failed, show error toast
            toast.error(resultAction.payload.message || 'Invalid Credentials');
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    // Scroll to the form when the component mounts
    useEffect(() => {
        const scrollToProduct = () => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        scrollToProduct();
    }, []);

    return (
        <div className="w-full sm:w-[90%] m-auto my-8 px-2 sm:px-0">
            <HomeBanner text="LOGIN" />

            <div ref={formRef}
                className="flex flex-col w-full sm:w-[400px] lg:w-[50%] m-auto gap-6 my-6 sm:my-20">
                <h1 className="text-center text-[22px] font-medium capitalize">Log in to your account</h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 justify-center items-center text-[14px] border-[1px] shadow-md py-4 px-2"
                >
                    <div className="w-full lg:w-[70%] flex flex-row justify-between items-center">
                        <label htmlFor="email">Email: </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="email"
                            required
                        />
                    </div>

                    <div className="w-full lg:w-[70%] flex flex-row justify-between items-center">
                        <label htmlFor="password">Password: </label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="password"
                            required
                        />
                    </div>

                    <Link className="text-gray-400 hover:text-blue-400 active:text-blue-400" to="/user/forgot-password">
                        Forgot your password?
                    </Link>

                    {loading ?
                        <Loader size="md" content="Loading..." /> :
                        <button className="bg-orange-400 py-2 px-4 text-white font-medium" type="submit">
                            SIGN IN
                        </button>}

                    <hr className="bg-black h-[1px] my-2 w-full" />

                    <Link className="text-gray-400 hover:text-blue-400 active:text-blue-400" to="/user/signup">
                        No account? Create one here
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
