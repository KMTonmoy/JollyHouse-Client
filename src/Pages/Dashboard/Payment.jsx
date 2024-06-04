import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Payment = () => {
    const [couponCode, setCouponCode] = useState('');
    const [memberInfo, setMemberInfo] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMemberInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${user?.email}`);
                const userData = await response.json();
                setMemberInfo(userData);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        if (user) {
            fetchMemberInfo();
        }
    }, [user]);


    const handelPayment = (e) => {
        e.preventDefault();
        const month = document.getElementById('month').value;
        console.log(month);
    }


    return (
        <div className="container mx-auto flex justify-center items-center">
            <div>
                <h2 className='font-bold text-center text-3xl mb-5'>Payment Information</h2>
                <form className='bg-white w-full md:w-[800px] rounded-lg shadow-lg p-6  '>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className=''>
                            <label className='block mb-2'>Email:</label>
                            <input className='outline-none p-1 w-full border-2 border-blue-100' type="text" value={memberInfo.email || ''} readOnly />
                        </div>
                        <div className=''>
                            <label className='block mb-2'>Floor:</label>
                            <input className='outline-none p-1 w-full border-2 border-blue-100' type="text" value={memberInfo.floorNo || ''} readOnly />
                        </div>
                        <div className=''>
                            <label className='block mb-2'>Block Name:</label>
                            <input className='outline-none p-1 w-full border-2 border-blue-100' type="text" value={memberInfo.blockName || ''} readOnly />
                        </div>
                        <div className=''>
                            <label className='block mb-2'>Apartment No/Room No:</label>
                            <input className='outline-none p-1 w-full border-2 border-blue-100' type="text" value={memberInfo.apartmentNo || ''} readOnly />
                        </div>


                        <div className=''>
                            <label className='block mb-2'>Rent:</label>
                            <input className='outline-none p-1 w-full border-2 border-blue-100' type="text" value={memberInfo.rent || ''} readOnly />
                        </div>

                        <div className=''>
                            <label className='block mb-2'>Agreement Accept Date:</label>
                            <input className='outline-none p-1 w-full border-2 border-blue-100' type="text" value={memberInfo.agreementAcceptDate || ''} readOnly />
                        </div>


                    </div>
                    <div className='my-5'>
                        <label className='block mb-2'>Select Month: </label>
                        <select className='w-full border-2 border-blue-100' name="month" id="month">
                            <option value="January" selected>January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                    <div className=''>
                        <label className='block mb-2'>Coupon Code:</label>
                        <div className='flex'>
                            <input className='outline-none p-1 w-full border-2 border-blue-100' type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                            <button type="button" className='bg-green-500 font-bold text-white  rounded-sm w-[150px]'  >Apply Coupon</button>
                        </div>

                    </div>
                    <button type="submit" className='bg-green-500 mt-5 p-3 font-bold text-white  rounded-sm w-full' onClick={handelPayment}>Process Payment</button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
