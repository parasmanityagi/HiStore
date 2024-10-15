import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



import { removeFromCart } from '../../redux/cart/cartActions';
import { HomeBanner } from '../../components';
import backendURL from '../../utls/data';
import { addToWishlist } from '../../redux/wishlist/wishlistActions';

const Cart = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch();
    let cartRef = useRef();
    // Scroll to the form when the component mounts
    useEffect(() => {
        const scrollToProduct = () => {
            if (cartRef.current) {
                cartRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        scrollToProduct();
    }, []);


    const [itemCounts, setItemCounts] = useState({});


    // Get cart and product data from Redux
    const cart = useSelector((state) => state.cart.cart);
    const productList = useSelector((state) => state.product.products);
    const wishlist = useSelector((state)=> state.wishlist.wishlist)

    // Initialize or update item counts whenever cart items change
    useEffect(() => {
        if (cart && cart.products && productList) {
            const initialCounts = {};
            cart.products.forEach(cartItem => {
                const matchedProduct = productList.find(product => product._id === cartItem.productId);
                if (matchedProduct) {
                    initialCounts[cartItem.productId] = cartItem.quantity || 1;
                }
            });
            setItemCounts(initialCounts);
        }
    }, [cart, productList]);

    // Early return for loading state after hooks are called
    if (!cart || !cart.products || !productList)
        return <div className='my-20 flex justify-center items-center'>Loading...</div>

    // Filter cart items that have matching products
    const cartItems = cart.products.map((cartItem) => {
        let matchedProduct = productList.find((product) => product._id === cartItem.productId);
        if (matchedProduct) {
            return { ...matchedProduct, quantity: cartItem.quantity };
        }
        return null;
    }).filter((item) => item !== null);

    // Increment count for a specific item
    const increment = (id) => {
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [id]: prevCounts[id] + 1,
        }));
    };

    // Decrement count for a specific item
    const decrement = (id) => {
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [id]: Math.max(1, prevCounts[id] - 1),
        }));
    };

    // Remove a product from cart
    const removeItem = async (id) => {
        // First, display a loading toast or message if needed
        toast.info("Removing Product...");

        const response = await dispatch(removeFromCart(id));

        // Check if the response indicates success
        if (removeFromCart.fulfilled.match(response)) {
            toast.success(response.payload.message || "Product Removed successful!");
        } else {
            toast.error(response.payload.message || "Product Removed failed. Please try again.");
        }
    };


    // payment page
    const handleCheckout = () => {
        let price = 0;
        const totalAmount = cartItems.forEach((item) => {
            price += item.price * (itemCounts[item._id] || 1);
        });

        let count = 0;
        const quantity = Object.values(itemCounts).forEach((itemCount) => {
            count += itemCount;
        });

        console.log(price, count);
        navigate('/payment/checkout', { state: { totalAmount: price, quantity: count } });
    };


    // add to wishlist
    const addItemToWishlist = async (data) => {
        toast.info('Adding to Wishlist...')

        // Dispatch the add to wishlist action
        const response = await dispatch(addToWishlist(data));

        // Check if the response indicates success
        if (addToWishlist.fulfilled.match(response)) {
            toast.success("Item added to wishlist successfully!");
        } else {
            toast.error(response.payload.message || "Failed to add item to wishlist. Please try again.");
        }
    };


    return (
        <div className="px-2 sm:px-0 w-full sm:w-[90%] m-auto my-8">
            <HomeBanner text="CART" />

            <div
                ref={cartRef}
                className="grid grid-cols-3 gap-6 my-20">
                {/* First container for product details */}
                <div className="col-span-3 lg:col-span-2 border-[1px] h-fit shadow-md">
                    <h1 className="border-b-[1px] p-3 uppercase font-medium sm:font-bold">Shopping Cart</h1>

                    {/* Cart products container */}
                    <div className="p-3">
                        {
                            cartItems.length > 0 ?
                                cartItems.map((item, idx) => (
                                    <div
                                        key={idx} className="flex flex-row justify-evenly items-center mb-6 md:mb-4">
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

                                            <div className="flex flex-row justify-between w-full md:w-[60%] h-fit pt-2 md:pt-0 pl-0 md:pl-2">
                                                <div className="w-20 h-12 md:w-[20%] flex border-[1px] shadow-lg">
                                                    <div className="text-center pt-2.5 w-full min-h-full">{itemCounts[item._id]}</div>
                                                    <div className="inline float-end border-l-[1px]">
                                                        <i onClick={() => increment(item._id)} title="Increase" className="block px-1 cursor-pointer bi bi-chevron-up border-b-[1px]" />
                                                        <i onClick={() => decrement(item._id)} title="Decrease" className="block px-1 cursor-pointer bi bi-chevron-down" />
                                                    </div>
                                                </div>

                                                <div className="text-center text-[14px] md:text-[16px] sm:font-medium">
                                                    &#36;{(item.price * (itemCounts[item._id] || 1)).toFixed(2)}
                                                </div>

                                                <div className='flex flex-col gap-3 text-[14px] sm:text-[18px]'>
                                                    <i
                                                        onClick={() => removeItem(item._id)}
                                                        title="remove"
                                                        className="w-fit cursor-pointer text-center bi bi-trash-fill"
                                                    />

                                                    <i
                                                        onClick={() => addItemToWishlist({ productId: item._id })}
                                                        title='Add to Wishlist'
                                                        className={`bi ${Array.isArray(wishlist.products) && wishlist.products.some(wishItem => wishItem.productId == item._id) ? 'bi-heart-fill text-red-400' : 'bi-heart'} cursor-pointer`}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div>Your cart is empty.</div>
                                )
                        }
                    </div>
                </div>

                {/* Second container for payment details */}
                <div className="col-span-3 lg:col-span-1 py-3 border-[1px] h-fit shadow-md text-gray-400 text-[14px]">
                    <div className="p-3 mb-3">
                        <div className="mb-3">
                            <span>{cartItems.length} Items</span>
                            <span className="float-end">
                                &#36;{
                                    (cartItems.reduce((total, item) => total + item.price * itemCounts[item._id], 0)).toFixed(2)
                                }
                            </span>
                        </div>
                        <div>
                            <span>Shipping</span>
                            <span className="float-end">&#36;7</span>
                        </div>
                    </div>
                    <hr className="w-full h-[1px] bg-gray-400 my-2" />

                    <div className="p-3 mb-3">
                        <div className="mb-3">
                            <span>Total (tax excl.)</span>
                            <span className="float-end">&#36;{
                                (cartItems.reduce((total, item) => total + item.price * itemCounts[item._id], 0) + 7).toFixed(2)
                            }</span>
                        </div>
                        <div>
                            <span>Taxes</span>
                            <span className="float-end">&#36;0.00</span>
                        </div>
                    </div>
                    <hr className="w-full h-[1px] bg-gray-400 my-2" />

                    <div className="flex justify-center mt-3">
                        <button
                            onClick={handleCheckout}
                            className="rounded-sm hover:bg-gray-600 bg-blue-400 uppercase font-semibold px-4 py-2 text-white" type="submit">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
