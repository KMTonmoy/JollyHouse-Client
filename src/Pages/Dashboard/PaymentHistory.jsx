import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const fetchPayment = async () => {
        const response = await axios.get(`http://localhost:8000/payments/${email}`);
        return response.data;
    };

    const { data: paymentData = [], isLoading, error } = useQuery({
        queryKey: ['payment', email],
        queryFn: fetchPayment,
        enabled: !!email,
    });

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = paymentData.filter(payment => {
        if (!payment.paymentMonth) return false; // Add a check to ensure paymentMonth exists
        const paymentMonth = payment.paymentMonth.toLowerCase();
        return paymentMonth.includes(searchTerm.toLowerCase());
    });

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                placeholder="Search by month name"
                className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>

                            <th className="py-2 px-1 md:px-4 text-sm md:text-xl">User Email</th>
                            <th className="py-2 px-1 md:px-4 text-sm md:text-xl">Transaction ID</th>
                            <th className="py-2 px-1 md:px-4 text-sm md:text-xl">Payment Month</th>
                            <th className="py-2 px-1 md:px-4 text-sm md:text-xl">Payment Date</th>
                            <th className="py-2 px-1 md:px-4 text-sm md:text-xl">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {filteredData.map(payment => (
                                <motion.tr
                                    key={payment._id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <td className="py-2 px-1 md:px-4 md:text-xl text-xs">{payment.email}</td>
                                    <td className="py-2 px-1 md:px-4 md:text-xl text-xs">{payment.transactionId}</td>
                                    <td className="py-2 px-1 md:px-4 md:text-xl text-xs">{payment.paymentMonth}</td>
                                    <td className="py-2 px-1 md:px-4 md:text-xl text-xs">{new Date(payment.SubmitDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-1 md:px-4 md:text-xl text-xs">${payment.price}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
