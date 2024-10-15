import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required: true
    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Products',
                required: true
            }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('wishlists', wishlistSchema);
