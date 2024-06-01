import React from 'react';

const FAQ = () => {
    const questionsAndAnswers = [
        {
            question: "What is JollyHouse?",
            answer: "JollyHouse is a luxury apartment complex located in the heart of the city, offering modern amenities and a sustainable living environment."
        },
        {
            question: "What amenities do you offer?",
            answer: "We offer a state-of-the-art fitness center, rooftop gardens, a swimming pool, a co-working space, and much more."
        },
        {
            question: "How do I book an apartment?",
            answer: "You can book an apartment by visiting our website and filling out the booking form. Our team will get in touch with you to finalize the details."
        },
        {
            question: "Do you offer parking facilities?",
            answer: "Yes, we offer onsite parking facilities for residents."
        },
        {
            question: "What is the pet policy?",
            answer: "We are a pet-friendly community and allow pets in our apartments. Please refer to our pet policy for more details."
        }
    ];

    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* FAQ Section */}
                    <div className="flex-1">
                        {questionsAndAnswers.map((item, index) => (
                            <div key={index} className="collapse collapse-plus bg-base-200 mb-4">
                                <input type="radio" name="faq-accordion" id={`faq-${index}`} defaultChecked={index === 0} />
                                <div className="collapse-title text-xl font-medium">
                                    {item.question}
                                </div>
                                <div className="collapse-content">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Image Section */}
                    <div className="flex-1 flex justify-center items-center">
                        <img src="https://t4.ftcdn.net/jpg/01/28/17/47/360_F_128174778_0XvhB1qi70yXNOPuUFzBNT85xKaWnVde.jpg" alt="JollyHouse Apartments" className="rounded-lg shadow-lg max-w-full h-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
