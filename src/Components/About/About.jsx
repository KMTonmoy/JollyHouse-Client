import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <motion.div
            className="container mx-auto py-12 px-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-3xl md:text-5xl font-bold text-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Welcome to JollyHouse
            </motion.h1>
            <motion.p
                className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                JollyHouse is not just a building; it's an epitome of luxury, innovation, and sustainability.
                Situated in the heart of the city, our tower stands tall as a testament to modern architecture
                and lifestyle. With breathtaking views of the skyline and world-class amenities, JollyHouse
                offers an unparalleled living experience.
            </motion.p>
            <motion.p
                className="text-lg md:text-xl leading-relaxed text-gray-700 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                Our mission is to provide our residents with the ultimate comfort and convenience. From
                state-of-the-art fitness centers to rooftop gardens, every aspect of JollyHouse is designed
                with your well-being in mind. Whether you're looking for a cozy studio apartment or a
                spacious penthouse suite, we have the perfect living space for you.
            </motion.p>
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <Link
                    to='/apartments'
                    className="inline-block px-8 py-4 text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md transition duration-300 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Explore Apartments
                </Link>
            </motion.div>
            <motion.div
                className="mt-12 border border-gray-300 rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <img src="https://traveltomorrow.com/wp-content/uploads/2021/02/147677254_2935210533472459_996703284364145499_n.jpg" alt="About JollyHouse" className="w-full" />
            </motion.div>
        </motion.div>
    );
};

export default About;
