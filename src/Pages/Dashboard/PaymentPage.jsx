import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentPage = () => {
    
 
    const handlePayment = (e) => {
        e.preventDefault();
        // Implement payment processing logic here
        console.log("Payment processing...");
        document.getElementById('my_modal_1').showModal()
    };

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full md:w-[800px] rounded-lg shadow-lg p-6"
            >
                <h2 className='font-bold text-center text-3xl mb-5'>Complete Your Payment</h2>
                <div className='space-y-5'>
            
                    <button
                        className='bg-green-500 mt-5 p-3 font-bold text-white rounded-md w-full'
                        onClick={handlePayment}
                    >
                        Pay Now
                    </button>


                



                </div>
            </motion.div>
        </div>
    );
};

export default PaymentPage;
