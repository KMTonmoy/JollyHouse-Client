import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Box from '../../Components/Dashboard/AdminInfoBox/Box';
import RoleInfo from '../../Components/Dashboard/RoleInfo/RoleInfo';


const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email || '';
    const [data, setData] = useState({});

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:8000/users/${email}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [email]);

    const role = data.role;

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-semibold mb-2">
                    Hi, Welcome {user?.displayName ? user.displayName : 'Back'}
                </h2>
                {role === 'admin' && (
                    <h1 className="text-2xl font-medium text-gray-700 mt-4">This Is Admin Home</h1>
                )}
            </div>
            {role === 'admin' && (
                <div className="mt-8">
                    <Box />
                    <div>
                        <div className='mt-20'>

                            <RoleInfo></RoleInfo>

                        </div>
                    </div>
                </div>
            )}
            {role === 'member' && (
                <div className="mt-8">
                    <Box />
                    <div>
                        <div className='mt-20'>

                            <RoleInfo></RoleInfo>


                        </div>
                    </div>
                </div>
            )}
            {role === 'user' && (
                <div className="mt-8">
                    <Box />
                    <div>
                        <div className='mt-20'>

                            <RoleInfo></RoleInfo>


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHome;
