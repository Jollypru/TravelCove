import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const links =<>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink>Community</NavLink></li>
        <li><NavLink>About Us</NavLink></li>
        <li><NavLink>Trips</NavLink></li>     
    </>
    return (
        <div className="navbar max-w-screen-2xl mx-auto px-3  md:px-5 lg:px-10 fixed top-0 z-50 text-white   ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className=" dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                       {links}
                    </ul>
                </div>
                <a className="text-xl">TravelCove</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-8 px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex gap-3">
                <button className='py-1 px-4 border rounded-md hover:bg-purple-500 hover:text-white'><Link to='/login'>Login</Link></button>
                <button className='bg-purple-500 py-1 px-4 text-white rounded-md'><Link to='/register'>Register</Link></button>
            </div>
        </div>
    );
};

export default Navbar;