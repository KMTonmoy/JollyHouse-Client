import React, { useState } from 'react';

const MakeAnnouncement = () => {
    // State variables to store the values of the form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
  
        console.log('Submitted:', { title, description });
 
        setTitle('');
        setDescription('');
    };

    return (
        <div className="flex items-center justify-center    ">
            <div className="w-full  p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center text-purple-700 mb-6">Make Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 shadow-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 shadow-md"
                            rows={6}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-400 to-pink-600 rounded-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-700 focus:outline-none focus:bg-gradient-to-r focus:from-pink-500 focus:to-pink-700 shadow-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
