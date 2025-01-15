import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import { FaClipboardList, FaHome, FaUserEdit } from 'react-icons/fa';
import { LuTickets } from 'react-icons/lu';
import { FaPencil } from 'react-icons/fa6';
import { AiOutlineUserAdd } from 'react-icons/ai';


const DashboardLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const links = <>
        <li><NavLink to='/dashboard/manageProfile' className="flex items-center gap-2"><FaUserEdit /> Manage Profile</NavLink></li>
        <li><NavLink to='/dashboard/my-bookings' className="flex items-center gap-2"><LuTickets /> My Bookings</NavLink></li>
        <li><NavLink to='/dashboard/addStories' className="flex items-center gap-2"><FaPencil /> Add Stories</NavLink></li>
        <li><NavLink to='/dashboard/manageStories' className="flex items-center gap-2"><FaClipboardList /> Manage Stories</NavLink></li>
        <li><NavLink to='/dashboard/tourGuideApplication' className="flex items-center gap-2"><AiOutlineUserAdd /> Join as Tour Guide</NavLink></li>
    </>


    return (
        <div className='md:flex'>
            {/* sidebar for larger device */}
            <div className={`w-64 min-h-screen p-2 md:p-5 bg-sky-800 text-white hidden md:block`}>
                <ul className="space-y-2 mb-10">
                    {links}
                </ul>
                <hr />
                <ul className='mt-10'>
                    <li><NavLink to='/' className="flex items-center gap-2"><FaHome></FaHome> Home</NavLink></li>
                </ul>
            </div>

            {/* Sidebar content for small screens */}
            <div className={`fixed inset-y-0 left-0 w-52 bg-sky-800 text-white p-5 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    onClick={toggleSidebar}
                    className="text-white text-2xl absolute top-4 right-4"
                >
                    &times; {/* Close icon */}
                </button>
                <ul className="space-y-2 mt-12">
                   {links}
                </ul>
            </div>

            {/* Sidebar toggle (Hamburger) icon for small screens */}
            <div className="md:hidden p-4 sticky top-0" onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            

            <div className='flex flex-col w-full'>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default DashboardLayout;