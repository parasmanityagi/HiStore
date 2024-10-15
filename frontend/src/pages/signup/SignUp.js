import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'rsuite'
import { toast } from 'react-toastify'


import uploadImg from '../../assets/upload.png'
import { HomeBanner } from '../../components'
import { validateSignup } from "../../utls/validator.js";
import { signup } from '../../redux/auth/authActions.js'


const SignUp = () => {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const fileInputRef = useRef(null);
    let { loading } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        profile: null,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
    });

    const [profilePreview, setProfilePreview] = useState(uploadImg);

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        let { profile, ...rest } = formData;
        const errors = validateSignup(rest);
        if (Object.keys(errors).length > 0) {
            for (const key in errors) {
                toast.error(errors[key]);
            }
            return;
        }

        // First, display a loading toast or message if needed
        toast.info("Signing up...");
        const response = await dispatch(signup(formData));

        // Check if the response indicates success
        if (signup.fulfilled.match(response)) {
            toast.success("Signup successful!");
            setFormData({
                profile: null,
                firstname: "",
                lastname: "",
                username: "",
                email: "",
                number: "",
                password: "",
                confirmPassword: "",
            });
            setProfilePreview(uploadImg);

            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } else {
            toast.error(response.payload.message || "Signup failed. Please try again.");
        }
    };

    useEffect(() => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);


    return (
        <div className="w-full sm:w-[90%] m-auto my-8 px-2 sm:px-0">
            <HomeBanner text="SIGNUP" />

            <div ref={formRef}
                className="flex flex-col w-full sm:w-[400px] lg:w-[50%] m-auto gap-6 my-6 sm:my-20">
                <h1 className="text-center text-[22px] font-medium capitalize">
                    Create an account
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 justify-center items-center text-[14px] border-[1px] shadow-md py-4 px-2"
                >
                    {/* profile input */}
                    <div className="flex flex-col justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <div className="relative" name="profile">
                            <label htmlFor="fileInput" className="cursor-pointer">
                                <img
                                    className={`border-[1px] ${formData.profile !== null ? "w-14 h-14" : "p-2 w-12"
                                        } rounded-full`}
                                    src={profilePreview}
                                    alt="upload-profile-picture"
                                />
                            </label>
                            <input
                                ref={fileInputRef}
                                id="fileInput"
                                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                                type="file"
                                name="profile"
                                onChange={handleChange}
                            />
                        </div>
                        <label htmlFor="profile" className="cursor-pointer">
                            {formData.profile !== null
                                ? formData.profile.name
                                : "Upload Profile"}
                        </label>
                    </div>

                    {/* first name form group */}
                    <div className="w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <label htmlFor="text">First Name: </label>
                        <input
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                        />
                    </div>

                    {/* last name form group */}
                    <div className="w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <label htmlFor="text">Last Name: </label>
                        <input
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                        />
                    </div>

                    {/* user name form group */}
                    <div className="w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <label htmlFor="text">Username: </label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                        />
                    </div>

                    {/* email form group */}
                    <div className="w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <label htmlFor="email">Email: </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="email"
                        />
                    </div>

                    {/* number form group */}
                    <div className="w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <label htmlFor="number">Number: </label>
                        <input
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="text"
                        />
                    </div>

                    {/* password form group */}
                    <div className="w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <label htmlFor="password">Password: </label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="password"
                        />
                    </div>

                    {/* confirm password form group */}
                    <div className="w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-start sm:gap-0 gap-2 sm:items-center">
                        <label className="sm:w-[22%]" htmlFor="password">
                            Confirm Password:{" "}
                        </label>
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1"
                            type="password"
                        />
                    </div>

                    {/* submit button */}
                    {loading ? <Loader size="md" content="Loading..." /> :
                        <button
                            className="bg-orange-400 py-2 px-4 text-white font-medium"
                            type="submit"
                        >
                            SIGN UP
                        </button>}

                    <hr className="bg-black h-[1px] my-2 w-full" />

                    {/* link to redirect login page */}
                    <Link
                        className="text-gray-400 hover:text-blue-400 actice:text-blue-400"
                        to="/user/login"
                    >
                        Already have an account? Log in instead!
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp;

