import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {TbCurrencyTaka } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import BookingForm from '../BookingForm/BookingForm';

const PackageDetails = () => {
    const { id } = useParams();
    const { data: pkg, isLoading: isPackageLoading } = useQuery({
        queryKey: ['packageDetails', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/packages/${id}`)
            return res.data;
        }
    })
    if (isPackageLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }
    return (
        <div className='min-h-screen p-4 pt-20 bg-base-200'>
            <div className='bg-base-100 p-5 grid grid-cols-8 gap-5'>
                {/* gallery section */}
                <div className='col-span-5 grid grid-rows-2 gap-3'>
                    <img className='row-span-1 h-96 w-full rounded-md' src={pkg.image} alt="" />
                    <div className='row-span-1 grid grid-cols-4 gap-2'>
                        {
                            pkg.galleryImages?.map((img, index) => (
                                <div>
                                    <img className='rounded-md' src={img} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* about tour section */}
                <div className='col-span-3'>
                    <div>
                        <h2 className='text-4xl font-bold mb-3'>{pkg.title}</h2>
                        <p className='text-gray-500 mb-4'>{pkg.description}</p>
                        <span className='text-xl font-bold'>Price</span>
                        <hr className='w-1/3'/>
                        <p className='text-lg flex items-center'><TbCurrencyTaka />{pkg.price}</p>
                    </div>
                    <div className='mt-5'>
                        <h2 className='text-2xl font-bold mb-4'>Tour plan</h2>
                        <hr  className='w-1/2'/>
                        {
                            pkg.tourPlan?.map((plan, index) => (
                                <div key={index} className='mt-3'>
                                    <h4 className='font-semibold'>Day {index + 1} :</h4>
                                    <p className='text-gray-700'>{plan}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <BookingForm></BookingForm>
        </div>
    );
};

export default PackageDetails;