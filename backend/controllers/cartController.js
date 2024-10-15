import Cart from '../models/cartSchema.js';


import { successResponse, errorResponse } from '../utils/resWrapper.js';



// Add product to cart
/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add to the cart
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to add
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cart:
 *                   type: object
 *                   description: The updated cart object
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
export const addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        // Create a new cart if the user doesn't have one
        cart = new Cart({
            userId,
            products: [{ productId, quantity }]
        });
    } else {
        // Check if the product already exists in the cart
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex !== -1) {
            // If the product exists, update the quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // Otherwise, add the new product to the cart
            cart.products.push({ productId, quantity });
        }
    }

    await cart.save();
    return successResponse(res, {}, 'Product added to cart');
};



// Remove product from cart
/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cart:
 *                   type: object
 *                   description: The updated cart object
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
export const removeProductFromCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        return errorResponse(res, 'Cart not found', 404);
    }

    // Filter out the product to be removed
    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    await cart.save();
    return successResponse(res, {}, 'Product removed from cart');
};



// Get cart for a user
/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the cart for a user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cart:
 *                   type: object
 *                   description: The user's cart object
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
export const getCart = async (req, res) => {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return errorResponse(res, 'Cart not found', 404);
    }

    return successResponse(res, cart, 'Cart fetched successfully');
};



// delete cart
export const deleteCart = async (userId) => {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
        console.log('Cart not found'); 
    }
    console.log('Cart Deleted successfully');
};

