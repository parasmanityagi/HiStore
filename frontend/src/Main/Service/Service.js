import React from 'react'

const Service = () => {
    let [active, setActive] = React.useState({ first: false, second: false, third: false })

    let setOpen = (name) => {
        setActive(prev => ({ ...prev, [name]: true }))
    }

    return (
        <div
            className='grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 grid-flow-col sm:grid-flow-row gap-4 sm:gap-2 md:gap-10 text-center mt-6 mb-24'>
            <div onMouseOver={() => setOpen('first')} onMouseLeave={() => setActive({
                first: false, second: false, third: false
            })} className={`${active.first ? 'active' : ""} col-span-1 h-44 border-[1px] pt-8 border-gray-400 cursor-pointer`}>
                <i className="bi bi-truck rounded-full text-[20px] border-[1px] border-gray-400 py-4 px-5 text-[22px]" />
                <h5 className='text-[16px] font-medium mt-8'>FAST & FREE SHIPPING</h5>
                <p className='mt-2 text-gray-400 text-[14px]'>Fast & Free Shipping on orders over $99.00</p>
            </div>

            <div onMouseOver={() => setOpen('second')} onMouseLeave={() => setActive({
                first: false, second: false, third: false
            })} className={`${active.second ? 'active' : ""} col-span-1 h-44 border-[1px] pt-8 border-gray-400 cursor-pointer`}>
                <i className="bi bi-currency-dollar rounded-full text-[20px] border-[1px] border-gray-400 py-4 px-5 text-[22px]" />
                <h5 className='text-[16px] font-medium mt-8'>FAST & FREE SHIPPING</h5>
                <p className='mt-2 text-gray-400 text-[14px]'>Fast & Free Shipping on orders over $99.00</p>
            </div>

            <div onMouseOver={() => setOpen('third')} onMouseLeave={() => setActive({
                first: false, second: false, third: false
            })} className={`${active.third ? 'active' : ""} col-span-1 h-44 border-[1px] pt-8 border-gray-400 cursor-pointer`}>
                <i className="bi bi-globe rounded-full text-[20px] border-[1px] border-gray-400 py-4 px-5 text-[22px]" />
                <h5 className='text-[16px] font-medium mt-8'>FAST & FREE SHIPPING</h5>
                <p className='mt-2 text-gray-400 text-[14px]'>Fast & Free Shipping on orders over $99.00</p>
            </div>
        </div>
    )
}

export default Service