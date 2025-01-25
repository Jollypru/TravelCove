import React from 'react';
import { MdPayment } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash } from 'react-icons/fa';

const MyBookings = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/bookings?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    })

    if (isLoading) {
        return <span className='loading loading-spinner loading-lg'></span>
    }
    return (
        <div className='min-h-screen p-5'>
            <h3 className='text-4xl text-center text-sky-700 font-semibold my-5'>My Bookings</h3>
            <div className="overflow-x-auto min-h-screen border shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-sky-100'>
                            <th></th>
                            <th>Package Name</th>
                            <th>Tour Guide</th>
                            <th>Tour Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, index) => (
                                <tr key={booking._id} className='hover:bg-gray-100'>
                                    <th>{index + 1}</th>
                                    <td>{booking.packageName}</td>
                                    <td>{booking.guideName}</td>
                                    <td>{booking.tourDate}</td>
                                    <td>{booking.price} Taka</td>
                                    <td>{booking.status}</td>
                                    <td>
                                        {booking.status === 'pending' && (
                                            <div className="flex gap-3">
                                                <Link to='/dashboard/payment'>
                                                    <button className='text-xl text-center text-yellow-600'><MdPayment></MdPayment></button>
                                                </Link>
                                                <button className='text-red-500'><FaTrash></FaTrash></button>
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;
