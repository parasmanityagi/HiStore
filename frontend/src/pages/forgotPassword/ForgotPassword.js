import React from 'react'
import { Link } from 'react-router-dom'

import { HomeBanner } from '../../components'

const ForgotPassword = () => {
    return (
        <div className='w-full sm:w-[90%] m-auto my-8 px-2 sm:px-0'>
            <HomeBanner text='FORGOT PASSWORD' />


            <div className='flex flex-col w-full sm:w-[400px] lg:w-[50%] m-auto gap-6 my-6 sm:my-20'>
                <h1 className='text-center text-[22px] font-medium capitalize'>Forgot your password?</h1>
                {
                    true ?
                        <form className='flex flex-col gap-3 justify-center items-center text-[14px] border-[1px] shadow-md py-4 px-2'>
                            <div className='w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-center'>
                                <label htmlFor="email">Email: </label>
                                <input className='w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1' type="email" />
                            </div>

                            <div className='w-full lg:w-[70%] flex flex-col sm:flex-row justify-between items-center'>
                                <label htmlFor="password">Number: </label>
                                <input className='w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1' type="password" />
                            </div>

                            <button className='bg-orange-400 py-2 px-4 text-white font-medium' type="submit">GET OTP</button>


                            <hr className='bg-black h-[1px] my-2 w-full' />

                            <Link className='text-gray-400 hover:text-blue-400 actice:text-blue-400' to='/user/login'>Back To Login</Link>
                        </form>

                        :

                        <form className='flex flex-col gap-3 justify-center items-center text-[14px] border-[1px] shadow-md py-4 px-2'>
                            <div className='w-full lg:w-[70%] flex flex-row justify-between items-center'>
                                <label htmlFor="text">OTP: </label>
                                <input className='w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1' type="text" />
                            </div>

                            <div className='w-full lg:w-[70%] flex flex-col justify-between items-center'>
                                <label htmlFor="password">New Password: </label>
                                <input className='w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1' type="password" />
                            </div>

                            <div className='w-full lg:w-[70%] flex flex-col justify-between items-center'>
                                <label htmlFor="password">Confirm Password: </label>
                                <input className='w-full sm:w-[78%] focus:outline outline-[2px] outline-blue-400 bg-slate-200 p-1' type="password" />
                            </div>

                            <button className='bg-orange-400 py-2 px-4 text-white font-medium' type="submit">RESET PASSWORD</button>


                            <hr className='bg-black h-[1px] my-2 w-full' />

                            <Link className='text-gray-400 hover:text-blue-400 actice:text-blue-400' to='/user/login'>Back To Login</Link>
                        </form>

                }
            </div>

        </div >
    )
}

export default ForgotPassword