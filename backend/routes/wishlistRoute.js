import express from 'express';

import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import { userVerify } from '../middelware/userMiddleware.js';
import { addProductToWishlist, removeProductFromWishlist, getWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

// Add product to wishlist
router.post('/add', userVerify, asyncErrorHandler(addProductToWishlist));

// Remove product from wishlist
router.delete('/remove/:productId', userVerify, asyncErrorHandler(removeProductFromWishlist));

// Get wishlist details for a user
router.get('/', userVerify, asyncErrorHandler(getWishlist));

export default router;
