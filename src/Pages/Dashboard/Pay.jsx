import React, { useContext, useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import CouponCodeFiled from '../../Components/CouponCodeFiled/CouponCodeFiled';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Pay = () => {
    const [coupons, setCoupons] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [memberInfo, setMemberInfo] = useState({});
    const [totalToPay, setTotalToPay] = useState(0);
    const location = useLocation();
    const { paymentMonth } = location.state;
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCoupons = async () => {
            const response = await fetch('http://localhost:8000/coupons');
            const couponsData = await response.json()
            setCoupons(couponsData);
        };

        const fetchMemberInfo = async () => {
            const response = await fetch(`http://localhost:8000/users/${user?.email}`);
            const userData = await response.json()
            setMemberInfo(userData);
            setTotalToPay(userData.rent);
        };

        if (user) {
            fetchMemberInfo();
            fetchCoupons();
        }
    }, [user]);

    const applyCoupon = () => {
        const coupon = coupons.find(c => c.code === couponCode);
        if (coupon) {
            const discountAmount = (memberInfo.rent * coupon.discount) / 100;
            setDiscount(discountAmount);
            setTotalToPay(memberInfo.rent - discountAmount);
        } else {
            setDiscount(0);
            setTotalToPay(memberInfo.rent);
            alert('Invalid coupon code');
        }
    };

    const handlePay = () => {
        document.getElementById('my_modal_1').showModal();
    };

    const today = new Date();
    const currentDate = `${today.getDate().toString().padStart(2, '0')}/${today.getMonth() + 1}/${today.getFullYear()}`;

    return (
        <div>
            <div className="flex justify-center items-center  min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-6  md:w-[800px] w-full">
                    <h2 className="font-bold text-center text-3xl mb-5">Payment Information</h2>
                    <div className="space-y-5">
                        <CouponCodeFiled
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onApplyCoupon={applyCoupon}
                        />
                        {discount > 0 && <p className="text-green-500 mt-2">Coupon applied! You get ${discount} off.</p>}
                        <div className="mt-5">
                            <p className="text-xl font-bold">Total to Pay: ${totalToPay}</p>
                        </div>
                        <p className="text-lg font-bold">Selected Month: {paymentMonth}</p>
                        <p className="text-lg font-bold">Current Date: {currentDate}</p>
                        <button type="button" className="bg-green-500 mt-5 p-3 font-bold text-white rounded-md w-full" onClick={handlePay}>Process Payment</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm 
                                    totalToPay={totalToPay} 
                                    paymentMonth={paymentMonth} />
                                </Elements>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pay;
