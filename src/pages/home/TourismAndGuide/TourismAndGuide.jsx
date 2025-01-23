import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import 'react-tabs/style/react-tabs.css';
import { TbCurrencyTaka } from 'react-icons/tb';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const TourismAndGuide = () => {
    const [randomPackages, setRandomPackages] = useState([]);
    const [randomGuides, setRandomGuides] = useState([]);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/packages/random')
            .then(res => {
                setRandomPackages(res.data);
            })
            .catch(error => {
                console.log('error fetching random packages', error);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/guides/random')
            .then((res) => {
                setRandomGuides(res.data);
            })
            .catch((error) => {
                console.error('Error fetching random guides:', error);
            });
    }, []);

    return (
        <div className='text-center my-10'>
            <h2 className='text-4xl font-semibold mb-6'>Tourism and Travel Guides</h2>
            <Tabs>
                <TabList>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-8'>
                        {
                            randomPackages.map(pkg => (
                                <div key={pkg._id} className='bg-base-200 rounded-md p-5'>
                                    <img className='rounded-md h-[200px] w-full' src={`http://localhost:5000/${pkg.coverImage}`} alt="" />
                                    <div className='mt-4'>
                                        <h2 className='text-2xl font-semibold mb-2 text-start'>{pkg.title}

                                        </h2>


                                        <div className='flex justify-between mt-5'>
                                            <p className='border px-2 rounded-sm bg-sky-200'>{pkg.tourType}</p>
                                            <p className='flex items-center text-sky-800 font-medium text-xl'><TbCurrencyTaka></TbCurrencyTaka> {pkg.price}</p>
                                            <button onClick={() => navigate(`/packageDetails/${pkg._id}`)}><FaArrowUpRightFromSquare /></button>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 rounded-md px-3 md:px-8'>
                        {randomGuides.map((guide) => (
                            <div key={guide._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img
                                    src={guide.photo}
                                    alt={guide.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{guide.name}</h3>
                                    <p className="text-gray-600 mb-2">Email: {guide.email}</p>
                                    <button
                                        onClick={() => navigate(`/guideProfile/${guide._id}`)}
                                        className="mt-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismAndGuide;