import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [adminData, setAdminData] = useState({});
    const [totalRooms, setTotalRooms] = useState(0);
    const [availableRooms, setAvailableRooms] = useState(0);
    const [agreementRooms, setAgreementRooms] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMembers, setTotalMembers] = useState(0);
    const [data, setuserData] = useState({});
    const [agreementData, setagreement] = useState([]);
    
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${user.email}`);
                const data = await response.json();
                setAdminData(data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        const fetchRoomsData = async () => {
            try {
                const response = await fetch('http://localhost:8000/apartments');
                const rooms = await response.json();
                setTotalRooms(rooms.length);
                setAvailableRooms(rooms.filter(room => !room.status || room.status === 'free').length);
                setAgreementRooms(rooms.filter(room => room.status === 'booked').length);
            } catch (error) {
                console.error('Error fetching rooms data:', error);
            }
        };

        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://localhost:8000/users');
                const users = await response.json();
                setTotalUsers(users.length);
                setTotalMembers(users.filter(user => user.role === 'member').length);
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };

        fetchAdminData();
        fetchRoomsData();
        fetchUsersData();
    }, [user.email]);



    const email = user?.email || '';
    const role = data.role;

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:8000/users/${email}`)
                .then(res => res.json())
                .then(data => setuserData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [email]);



    useEffect(() => {

        fetch(`http://localhost:8000/agreement/${user?.email}`)
            .then(res => res.json())
            .then(data => setagreement(data))


    },);

    const availableRoomsPercentage = totalRooms ? ((availableRooms / totalRooms) * 100).toFixed(2) : 0;
    const agreementRoomsPercentage = totalRooms ? ((agreementRooms / totalRooms) * 100).toFixed(2) : 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 capitalize">{role} Profile</h2>
            {role === "admin" && (
                <>
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <img src={user.photoURL} alt="Admin" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-center">{adminData.name}</h3>
                        <p className="text-center">{adminData.email}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold">Total Number of Apartment </h4>
                            <p className="text-2xl">{totalRooms}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold">Available Rooms Percentage</h4>
                            <p className="text-2xl">{availableRoomsPercentage}%</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold">Agreement/Unavailable Rooms Percentage</h4>
                            <p className="text-2xl">{agreementRoomsPercentage}%</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold">Total Number of Users</h4>
                            <p className="text-2xl">{totalUsers}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h4 className="text-lg font-semibold">Total Number of Members</h4>
                            <p className="text-2xl">{totalMembers}</p>
                        </div>
                    </div>
                </>
            )}
            {role === "member" && (


                <div className="flex flex-col items-center">
                    <div className="bg-white w-full md:w-[800px] rounded-lg shadow-lg p-6 mb-8">
                        <img src={user.photoURL} alt="User" className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-center">{user.displayName}</h3>
                        <p className="text-center">{user.email}</p>
                        <p className="text-center">Agreement Accept Date: {data.agreementAcceptDate}</p>
                    </div>

                    <div className="bg-white  w-full md:w-[800px] rounded-lg shadow-lg p-6">
                        <h4 className="text-lg font-semibold">Apartment Info</h4>
                        <p>Floor: {data.floorNo}</p>
                        <p>Block: {data.blockName}</p>
                        <p>Apartment No: {data.apartmentNo}</p>
                    </div>
                </div>




            )}


            {
                role == "user" && (
                    <>
                        <div className="flex flex-col items-center">
                            <div className="bg-white w-full md:w-[800px] rounded-lg shadow-lg p-6 mb-8">
                                <img src={user.photoURL} alt="User" className="w-32 h-32 rounded-full mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-center">{user.displayName}</h3>
                                <p className="text-center">{user.email}</p>
                                <p className="text-center">Agreement Date: {agreementData.agreement.date}</p>
                            </div>

                            <div className="bg-white  w-full md:w-[800px] rounded-lg shadow-lg p-6">
                                <h4 className="text-lg font-semibold">Apartment Info</h4>
                                <p>Floor: {agreementData.agreement.apartmentNo}</p>
                                <p>Block: {agreementData.agreement.blockName}</p>
                                <p>Agreement Status: {agreementData.agreement.status}</p>

                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MyProfile;
