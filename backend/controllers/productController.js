import mongoose from 'mongoose';


import Products from '../models/productSchema.js';
import { errorResponse, successResponse } from '../utils/resWrapper.js';

// Get all products controller
/**
 * @swagger
 * /get-all-products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the product
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                   price:
 *                     type: number
 *                     description: The price of the product
 *                   description:
 *                     type: string
 *                     description: A brief description of the product
 *                   image:
 *                     type: string
 *                     description: URL of the product image
 *       404:
 *         description: No products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No products found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
const getAllProducts = async (req, res) => {
    const products = await Products.find({});
    if (!products) {
        return errorResponse(res, 'No products found', 404);
    }
    successResponse(res, products, 'Products retrieved successfully', 200);
};


export { getAllProducts };

