import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (

    <div className="bg-gray-800 h-full w-64 fixed top-0 left-0 overflow-y-auto">
      <div className="px-4 py-6">
        <h2 className="text-white text-2xl font-semibold">Dashboard</h2>
      </div>
      <nav className="mt-6">
        <Link to="/dashboard" className="block py-2 px-4 text-white hover:bg-gray-700">Home</Link>
        <Link to="/dashboard/profile" className="block py-2 px-4 text-white hover:bg-gray-700">Profile</Link>
        <Link to="/dashboard/settings" className="block py-2 px-4 text-white hover:bg-gray-700">Settings</Link>
        <Link to="/dashboard/logout" className="block py-2 px-4 text-white hover:bg-gray-700">Logout</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
