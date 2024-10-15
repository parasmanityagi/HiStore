import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


import backendURL from '../../utls/data';
import { addToCart } from '../../redux/cart/cartActions';
import { addToWishlist } from '../../redux/wishlist/wishlistActions';

const AddToCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let productRef = useRef()

  let { id } = useParams()
  let products = useSelector(state => state.product.products);
  let data = products.filter((data) => data._id === id)

  let [quantity, setQuantity] = useState(1);

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


  const addItemToWishlist = async (data) => {
    toast.info("Adding to Wishlist...");

    // Dispatch the add to wishlist action
    const response = await dispatch(addToWishlist(data));

    // Check if the response indicates success
    if (addToWishlist.fulfilled.match(response)) {
      toast.success("Item added to wishlist successfully!");
    } else {
      toast.error(response.payload.message || "Failed to add item to wishlist. Please try again.");
    }
  };



  const handleCheckout = () => {
    navigate('/payment/checkout', { state: { totalAmount: data[0].price, quantity } });
  };


  // Scroll to the form when the component mounts
  useEffect(() => {
    const scrollToProduct = () => {
      if (productRef.current) {
        productRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scrollToProduct();
  }, []);


  return (
    <div
      ref={productRef}
      className="flex md:flex-row flex-col gap-10 w-full my-10 md:my-20">
      {
        data.map((product, idx) => (
          <>
            <div key={idx} className='w-full md:w-1/2 sm:h-96 h-60'>
              <img
                className="m-auto h-full"
                src={`${backendURL}/api/products/image/${product?.image}`}
                alt={product.name}
              />
            </div>

            <div key={product._id} className='w-full md:w-1/2 flex flex-col text-[12px] sm:text-[14px] px-2'>
              <div className="">
                <h3 className='w-full text-[16px] sm:text-[18px]'>{product.name}</h3>
                <p className='text-orange-400 font-medium my-1'>&#36;{product.price}</p>
                <div className='my-1'><span className='text-gray-400'>Color:</span> Yellow</div>
                <div className='my-1'><span className='text-gray-400'>Size:</span> S</div>

                <div className='my-1 flex flex-row gap-4 items-center'><span className='text-gray-400'>
                  Quantity:</span>
                  <div className='flex flex-row gap-4 items-center'>
                    <span
                      onClick={() => setQuantity(quantity++)}
                      className='px-1 text-[20px] rounded-full shadow-sm cursor-pointer bg-orange-400'
                      title='Increase'>
                      <i className='bi bi-plus' />
                    </span>

                    <span className='select-none'>{quantity}</span>

                    <span
                      onClick={() => quantity > 1 && setQuantity(quantity--)}
                      className='px-1 text-[20px] rounded-full shadow-sm cursor-pointer bg-orange-400'
                      title='Decrease'>
                      <i className='bi bi-dash' />
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[12px] sm:text-[14px]">
                <div><span className='text-gray-400'>
                  Description:</span> {product.desc}</div>

                <div className='my-1'><span className='text-gray-400'>
                  Total products:</span> &#36;{product.price * quantity}
                </div>

                <div className='my-1'><span className='text-gray-400'>
                  Total shipping:</span> $7.00
                </div>

                <div className='my-1'><span className='text-gray-400'>
                  Taxes:</span> $0.00
                </div>

                <div className='my-1'><span className='text-gray-400'>
                  Total:</span> &#36;{(product.price * quantity) + 7} (tax incl.)
                </div>
              </div>

              <div className='flex flex-row justify-between flex-wrap text-white'>
                <button
                  onClick={() => addItem({ productId: product._id, quantity })}
                  className='bg-black hover:bg-orange-400 rounded-lg my-2 py-2 px-4 uppercase font-medium'>
                  Add To Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className='bg-black hover:bg-orange-400 rounded-lg my-2 py-2 px-4 uppercase font-medium'>
                  proceed to checkout
                </button>
              </div>

              <div className='flex flex-row justify-between flex-wrap text-white'>
                <button
                  onClick={() => addItemToWishlist({ productId: product._id })}
                  className='bg-black hover:bg-orange-400 rounded-lg my-2 py-2 px-4 uppercase font-medium'>
                  Add To Wishlist
                </button>
              </div>
            </div>

          </>
        ))
      }
    </div>

  );
};

export default AddToCart