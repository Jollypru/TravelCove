import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const { data: applications , isLoading, error} = useQuery({
        queryKey: ['guideApplication'],
        queryFn: async () => {
            const res = await axiosSecure.get('/guideApplications');
            return res.data;
        }
    })
    if(isLoading){
        return <span className='loading'>loading...</span>
    }
    if(error){
        return <p>Error: {error.message}</p>
    }
    return (
        <div className='min-h-screen p-5'>
            <h2 className='text-4xl font-semibold'>Manage All Candidates</h2>
            <div className="overflow-x-auto border rounded-md mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-sky-100'>
                            <th className='border-r'></th>
                            <th className='border-r'>Name</th>
                            <th className='border-r'>Email</th>
                            <th className='border-r'>Application Title</th>
                            <th className='border-r'>Reason</th>
                            <th className='border-r'>CV Link</th>
                            <th className='border-r'>Role</th>
                            <th className='border-r'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) => (
                                <tr key={application._id}>
                                    <th className='border-r'>{index + 1}</th>
                                    <td className='border-r'>{application.name}</td>
                                    <td className='border-r'>{application.email}</td>
                                    <td className='border-r'>{application.title}</td>
                                    <td className='border-r'>{application.reason}</td>
                                    <td className='border-r'>{application.cvLink}</td>
                                    <td className='border-r'>{application.role}</td>
                                    <td className='border-r flex flex-col items-center gap-1'>
                                        <button className='border py-1 px-3 text-green-500 hover:bg-green-100'>Accept</button>
                                        <button className='border py-1 px-3 text-red-500 hover:bg-red-200'>Reject</button>
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

export default ManageCandidates;