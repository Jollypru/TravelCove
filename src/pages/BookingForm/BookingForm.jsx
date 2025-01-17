import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

const BookingForm = () => {
    const {user} = useAuth();
    const { id } = useParams();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState('');

    const { data: pkg, isLoading: isPackageLoading } = useQuery({
        queryKey: ['packageDetails', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/packages/${id}`)
            return res.data;
        }
    })
    const { data: guides, isLoading: isGuideLoading } = useQuery({
        queryKey:['guides'], 
        queryFn: async () => {
        const res = await axios.get('http://localhost:5000/guides');
        return res.data;
        }
    });

    if (isPackageLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2>Book This {pkg.title} Package</h2>
            <form>
                <div>
                    <label>Tourist Name</label>
                    <input type="text" value={user.displayName || ''} className='input input-bordered' readOnly />
                </div>
                <div>
                    <label>Tourist Email</label>
                    <input type="email" value={user?.email || ''} className='input input-bordered' readOnly />
                </div>
                <div>
                    <label>Tour Date</label>
                   <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText='Select a date'
                    className='input input-bordered'
                   ></DatePicker>
                </div>
                <div>
                    <label>Tour Guide</label>
                    <select value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)} className='select select-bordered'>
                        <option value="" disabled>Select a guide</option>
                        {
                            guides.map(guide => (
                                <option key={guide._id}>{guide.name}</option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;