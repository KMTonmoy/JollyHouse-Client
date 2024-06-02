import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AgreementReq = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchAgreementRequests();
    }, []);

    const fetchAgreementRequests = async () => {
        try {
            const response = await fetch('http://localhost:8000/agreement');
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching agreement requests:', error);
        }
    };

    const handleAccept = async (email) => {
        try {
            await fetch(`http://localhost:8000/agreement-requests/accept`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            Swal.fire({
                title: 'Accepted!',
                text: 'Agreement request has been accepted.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            fetchAgreementRequests();
        } catch (error) {
            console.error('Error accepting request:', error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error accepting the request.',
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
                    const response = await fetch(`http://localhost:8000/agreement/${data}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: data.userEmail }),
                    });
                    const responseData = await response.json();
                    if (responseData.deletedCount > 0) {
                        Swal.fire({
                            icon: "success",
                            title: `${data.userName} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500
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
                                <td className="px-4 py-2 fixed-width">{new Date(request.requestDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 fixed-width space-x-2">
                                    <button
                                        onClick={() => handleAccept(request.userEmail)}
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
