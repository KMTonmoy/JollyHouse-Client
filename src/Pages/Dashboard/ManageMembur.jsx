import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Swal from 'sweetalert2';

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = () => {
        fetch('https://jolly-home-server.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const filteredMembers = data.filter(member => member.role === 'member');
                setMembers(filteredMembers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
                setError('Failed to fetch members. Please try again later.');
                setLoading(false);
            });
    };

    const removeMember = (member) => {
        // console.log(member);
        fetch(`https://jolly-home-server.vercel.app/users/${member.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: 'user',
                floorNo: "none",
                blockName: "none",
                apartmentNo: "none",
                rent: "none",
                agreementAcceptDate: "",
            }),
        })

        fetch(`https://jolly-home-server.vercel.app/apartments/${member.ids}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 'free',
            }),
        })






            .then(res => res.json())
            .then(data => {

                Swal.fire(
                    {
                        title: "Success!",
                        text: "Member Has Been Removed",
                        icon: "success"
                    }
                )
                setMembers(members.filter(m => m._id !== member._id));
                fetchMembers()

            })

    };

    // Animation transitions for table rows
    const transitions = useTransition(members, {
        keys: member => member._id, // Use _id instead of id
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
                                    <animated.tr key={item._id} style={style}>
                                        <td className="p-[3px] text-xs md:text-xl md:p-4 border border-gray-300">{item.name}</td>
                                        <td className="p-[3px] md:p-4 border border-gray-300 text-xs md:text-xl md:w-full">{item.email}</td>
                                        <td className="p-[3px] md:p-4 border border-gray-300">
                                            <button
                                                className="px-3 md:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                onClick={() => removeMember(item)}
                                            >
                                                Remove
                                            </button>
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
