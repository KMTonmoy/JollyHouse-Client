import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || ''; // Check if user is defined
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar open/close

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
    <div className="relative md:flex ">
      {/* Toggle button for small screens */}
      <button
        className="absolute top-4 left-4 text-3xl p-2 rounded md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-30"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            className="fixed md:relative top-0 left-0 md:h-full h-[100vh] w-64 bg-gradient-to-b from-gray-800 to-gray-900 py-6 text-white text-center shadow-xl z-20"
            initial={{ x: window.innerWidth < 768 ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth < 768 ? -300 : 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >

            <button
              className="absolute top-4 right-4 text-3xl md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoMdClose />
            </button>
            {role && (
              <h1 className="text-2xl font-semibold my-4">{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
            )}
            <ul className="menu p-4 space-y-4">
              <li>
                <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/">Home</Link>
              </li>
              <li>
                <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard"> <spam className='capitalize'>{role}</spam> Home</Link>
              </li>

              {role === 'admin' && (
                <>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/manage-members">Manage Members</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/make-announcement">Make Announcement</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/agreement-requests">Agreement Requests</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/manage-coupons">Manage Coupons</Link>
                  </li>
                </>
              )}
              {role === 'member' && (
                <>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/make-payment">Make Payment</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/payment-history">Payment History</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/announcements">Announcements</Link>
                  </li>
                </>
              )}
              {role === 'user' && (
                <>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/my-profile">My Profile</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/announcements">Announcements</Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main content area */}
    
    </div>
  );
};

export default Sidebar;
