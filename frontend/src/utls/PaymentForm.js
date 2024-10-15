import React, {  useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

import backendURL, { frontendURL } from '../utls/data.js'

const PaymentForm = ({ totalAmount , quantity}) => {
    let navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        

        if (error) {
            setError(error.message);
            setSuccess(null);
        } else {
            try {

                const response = await axios.post(`${backendURL}/api/payment`, {
                    amount: totalAmount,
                    currency: 'usd',
                    source: paymentMethod.id,
                    return_url: frontendURL
                });

                setSuccess('Payment successful!');
                toast.success('Payment successful!');
                navigate('/');
                setSuccess(null)
                setError(null);
            } catch (err) {
                setError('Payment failed!');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <div
                className='flex justify-center my-4 text-white'
            >
                <button
                    className='bg-black hover:bg-orange-400 rounded-lg my-2 py-2 px-4 uppercase font-medium'
                    type="submit"
                    disabled={!stripe}
                >
                    Pay
                </button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
        </form>
    );
};

export default PaymentForm;
