import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from '../../utls/PaymentForm.js';

const Checkout = () => {
    const location = useLocation();
    const { totalAmount, quantity } = location.state || {};

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg my-20">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <p className="textmd mb-2">Total Amount: <span className="font-bold">&#36;{totalAmount + 7}</span></p>
            <p className="textmd mb-4">Quantity: <span className="font-bold">{quantity}</span></p>
            <PaymentForm totalAmount={totalAmount} quantity={quantity} />
        </div>
    );
};

export default Checkout;
