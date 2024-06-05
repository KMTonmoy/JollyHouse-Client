import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';


const RoleInfo = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const { data: userData } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: () => fetch(`http://localhost:8000/users/${user.email}`).then(res => res.json())
    });

    const { data: announcementData } = useQuery({
        queryKey: 'announcements',
        queryFn: () => fetch(`http://localhost:8000/announcement`).then(res => res.json())
    });

    const { data: paymentData } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: () => fetch(`http://localhost:8000/payments/${user.email}`).then(res => res.json())
    });
    const { data: paymentDataAdmin } = useQuery({
        queryKey: ['payments'],
        queryFn: () => fetch(`http://localhost:8000/payments`).then(res => res.json())
    });

    const { data: allUsersData } = useQuery({
        queryKey: 'users',
        queryFn: () => fetch(`http://localhost:8000/users`).then(res => res.json())
    });

    const role = userData?.role;
    const bookedTotal = allUsersData?.filter(user => user.role === 'member').length;
    const totalPayment = paymentData?.reduce((total, item) => total + Number(item.price), 0);
    const totalPaymentAdmin = paymentDataAdmin?.reduce((total, item) => total + Number(item.price), 0);

    return (
        <div className="flex flex-col md:flex-row justify-center items-stretch">
            <div className="w-full md:w-1/2 bg-gray-100 h-auto flex flex-col justify-center items-center p-8">

                <img src={user?.photoURL} className="w-32 h-32 rounded-full border-4 border-[#d1a054] mb-4" alt={user.displayName} />

                <h1 className="text-2xl font-semibold">{user?.displayName}</h1>
                <h1 className="text-xl font-semibold">{user?.email}</h1>
            </div>
            <div className="w-full md:w-1/2 bg-gray-200 h-auto flex flex-col justify-center items-center p-8">
                <h1 className="text-3xl font-semibold mb-4">User Information</h1>
                <div className="flex flex-col items-start space-y-4">
                    {role === "admin" && (
                        <>
                            <div className="flex items-center">
                                <span role="img" aria-label="role" className="text-3xl mr-4">👤</span>
                                <p className="text-xl font-semibold capitalize">Role: {role}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="booked" className="text-3xl mr-4">🏢</span>
                                <p className="text-xl font-semibold">Booked:</p>
                                <p className="ml-2">{bookedTotal}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="money" className="text-3xl mr-4">💵</span>
                                <p className="text-xl font-semibold">Total Money:</p>
                                <p className="ml-2">${totalPaymentAdmin}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="announcement" className="text-3xl mr-4">📢</span>
                                <p className="text-xl font-semibold">Total Announcement:</p>
                                <p className="ml-2">{announcementData?.length}</p>
                            </div>
                        </>
                    )}
                    {role === "member" && (
                        <>
                            <div className="flex items-center">
                                <span role="img" aria-label="role" className="text-3xl mr-4">👤</span>
                                <p className="text-xl font-semibold capitalize">Role: {role}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="apartment" className="text-3xl mr-4">🏢</span>
                                <p className="text-xl font-semibold">Apartment No:</p>
                                <p className="ml-2">{userData?.apartmentNo}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="money" className="text-3xl mr-4">💵</span>
                                <p className="text-xl font-semibold">Total Payment:</p>
                                <p className="ml-2">${totalPayment}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="announcement" className="text-3xl mr-4">📢</span>
                                <p className="text-xl font-semibold">Total Announcement:</p>
                                <span className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    {announcementData?.length}
                                </span>
                            </div>
                        </>
                    )}



                    {role === "user" && (
                        <>
                            <div className="flex items-center">
                                <span role="img" aria-label="role" className="text-3xl mr-4">👤</span>
                                <p className="text-xl font-semibold capitalize">Role: {role}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="apartment" className="text-3xl mr-4">🏢</span>
                                <p className="text-xl font-semibold">Apartment No:</p>
                                <p className="ml-2">N/A</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="money" className="text-3xl mr-4">💵</span>
                                <p className="text-xl font-semibold">Total Payment:</p>
                                <p className="ml-2">${totalPayment}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="announcement" className="text-3xl mr-4">📢</span>
                                <p className="text-xl font-semibold">Total Announcement:</p>
                                <span className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    {announcementData?.length}
                                </span>
                            </div>
                        </>
                    )}





                </div>
            </div>
        </div>
    );
};

export default RoleInfo;



