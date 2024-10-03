import Stripe from 'stripe'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const processPayment = asyncHandler(async (req, res)=>{
    const payment = await stripe.paymentIntents.create({ 
        amount: req.body.amount,
        currency: "inr",
        metadata:{
            company: "E-MART"
        },
    });
     if(!payment){
        throw new ApiError(401, "payment not found")
     }
    return res
    .status(200)
    .json(new ApiResponse(200,{client_secret: payment.client_secret},""));
});

 const sendStripeApiKey = asyncHandler(async(req, res)=>{
    return res
    .status(200)
    .json( new ApiResponse(200,{stripeApiKey: process.env.STRIPE_API_KEY}))
});

export{
    sendStripeApiKey,
    processPayment
}
