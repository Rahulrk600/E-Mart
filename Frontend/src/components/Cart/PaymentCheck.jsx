import React from 'react'
import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Payment from './Payment';
import {localhost_api} from '../../Store/api_local.js'

const PaymentCheck = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const config ={headers: {
      "Content-Type": "application/json",
    },  withCredentials: true };
    const { data } = await axios.get(`${localhost_api}/api/v1/payments/stripeapikey`,config);
    setStripeApiKey(data.data.stripeApiKey);
  }
   
  
  useEffect(() => { 
    getStripeApiKey();
  }, []);

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  )
}

export default PaymentCheck
