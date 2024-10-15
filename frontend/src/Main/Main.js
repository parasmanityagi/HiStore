import React from 'react'
import Category from './Category/Category'
import Service from './Service/Service'
import FeatureProduct from './product/FeatureProduct'
import Banner from './banner/Banner'
import Brand from './brand/Brand'
const Main = () => {
  return (
    <div className='w-full px-1 md:px-0 md:w-[90%] m-auto my-8'>
      <Service />
      <Category />
      <FeatureProduct heading='Feature Product' />
      <Banner />
      <FeatureProduct heading='BEST SELLING PRODUCTS' />
      <Brand />
    </div>
  )
}

export default Main