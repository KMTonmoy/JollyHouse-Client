import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const RoleInfo = () => {
    const { user } = useContext(AuthContext);

    const totalMoney = 5000; // Assuming this is a fixed value for demo purposes
    const [users, setUsers] = useState({});
    const [Allusers, setAllUsers] = useState([]);
    const [Announcement, setTotalAnnouncement] = useState([]);
    const role = users?.role;
    const bookedTotal = Allusers.length;

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:8000/users/${user.email}`)
                .then(res => res.json())
                .then(data => setUsers(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [user?.email]);

    useEffect(() => {
        fetch(`http://localhost:8000/announcement`)
            .then(res => res.json())
            .then(data => setTotalAnnouncement(data))
            .catch(error => console.error('Error fetching announcements:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/users`)
            .then(res => res.json())
            .then(data => {
                const filteredUsers = data.filter(user => user.role === 'member');
                setAllUsers(filteredUsers);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="flex flex-col md:flex-row justify-center items-stretch">
            <div className="w-full md:w-1/2 bg-gray-100 h-auto flex flex-col justify-center items-center p-8">
                {user?.photoURL && (
                    <img src={user.photoURL} className="w-32 h-32 rounded-full border-4 border-[#d1a054] mb-4" alt={user.displayName} />
                )}
                <h1 className="text-2xl font-semibold">{user?.displayName}</h1>
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
                                <p className="ml-2">${totalMoney}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="announcement" className="text-3xl mr-4">📢</span>
                                <p className="text-xl font-semibold">Total Announcement:</p>
                                <p className="ml-2">{Announcement.length}</p>
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
                                <p className="ml-2">{users.apartmentNo}</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="money" className="text-3xl mr-4">💵</span>
                                <p className="text-xl font-semibold">Total Payment:</p>
                                <p className="ml-2">${totalMoney} // Dummy</p>
                            </div>
                            <div className="flex items-center">
                                <span role="img" aria-label="announcement" className="text-3xl mr-4">📢</span>
                                <p className="text-xl font-semibold">Total Announcement:</p>
                                <span className="ml-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                    {Announcement.length}
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
