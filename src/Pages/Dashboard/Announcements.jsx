import React, { useEffect, useState } from 'react';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:8000/announcement');
                if (response.ok) {
                    const data = await response.json();
                    setAnnouncements(data);
                } else {
                    console.error('Failed to fetch announcements:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleAnnouncementClick = async (announcement) => {
        setSelectedAnnouncement(announcement);
        const modal = document.getElementById('announcement_modal');
        if (modal) {
            modal.showModal();
        }

        try {
            await fetch(`http://localhost:8000/announcements/${announcement._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'old' }),
            });

            setAnnouncements((prevAnnouncements) =>
                prevAnnouncements.map((a) =>
                    a.id === announcement.id ? { ...a, status: 'old' } : a
                )
            );
        } catch (error) {
            console.error('Error updating announcement status:', error);
        }
    };

    const handleCloseModal = () => {
        const modal = document.getElementById('announcement_modal');
        if (modal) {
            modal.close();
        }
        setSelectedAnnouncement(null);
    };

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
