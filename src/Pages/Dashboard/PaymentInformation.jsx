import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentInformation = () => {

    const [memberInfo, setMemberInfo] = useState({});

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await fetch(`https://jolly-home-server.vercel.app/users/${user?.email}`);
                const userData = await response.json();
                setMemberInfo(userData);

            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };


        if (user) {
            fetchMemberInfo();

        }
    }, [user]);

    const handlePayment = (e) => {
        e.preventDefault();
        const month = e.target.elements.month.value;
        console.log(month);
        navigate('/dashboard/process-payment', { state: { paymentMonth: month } });
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

                    <button type="submit" className='bg-green-500 mt-5 p-3 font-bold text-white rounded-md w-full'>Process Payment</button>
                </form>

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



const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default PaymentInformation;
