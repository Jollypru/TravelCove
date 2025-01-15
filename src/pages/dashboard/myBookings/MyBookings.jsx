import React from 'react';

const MyBookings = () => {
    return (
        <div className='p-5'>
            <h3 className='text-4xl text-center text-sky-700 font-semibold my-5'>My Bookings</h3>
            <div className="overflow-x-auto min-h-screen border shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-sky-100'>
                            <th></th>
                            <th>Package</th>
                            <th>Tour Price</th>
                            <th>Tour Date</th>
                            <th>Tour Guide</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Blue</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookings;
