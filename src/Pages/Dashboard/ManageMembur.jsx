import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useTransition, animated } from 'react-spring';

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = () => {
        fetch(`http://localhost:8000/users`)
            .then(res => res.json())
            .then(data => {
                setMembers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
                setError('Failed to fetch members. Please try again later.');
                setLoading(false);
            });
    };

    const removeMember = (memberId) => {
        // Implement logic to remove member
    };

    const { user } = useContext(AuthContext);

    // Animation transitions for table rows
    const transitions = useTransition(members, {
        keys: member => member.id,
        from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Members</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {members.length === 0 && !loading && !error && <p>No members found.</p>}
            {members.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr>
                                <th className="p-[3px] md:p-4 text-left bg-gray-200 border border-gray-300">User Name</th>
                                <th className="p-[3px] md:p-4 text-left bg-gray-200 border border-gray-300">User Email</th>
                                <th className="p-[3px] md:p-4 text-left bg-gray-200 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transitions((style, item) =>
                                item ? (
                                    <animated.tr key={item.id} style={style}>
                                        <td className="p-[3px] text-xs md:text-xl md:p-4 border border-gray-300">{item.name}</td>
                                        <td className="p-[3px] md:p-4 border border-gray-300 text-xs md:text-xl md:w-full">{item.email}</td>
                                        <td className="p-[3px] md:p-4 border border-gray-300">
                                            <button className="px-3 md:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => removeMember(item.id)}>Remove</button>
                                        </td>
                                    </animated.tr>
                                ) : null
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMembers;
