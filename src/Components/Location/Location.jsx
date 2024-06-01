import React from 'react';

const Location = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Location & Directions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Google Maps Iframe */}
                    <div className="w-full h-64 md:h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105802.59219910887!2d-118.27492414122996!3d34.03537931645625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1717223993382!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    {/* Location Details */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
                        <p className="text-lg text-gray-800 mb-6">
                            Our apartments are located in the heart of Los Angeles, offering easy access to entertainment, dining, and cultural attractions. Explore the vibrant city life right outside your door.
                        </p>
                        <h3 className="text-2xl font-semibold mb-4">Directions</h3>
                        <p className="text-lg text-gray-800 mb-6">
                            Our building is conveniently located near major highways and public transportation routes. Whether you're arriving by car or using public transit, our location is easily accessible.
                        </p>
                        <p className="text-lg text-gray-800">
                            For detailed directions, feel free to contact our team, and we'll be happy to assist you in reaching our location.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
