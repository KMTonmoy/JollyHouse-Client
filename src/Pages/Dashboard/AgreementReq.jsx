import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const AgreementReq = () => {
    const [requests, setRequests] = useState([]);
    const [apartments, setApartments] = useState([]);
    const today = new Date();
    const date = String(today.getDate()).padStart(2, '0');
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    useEffect(() => {
        fetchAgreementRequests();
    }, []);

    const fetchAgreementRequests = async () => {
        try {
            const response = await fetch('https://jolly-home-server.vercel.app/agreement');
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching agreement requests:', error);
        }
    };


    const handleAccept = async (request) => {
        // console.log(request)
        try {
            // Fetch the apartment details
            const response = await fetch(`https://jolly-home-server.vercel.app/apartments/${request.id}`);
            const apartment = await response.json();

            // Check if the apartment ID matches
            if (apartment && apartment._id === request.id) {
                // Update the apartment status to "booked"
                const updateResponse = await fetch(`https://jolly-home-server.vercel.app/apartments/${request.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'booked', })
                });

                // Check if the status update was successful
                if (updateResponse.ok) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'The Agreement has been accepted.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                    // Delete the agreement request
                    try {
                        const deleteResponse = await fetch(`https://jolly-home-server.vercel.app/agreement/${request._id}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: request.userEmail }),
                        });
                        const deleteResult = await deleteResponse.json();
                        if (deleteResult.deletedCount > 0) {
                            // Fetch the user details using the userEmail
                            const userResponse = await fetch(`https://jolly-home-server.vercel.app/users?email=${request.userEmail}`);
                            const user = await userResponse.json();

                            // Update the user's role to "member"

                            const updateUserResponse = await fetch(`https://jolly-home-server.vercel.app/users/${request.userEmail}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    role: 'member', ids: request.id,
                                    userEmail: request.userEmail,
                                    userName: request.userName,
                                    floorNo: request.floorNo,
                                    blockName: request.blockName,
                                    apartmentNo: request.apartmentNo,
                                    rent: request.rent,
                                    agreementAcceptDate: `${month}/${date}/${year}`,
                                })
                            });

                            if (updateUserResponse.ok) {
                                fetchAgreementRequests();
                            } else {
                                throw new Error('Failed to update user role');
                            }


                        }
                    } catch (error) {
                        console.error('Error deleting agreement:', error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error deleting the agreement request.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                } else {
                    throw new Error('Failed to update apartment status');
                }
            } else {
                Swal.fire({
                    title: 'Not Matched!',
                    text: 'The agreement ID does not match any apartment ID.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error processing request:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error processing the request.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };







    const handleReject = async (data) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://jolly-home-server.vercel.app/agreement/${data}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: data.userEmail }),
                    });
                    const responseData = await response.json();
                    if (responseData.deletedCount > 0) {

                        Swal.fire({
                            title: "Success!",
                            text: `Agreement Requests has been deleted`,
                            icon: "success"
                        });

                        fetchAgreementRequests();
                    }
                } catch (error) {
                    console.error('Error deleting agreement:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error deleting the agreement request.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };

    return (
        <div className="">
            <h1 className="text-3xl font-semibold mb-4">Agreement Requests</h1>
            <div className=" ">
                <table className="w-full  bg-white shadow-md rounded-lg">
                    <thead className="bg-purple-700 text-white">
                        <tr>
                            <th className="px-4 py-2 fixed-width">User Name</th>
                            <th className="px-4 py-2 fixed-width">User Email</th>
                            <th className="px-4 py-2 fixed-width">Floor No</th>
                            <th className="px-4 py-2 fixed-width">Block Name</th>
                            <th className="px-4 py-2 fixed-width">Room No</th>
                            <th className="px-4 py-2 fixed-width">Rent</th>
                            <th className="px-4 py-2 fixed-width">Request Date</th>
                            <th className="px-4 py-2 fixed-width">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request._id} className="bg-gray-100 border-b">
                                <td className="px-4 py-2 fixed-width">{request.userName}</td>
                                <td className="px-4 py-2 fixed-width">{request.userEmail}</td>
                                <td className="px-4 py-2 fixed-width">{request.floorNo}</td>
                                <td className="px-4 py-2 fixed-width">{request.blockName}</td>
                                <td className="px-4 py-2 fixed-width">{request.apartmentNo}</td>
                                <td className="px-4 py-2 fixed-width">{request.rent}</td>
                                <td className="px-4 py-2 fixed-width">{new Date(request.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 fixed-width space-x-2">
                                    <button
                                        onClick={() => handleAccept(request)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(request._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgreementReq;