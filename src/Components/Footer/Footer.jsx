import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 text-white px-4 py-8"
        >
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <p className="text-sm">Email: <a href="mailto:support@jollyhome.com" className="text-blue-400 hover:text-blue-300">support@jollyhome.com</a></p>
                        <p className="text-sm">Phone: (+123) 456-7890 </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                        <div className="flex">
                            <a href="#" className="mr-4"><FaLinkedin className='text-2xl hover:text-blue-400 transition duration-300'></FaLinkedin></a>
                            <a href="#" className="mr-4"><FaTwitter className='text-2xl hover:text-blue-400 transition duration-300'></FaTwitter></a>
                            <a href="#"><FaEnvelope className='text-2xl hover:text-blue-400 transition duration-300' /></a>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                        <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and news.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your Email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none" />
                            <button type="submit" className="bg-blue-400 px-4 py-2 rounded-r-md hover:bg-blue-500 transition duration-300">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center mt-8"
            >
                <p className="text-sm">&copy; {currentYear} BMS Company. All rights reserved.</p>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
