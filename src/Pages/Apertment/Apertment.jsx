import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Apartments = () => {
    const { user } = useContext(AuthContext);
    const [apartments, setApartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const apartmentsPerPage = 6;

    useEffect(() => {

        const fetchApartments = async () => {
            try {
                const response = await axios.get('apertment.json');
                setApartments(response.data);
            } catch (error) {
                console.error('Error fetching apartments:', error);
            }
        };

        fetchApartments();
    }, []);

    const handleAgreement = async (apartment) => {
        if (!user) {
            history.push('/login');
            return;
        }

        const agreementData = {
            userName: user.name,
            userEmail: user.email,
            floorNo: apartment.floorNo,
            blockName: apartment.blockName,
            apartmentNo: apartment.apartmentNo,
            rent: apartment.rent,
            status: 'pending',
        };

        try {
            await axios.post('/api/agreements', agreementData);
            alert('Agreement submitted successfully!');
        } catch (error) {
            console.error('Error submitting agreement:', error);
        }
    };

    const indexOfLastApartment = currentPage * apartmentsPerPage;
    const indexOfFirstApartment = indexOfLastApartment - apartmentsPerPage;
    const currentApartments = apartments.slice(indexOfFirstApartment, indexOfLastApartment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Available Apartments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentApartments.map((apartment, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <img src={apartment.image} alt={`Apartment ${apartment.apartmentNo}`} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                        <p className="text-lg font-semibold">Floor No: {apartment.floorNo}</p>
                        <p className="text-lg font-semibold">Block Name: {apartment.blockName}</p>
                        <p className="text-lg font-semibold">Apartment No: {apartment.apartmentNo}</p>
                        <p className="text-lg font-semibold">Rent: ${apartment.rent}</p>
                        <Link to={`/apartments/${apartment.id}`}>
                            <button
                                className="mt-4 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Details
                            </button>
                        </Link>

                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <Pagination
                    apartmentsPerPage={apartmentsPerPage}
                    totalApartments={apartments.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

const Pagination = ({ apartmentsPerPage, totalApartments, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalApartments / apartmentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center">
                {pageNumbers.map(number => (
                    <li key={number} className="mx-2">
                        <button
                            onClick={() => paginate(number)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Apartments;
