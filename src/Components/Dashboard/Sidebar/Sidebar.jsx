import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || '';
  const [data, setData] = useState({});
  const [count, setCount] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8000/users/${email}`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [email]);

  useEffect(() => {
    fetch(`http://localhost:8000/agreement`)
      .then(res => res.json())
      .then(data => setCount(data))
      .catch(error => console.error('Error fetching agreement data:', error));
  }, []);



  const role = data.role;

  return (
    <div className="relative md:flex">
      {/* Toggle button for small screens */}
      {!isOpen && (
        <button
          className="absolute top-4 left-4 text-3xl p-2 rounded md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-30"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      )}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            className="fixed md:relative top-0 left-0 md:h-full h-[100vh] w-64 bg-gradient-to-b from-purple-900 to-purple-600 py-6 text-white text-center shadow-xl z-20"
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
                <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/">Home</Link>
              </li>
              <li>
                <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard">
                  <span className='capitalize'>{role}</span> Home
                </Link>
              </li>
              {role === 'admin' && (
                <>

                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/manage-members">Manage Members</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/make-announcement">Make Announcement</Link>
                  </li>
                  <li>
                    <Link className="flex items-center justify-between py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/agreement-requests">
                      <span>Agreement Requests</span>
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">{count.length}</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/manage-coupons">Manage Coupons</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/my-profile">My Profile</Link>
                  </li>
                </>
              )}
              {role === 'member' && (
                <>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/my-profile">My Profile</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/make-payment">Make Payment</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/payment-history">Payment History</Link>
                  </li>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700  hover:bg-purple-800 transition-colors" to="/dashboard/announcements">
                      Announcements</Link>
                  </li>
                </>
              )}
              {role === 'user' && (
                <>
                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/my-profile">My Profile</Link>
                  </li>

                  <li>
                    <Link className="block py-2 px-4 rounded text-white bg-purple-700 hover:bg-purple-800 transition-colors" to="/dashboard/announcements">Announcements</Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
