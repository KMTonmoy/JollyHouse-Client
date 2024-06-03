import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        // Load coupon data from coupon.json
        fetch('http://localhost:8000/coupons')
            .then(response => response.json())
            .then(data => setCoupons(data))
            .catch(error => console.error('Error loading coupons:', error));
    }, []);

    const getBackgroundColor = (discount) => {
        if (discount <= 20) return 'bg-green-300';
        if (discount <= 25) return 'bg-yellow-300';
        if (discount <= 30) return 'bg-blue-300';
        return 'bg-red-300';
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Special Coupons</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon, index) => (
                    <div key={index} className={`rounded-lg shadow-lg p-6 ${getBackgroundColor(coupon.discount)}`}>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Special Offer!</h2>
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">{coupon.discount}% off</h2>

                        <p className="text-lg text-gray-600 mb-4">
                            Use Code <span className="text-blue-600 font-semibold">{coupon.code}</span> {coupon.description}
                        </p>
                        <Link
                            to="/apartments"
                            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md shadow-md transition duration-300 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Explore Apartments
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Coupon;
