import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchAnnouncements = async () => {
    const response = await fetch('http://localhost:8000/announcement');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.reverse();
};

const updateAnnouncementStatus = async (announcement) => {
    const response = await fetch(`http://localhost:8000/announcements/${announcement._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'old' }),
    });
    if (!response.ok) {
        throw new Error('Failed to update announcement status');
    }
};

const Announcements = () => {
    const queryClient = useQueryClient();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const { data: announcements = [], error, isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: fetchAnnouncements,
    });

    const mutation = useMutation({
        mutationFn: updateAnnouncementStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(['announcements']);
        },
    });

    const handleAnnouncementClick = (announcement) => {
        setSelectedAnnouncement(announcement);
        const modal = document.getElementById('announcement_modal');
        if (modal) {
            modal.showModal();
        }
        mutation.mutate(announcement);
    };

    const handleCloseModal = () => {
        const modal = document.getElementById('announcement_modal');
        if (modal) {
            modal.close();
        }
        setSelectedAnnouncement(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-8 w-full bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Announcements</h1>
            <h1 className="text-xl mb-4">Click To See Full Announcement Details</h1>
            <ul className="space-y-4">
                {announcements.map((announcement) => (
                    <li
                        key={announcement.id}
                        className={`p-6 md:w-[800px] bg-white rounded-lg shadow-md cursor-pointer ${announcement.status === 'old' ? 'bg-gray-300' : ''}`}
                        onClick={() => handleAnnouncementClick(announcement)}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800">{announcement.title}</h2>
                        <p className="text-gray-600 mt-2">{announcement.description}</p>
                    </li>
                ))}
            </ul>
            <dialog id="announcement_modal" className="modal">
                <div className="modal-box">
                    {selectedAnnouncement && (
                        <>
                            <h3 className="font-bold text-lg">{selectedAnnouncement.title}</h3>
                            <p className="py-4">{selectedAnnouncement.description}</p>
                        </>
                    )}
                    <div className="modal-action">
                        <button className="btn" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Announcements;
