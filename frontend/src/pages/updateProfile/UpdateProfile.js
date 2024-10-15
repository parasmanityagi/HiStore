import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from 'rsuite';


import { HomeBanner } from '../../components'
import { updateUser } from '../../redux/auth/authActions';
import backendURL from '../../utls/data';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    let formRef = useRef()
    let navigate = useNavigate()

    let user = useSelector(state => state.auth.userInfo)
    const [formData, setFormData] = useState({
        profile: null,
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        number: ''
    });
    const [profilePreview, setProfilePreview] = useState(`${backendURL}/images/default-profile.jpg`);


    useEffect(() => {
        setFormData({
            profile: user?.profile,
            firstname: user?.firstname,
            lastname: user?.lastname,
            username: user?.username,
            email: user?.email,
            number: user?.number
        })
        setProfilePreview(`${backendURL}/api/user/image/${user?.profile}`)

    }, [user])

    const handleChange = (e) => {
        let { name, value, files } = e.target;

        // Handle file input
        if (name === "profile" && files && files[0]) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
            setProfilePreview(URL.createObjectURL(files[0]));
        }
        // Handle number input
        else if (name === "number") {
            const numericValue = Number(value);
            setFormData((prev) => ({
                ...prev,
                [name]: isNaN(numericValue) ? prev[name] : numericValue,
            }));
        }
        // Handle all other input types
        else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    let { loading } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault()

        // First, display a loading toast or message if needed
        toast.info("Updating!...");
        
        // Dispatch the update user action
        const response = await dispatch(updateUser(formData));

        // Check if the response indicates success
        if (updateUser.fulfilled.match(response)) {
            toast.success(response.payload.message || "Account Updated");
            navigate('/');
        } else {
            toast.error(response.payload.message || "Account Updation Failed. Please try again.");
        }
    }


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
            <HomeBanner text="Update Account" />

            <div
                className="flex flex-col w-full sm:w-[400px] lg:w-[50%] m-auto gap-6 my-6 sm:my-20">
                <h1
                    className="text-center text-[22px] font-medium capitalize"
                >
                    Account Setting
                </h1>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 justify-center items-center text-[14px] border-[1px] shadow-md py-4 px-2"
                >
                    <div className="flex flex-col justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <div className="relative" name="profile">
                            <label htmlFor="fileInput" className="cursor-pointer">
                                <img className={`border-[1px] w-20 h-20 rounded-full`} src={profilePreview} alt="upload-profile-picture" />
                            </label>
                            <input
                                id="fileInput"
                                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                                type="file"
                                name="profile"
                                onChange={handleChange}
                            />
                        </div>
                        <label htmlFor="profile" className="cursor-pointer">
                            {formData.profile && formData.profile !== `${user?.profile}` ? formData.profile.name : `${user?.username || "Profile"}.jpg`}
                        </label>
                    </div>


                    <div
                        className="w-full lg:w-[70%] flex flex-row justify-between items-center"
                    >
                        <label htmlFor="text">First Name: </label>
                        <input
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                            required
                        />
                    </div>

                    <div
                        className="w-full lg:w-[70%] flex flex-row justify-between items-center"
                    >
                        <label htmlFor="text">Last Name: </label>
                        <input
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                            required
                        />
                    </div>

                    <div
                        className="w-full lg:w-[70%] flex flex-row justify-between items-center"
                    >
                        <label htmlFor="text">User Name: </label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                            required
                        />
                    </div>


                    <div
                        className="w-full lg:w-[70%] flex flex-row justify-between items-center"
                    >
                        <label htmlFor="number">Number: </label>
                        <input
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                            required
                        />
                    </div>

                    <Link
                        className="text-gray-400 hover:text-blue-400 active:text-blue-400" to="/user/forgot-password"
                    >
                        Update your password?
                    </Link>

                    {
                        loading ? <Loader size="md" content="Loading..." />
                            :
                            <button
                                className="bg-orange-400 py-2 px-4 text-white font-medium" type="submit"
                            >
                                UPDATE PROFILE
                            </button>
                    }

                </form>
            </div>
        </div>
    )
}

export default UpdateProfile