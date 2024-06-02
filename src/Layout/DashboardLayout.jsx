import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'
const DashboardLayout = () => {
  return (
    <div className='min-h-screen flex'>

      <Sidebar />

      <div className='py-5 flex justify-center mx-auto'>
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;