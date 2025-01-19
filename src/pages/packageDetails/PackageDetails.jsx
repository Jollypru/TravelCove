import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import BookingForm from '../BookingForm/BookingForm';
import { FaClipboardUser } from 'react-icons/fa6';

const PackageDetails = () => {
    const { id } = useParams();
    const { data: pkg, isLoading: isPackageLoading } = useQuery({
        queryKey: ['packageDetails', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/packages/${id}`)
            return res.data;
        }
    })

    const { data: guides, isLoading: isGuideLoading } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/guides');
            return res.data;
        }
    })
    if (isPackageLoading || isGuideLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }
    return (
        <div className='min-h-screen p-4 pt-20 bg-base-200'>
            <div className='bg-base-100 p-5 grid grid-cols-8 gap-5'>
                {/* gallery section */}
                <div className='col-span-5 grid grid-rows-3 gap-3'>
                    <img className='row-span-2 h-96 w-full rounded-md' src={pkg.image} alt="" />
                    <div className='row-span-1 grid grid-cols-4 gap-2'>
                        {
                            pkg.galleryImages?.map((img, index) => (
                                <div key={index}>
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
                        <hr className='w-1/3' />
                        <p className='text-lg flex items-center'><TbCurrencyTaka />{pkg.price}</p>
                    </div>
                    <div className='mt-5'>
                        <h2 className='text-2xl font-bold mb-4'>Tour plan</h2>
                        <hr className='w-1/2' />
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
            {/* tour guides section */}
            <div className="bg-base-100 p-5 mt-5 rounded-md">
                <h2 className="text-3xl font-bold mb-5">Meet Our Guides</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {guides.map((guide) => (
                        <div
                            key={guide._id}
                            className="p-4 bg-sky-50 shadow-md rounded-md"
                        >
                            <img className="h-36 w-full object-cover rounded-md" src={guide.photo} alt={guide.name} />
                            <h3 className="mt-3 text-xl font-bold">{guide.name}</h3>
                            <p className="text-gray-600 flex items-center gap-1"><FaClipboardUser />{guide.role}</p>
                            <button className="btn btn-link text-blue-500">
                                <Link to={`/guideProfile/${guide._id}`}>View Profile</Link>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <BookingForm packageDetails={pkg} guides={guides}></BookingForm>
        </div>
    );
};

export default PackageDetails;