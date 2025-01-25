import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MdMailOutline } from 'react-icons/md';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageProfile = () => {
    const {user: authUser} = useAuth();
    const [user, setUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: '',
        photo: '',
    });
    const [adminStats, setAdminStats] = useState(null);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if(authUser?.email){
            axios.get(`http://localhost:5000/users?email=${authUser.email}`)
            .then(res => {
                setUser(res.data);
                setEditedUser({
                    displayName: res.data.name || '',
                    photoURL: res.data.photo || '',
                });

                if (res.data.role === 'admin') {
                    axios.get('http://localhost:5000/admin/stats')
                        .then((res) => {
                            setAdminStats(res.data);
                        })
                        .catch((error) => {
                            console.error('Failed to fetch admin stats:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching user data from backend:', error);
                navigate('/login');
            });
        }
            
    }, [authUser?.email, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        if (editedUser.name && editedUser.photo) {
            axios.patch(`http://localhost:5000/users/profile/${user._id}`,
                {
                    name: editedUser.name,
                    photo: editedUser.photo,
                },
            )
                .then(() => {
                    console.log('Profile updated successfully in backend');
                    setUser((prev) => ({
                        ...prev,
                        name: editedUser.name,
                        photo: editedUser.photo,
                    }));
                    setIsEditModalOpen(false);
                })
                .catch((error) => {
                    console.error('Error updating profile in backend:', error);
                });

        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-5">
            <div className="w-full p-5">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-3">Welcome, {user.displayName || 'User'}!</h1>
                    <p className="text-gray-600">Manage your profile and preferences here.</p>
                </div>

                <div className="flex flex-col items-center mt-5">
                    <img
                        src={user.photo || 'https://via.placeholder.com/100'}
                        alt="User Profile"
                        className="w-24 h-24 rounded-full mb-3"
                    />
                    <p className="text-lg font-semibold">{user.name || 'N/A'}</p>
                    <p className="text-gray-500 flex items-center gap-2"><MdMailOutline /> {user.email || 'N/A'}</p>
                    <p className="text-gray-500 mt-2">Role: {user.role || 'Tourist'}</p>
                </div>

                {user.role === 'admin' && adminStats && (
                    <div className="mt-10 bg-white p-5 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-5">Admin Statistics</h2>
                        <ul className="list-disc list-inside">
                            <li>Total Payment: <strong>{adminStats.totalPayment.toFixed(2)} BDT</strong></li>
                            <li>Total Tour Guides: <strong>{adminStats.totalTourGuides}</strong></li>
                            <li>Total Packages: <strong>{adminStats.totalPackages}</strong></li>
                            <li>Total Clients: <strong>{adminStats.totalClients}</strong></li>
                            <li>Total Stories: <strong>{adminStats.totalStories}</strong></li>
                        </ul>
                    </div>
                )}

                <div className="flex items-center justify-center gap-4 mt-5">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="py-2 px-4 rounded-md bg-blue-800 hover:bg-blue-900 text-white"
                    >
                        Edit Profile
                    </button>
                    {user.role === 'tourist' && (
                        <button
                            onClick={() => navigate('/join-tour-guide')}
                            className="py-2 px-4 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                            Apply for Tour Guide
                        </button>
                    )}
                </div>
            </div>

            {isEditModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Profile</h3>
                        <div className="form-control mt-3">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="displayName"
                                value={editedUser.displayName}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">Profile Photo URL</label>
                            <input
                                type="text"
                                name="photoURL"
                                value={editedUser.photoURL}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                            >
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="btn btn-sm bg-green-600 hover:bg-green-500 text-white">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProfile;