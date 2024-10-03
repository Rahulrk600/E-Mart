import express from 'express'
import {processPayment,sendStripeApiKey} from '../controllers/payment.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'
 const router = express.Router();
 
 router.route("/payment/process").post(verifyJWT,processPayment);

 router.route("/stripeapikey").get( verifyJWT, sendStripeApiKey) 

 export default router 