import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


import { removeFromWishlist } from '../../redux/wishlist/wishlistActions.js';
import { HomeBanner } from '../../components';
import backendURL from '../../utls/data';
import { addToCart } from '../../redux/cart/cartActions.js';

const Wishlist = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let wishlistRef = useRef();

    

    // Scroll to the form when the component mounts
    useEffect(() => {
        const scrollToProduct = () => {
            if (wishlistRef.current) {
                wishlistRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        scrollToProduct();
    }, []);

    // Get wishlist and product data from Redux
    const wishlist = useSelector((state) => state.wishlist?.wishlist || []);
    const productList = useSelector((state) => state.product.products);

    // Early return for loading state after hooks are called
    if (!productList && !wishlist && !wishlist.products) {
        return <div className='my-20 flex justify-center items-center'>Loading...</div>;
    }

    // Filter wishlist items that have matching products
    const wishlistItems = wishlist?.products?.map((wishlistItem) => {
        let matchedProduct = productList.find((product) => product._id === wishlistItem.productId);
        if (matchedProduct) {
            return { ...matchedProduct, quantity: wishlistItem.quantity };
        }
        return null;
    }).filter((item) => item !== null);

    // Remove a product from wishlist
    const removeItem = async (id) => {
        toast.info("Removing Product...");

        const response = await dispatch(removeFromWishlist(id));

        // Check if the response indicates success
        if (removeFromWishlist.fulfilled.match(response)) {
            toast.success(response.payload.message || "Product Removed successfully!");
        } else {
            toast.error(response.payload.message || "Product removal failed. Please try again.");
        }
    };


    const addItem = async (data) => {
        toast.info("Adding to Cart...");

        // Dispatch the add to cart action
        const response = await dispatch(addToCart(data));

        // Check if the response indicates success
        if (addToCart.fulfilled.match(response)) {
            toast.success("Item added to cart successfully!");
        } else {
            toast.error(response.payload.message || "Failed to add item to cart. Please try again.");
        }
    };

   
    return (
        <div className="px-2 sm:px-0 w-full sm:w-[90%] m-auto my-8">
            <HomeBanner text="WISHLIST" />

            <div
                ref={wishlistRef}
                className="grid grid-cols-3 gap-6 my-20">
                {/* First container for product details */}
                <div className="col-span-3 border-[1px] h-fit shadow-md">
                    <h1 className="border-b-[1px] p-3 uppercase font-medium sm:font-bold">Your Wishlist</h1>

                    {/* Wishlist products container */}
                    <div className="p-3">
                        {
                            wishlist && wishlist.products && wishlistItems.length > 0 ?
                                wishlistItems?.map((item, idx) => (
                                    <div key={idx} className="flex flex-row justify-evenly items-center mb-6 md:mb-4">
                                        <img className="w-20 md:w-[12%] text-center" src={`${backendURL}/api/products/image/${item?.image}`} alt={item.name} />

                                        <div className="flex flex-col md:flex-row w-[80%] sm:w-[88%] px-2">
                                            <div className="w-full md:w-[40%] text-[12px] sm:text-[14px]">
                                                <h3 className="text-[16px] sm:text-[18px] w-full truncate">{item.name}</h3>
                                                <div>&#36;{item.price}</div>
                                                <div>
                                                    <span className="font-light">Color :</span>
                                                    <span className="text-gray-400">{item.color || 'Yellow'}</span>
                                                </div>
                                                <div>
                                                    <span className="font-light">Size: </span>
                                                    <span className="text-gray-400">{item.size || 'S'}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-row justify-between items-center w-full md:w-[60%] h-fit pt-2 md:pt-0 pl-0 md:pl-2">
                                                <div className="text-center text-[14px] md:text-[16px] font-bold">
                                                    &#36;{item.price.toFixed(2)}
                                                </div>

                                                <i
                                                    onClick={() => removeItem(item._id)}
                                                    title="remove"
                                                    className="w-fit cursor-pointer text-[25px] text-center bi bi-trash-fill"
                                                />

                                                <button
                                                    onClick={() => addItem({ productId: item._id, quantity:1 })}
                                                    className="rounded-sm hover:bg-gray-600 bg-blue-400 uppercase font-semibold sm:px-4 sm:py-2 p-1 text-white sm:text-[14px] text-[12px]">
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div>Your wishlist is empty.</div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
