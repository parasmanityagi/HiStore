import express from 'express';
import Stripe from 'stripe';

const paymentRouter = express.Router();
// stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Stripe payment endpoint
paymentRouter.post('/payment', async (req, res) => {
    const { amount, currency, source, return_url } = req.body;

    if (!amount || !currency || !source || !return_url) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: source,
            confirm: true,
            return_url,
        });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


export default paymentRouter