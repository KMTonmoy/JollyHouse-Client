import React, { useEffect, useState } from 'react';
import { FaBuilding, FaUser } from 'react-icons/fa';
import { LuNewspaper } from "react-icons/lu";
import CountUp from 'react-countup';
import { MdOutlineToken } from "react-icons/md";


const Box = () => {
    const [datas, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [agreements, setAgreements] = useState([]);
    const [coupon, setCoupon] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/users`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/apartments`)
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/agreement`)
            .then(res => res.json())
            .then(data => setAgreements(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:8000/coupons`)
            .then(res => res.json())
            .then(data => setCoupon(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg py-10 px-6 w-full md:w-[380px] flex items-center transition-transform transform hover:scale-105">
                <FaUser className="text-4xl text-blue-500 mr-4" />
                <div>
                    <h1 className="text-3xl font-bold">
                        <CountUp start={0} end={datas.length} duration={2.75} />
                    </h1>
                    <p className="text-gray-700">Total Users</p>
                </div>
            </div>

            <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg py-10 px-6 w-full md:w-[380px] flex items-center transition-transform transform hover:scale-105">
                <FaBuilding className="text-4xl text-green-500 mr-4" />
                <div>
                    <h1 className="text-3xl font-bold">
                        <CountUp start={0} end={rooms.length} duration={2.75} />
                    </h1>
                    <p className="text-gray-700">Available Apartments</p>
                </div>
            </div>

            <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg py-10 px-6 w-full md:w-[380px] flex items-center transition-transform transform hover:scale-105">
                <LuNewspaper className="text-4xl text-purple-500 mr-4" />
                <div>
                    <h1 className="text-3xl font-bold">
                        <CountUp start={0} end={agreements.length} duration={2.75} />
                    </h1>
                    <p className="text-gray-700">Total Applications Pending</p>
                </div>
            </div>

            <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg py-10 px-6 w-full md:w-[380px] flex items-center transition-transform transform hover:scale-105">
                <MdOutlineToken className="text-4xl text-red-500 mr-4" />
                <div>
                    <h1 className="text-3xl font-bold">
                        <CountUp start={0} end={coupon.length} duration={2.75} />
                    </h1>
                    <p className="text-gray-700">Total Coupons</p>
                </div>
            </div>
        </div>
    );
};

export default Box;