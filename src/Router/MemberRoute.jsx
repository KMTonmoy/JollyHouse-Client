import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

const MemberRoute = ({ children }) => {
    const { user, logOut } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user?.email) {
                    const response = await fetch(`http://localhost:8000/users/${user.email}`);
                    const userData = await response.json();
                    setUserData(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    const role = userData.role;

    useEffect(() => {
        if (role === 'member') {
            console.log('Member Welcome');
        } else if (role) {
            console.log('Not a member, logging out...');
            logOut().then(() => {
                navigate('/login', { state: { from: location }, replace: true });
            });
        }
    }, [role, logOut, navigate, location]);

    return <>{role === 'member' ? children : null}</>;
};

export default MemberRoute;
