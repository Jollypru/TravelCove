import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllTrips = () => {
    const axiosPublic = useAxiosPublic();

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/packages');
            console.log(res.data);
            return res.data;
        }
    })
    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    return (
        <div className='bg-base-200 min-h-screen max-w-screen-xl mx-auto pt-20 pb-10 px-3 md:px-10'>
            <h2 className='text-4xl text-center font-bold'>All Trips</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
                {
                    packages.map((pkg) => (
                        <div key={pkg._id} className='bg-base-100 p-3 flex flex-col md:flex-row justify-between gap-3 rounded-sm shadow-xl'>
                            <img className='w-2/5' src={pkg.coverImage} alt="" />
                            <div>
                                <h3 className='text-2xl my-4'>{pkg.title}</h3>
                                <p className='text-gray-600'>{pkg.description}</p>
                                <div className='flex items-center justify-between mt-3'>
                                    <p className='flex items-center gap-1'><TbCurrencyTaka />{pkg.price}</p>
                                    <NavLink to={`/packageDetails/${pkg._id}`}><button className='border border-sky-800 rounded-sm px-2 text-sky-600 mr-5'>Details</button></NavLink>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllTrips;