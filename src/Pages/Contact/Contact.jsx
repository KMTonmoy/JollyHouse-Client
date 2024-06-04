import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic, e.g., send form data to a server
        // console.log('Form submitted:', formData);
        // Reset form fields
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen  bg-gray-100 md:p-20 gap-10 ">
            <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
                <div className="bg-white p-8 rounded-lg shadow-md  w-full transform transition-all duration-500 hover:shadow-lg hover:scale-105">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-full md:w-1/2 text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Get in Touch</h2>
                <p className="text-gray-600 mb-6">
                    We'd love to hear from you! Whether you have a question about our services, pricing, or anything else,
                    our team is ready to answer all your questions. Reach out to us and we'll respond as soon as we can.
                </p>
                <p className="text-gray-600">
                    You can also contact us at:
                </p>
                <p className="text-gray-600 font-medium">
                    Email: support@jollyhome.com
                </p>
                <p className="text-gray-600 font-medium">
                    Phone: +1 234 567 890
                </p>
            </div>
        </div>
    );
};

export default ContactPage;
