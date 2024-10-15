import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice.js'
import productReducer from './product/productSlice.js'
import cartReducer from './cart/cartSlice.js'
import wishlistReducer from './wishlist/wishlistSlice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        wishlist:wishlistReducer
    }
})

export { store }