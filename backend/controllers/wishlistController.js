import Wishlist from '../models/wishlistSchema.js';


import { successResponse, errorResponse } from '../utils/resWrapper.js';



// Add product to wishlist
/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlist]
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
 *                 description: The ID of the product to add to the wishlist
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to add
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 wishlist:
 *                   type: object
 *                   description: The updated wishlist object
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal server error
 */
export const addProductToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
        // Create a new wishlist if the user doesn't have one
        wishlist = new Wishlist({
            userId,
            products: [{ productId }]
        });
    } else {
        // Check if the product already exists in the wishlist
        const productIndex = wishlist.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex === -1) {
            wishlist.products.push({ productId });
        }
    }

    await wishlist.save();
    return successResponse(res, {}, 'Product added to wishlist');
};




// Remove product from wishlist
/**
 * @swagger
 * /wishlist/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
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
 *         description: Product removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 wishlist:
 *                   type: object
 *                   description: The updated wishlist object
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal server error
 */
export const removeProductFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
        return errorResponse(res, 'Wishlist not found', 404);
    }

    // Filter out the product to be removed
    wishlist.products = wishlist.products.filter(p => p.productId.toString() !== productId);

    await wishlist.save();
    return successResponse(res, {}, 'Product removed from wishlist');
};





// Get wishlist for a user
/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get the wishlist for a user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 wishlist:
 *                   type: object
 *                   description: The user's wishlist object
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal server error
 */
export const getWishlist = async (req, res) => {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
        return errorResponse(res, 'Wishlist not found', 404);
    }

    return successResponse(res, wishlist, 'Wishlist fetched successfully');
};





// Delete wishlist
export const deleteWishlist = async (userId) => {
    const wishlist = await Wishlist.findOneAndDelete({ userId });
    if (!wishlist) {
        console.log('Wishlist not found');
    }
    console.log('Wishlist Deleted successfully');
};
