import React from 'react'

const Contact = () => {
    return (
        <div className='my-10 w-full px-2 sm:px-0 sm:w-[60%] m-auto py-10 sm:py-20'>
            <h1 className='text-[22px] font-medium uppercase text-center w-full'>Sign up for Newsletter </h1>
            <div className='h-0.5 w-14 my-2 m-auto rounded-md bg-orange-400' />
            <p className='text-[14px] text-gray-400 font-normal text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                <br/>
                dolore magna aliqua. Ut enim ad minim veniam 
            </p>
            
            <form>
                <input className='border-[1px] p-2 block w-full mt-6 mb-3 text-center outline-none' type="email" placeholder='Write Your email Address...' />
                <button className='w-full text-center py-2 bg-black text-white' type="submit">SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default Contact