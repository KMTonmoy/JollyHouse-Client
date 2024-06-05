import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const [couponCode, setCouponCode] = useState('');
    const [memberInfo, setMemberInfo] = useState({});
    const [coupons, setCoupons] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [totalToPay, setTotalToPay] = useState(0);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${user?.email}`);
                const userData = await response.json();
                setMemberInfo(userData);
                setTotalToPay(userData.rent);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        const fetchCoupons = async () => {
            try {
                const response = await fetch('http://localhost:8000/coupons');
                const couponsData = await response.json();
                setCoupons(couponsData);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        if (user) {
            fetchMemberInfo();
            fetchCoupons();
        }
    }, [user]);

    const handlePayment = (e) => {
        e.preventDefault();
        const month = e.target.elements.month.value;
        console.log(month);
        document.getElementById('my_modal_1').showModal();
    };

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

    return (
        <div className="container mx-auto flex justify-center items-center min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full md:w-[800px] rounded-lg shadow-lg p-6"
            >
                <h2 className='font-bold text-center text-3xl mb-5'>Payment Information</h2>
                <form className='space-y-5' onSubmit={handlePayment}>
                    <div className='grid grid-cols-2 gap-6'>
                        <MemberInfoField label="Email" value={memberInfo.email} />
                        <MemberInfoField label="Floor" value={memberInfo.floorNo} />
                        <MemberInfoField label="Block Name" value={memberInfo.blockName} />
                        <MemberInfoField label="Apartment No/Room No" value={memberInfo.apartmentNo} />
                        <MemberInfoField label="Rent" value={memberInfo.rent} />
                        <MemberInfoField label="Agreement Accept Date" value={memberInfo.agreementAcceptDate} />
                    </div>
                    <div>
                        <label className='block mb-2'>Select Month: </label>
                        <select className='w-full p-2 border-2 border-blue-100 rounded-md' name="month" id="month">
                            {months.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <CouponCodeField
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onApplyCoupon={applyCoupon}
                    />
                    {discount > 0 && <p className="text-green-500 mt-2">Coupon applied! You get ${discount} off.</p>}
                    <div className='mt-5'>
                        <p className='text-xl font-bold'>Total to Pay: ${totalToPay}</p>
                    </div>
                    <button type="submit" className='bg-green-500 mt-5 p-3 font-bold text-white rounded-md w-full'>Process Payment</button>
                </form>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">

                        <Elements stripe={stripePromise}>
                            <CheckoutForm totalToPay={totalToPay} />
                        </Elements>


                    </div>
                </dialog>
            </motion.div>
        </div>
    );
};

const MemberInfoField = ({ label, value }) => {
    return (
        <div>
            <label className='block mb-2'>{label}:</label>
            <input className='outline-none p-2 w-full border-2 border-blue-100 rounded-md' type="text" value={value || ''} readOnly />
        </div>
    );
};

const CouponCodeField = ({ value, onChange, onApplyCoupon }) => {
    return (
        <div>
            <label className='block mb-2'>Coupon Code:</label>
            <div className='flex'>
                <input className='outline-none p-2 w-full border-2 border-blue-100 rounded-l-md' type="text" value={value} onChange={onChange} />
                <button type="button" className='bg-green-500 font-bold text-white p-2 rounded-r-md' onClick={onApplyCoupon}>Apply Coupon</button>
            </div>
        </div>
    );
};

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default Payment;
