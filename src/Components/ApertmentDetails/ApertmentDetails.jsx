import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

const ApartmentDetails = () => {
    const apartment = useLoaderData();

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={apartment.image} alt={`Apartment ${apartment.apartmentNo}`} className="w-full h-auto object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">{apartment.blockName}</h1>
                    <p className="text-lg mb-8">Floor No: {apartment.floorNo}</p>
                    <p className="text-lg mb-8">Apartment No: {apartment.apartmentNo}</p>
                    <p className="text-lg mb-8">Rent: ${apartment.rent}</p>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Book Now</button>
                </div>
            </motion.div>
        </div>
    );
};

export default ApartmentDetails;
