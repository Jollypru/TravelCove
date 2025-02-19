import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MdMailOutline, MdPhone, MdLocationOn } from 'react-icons/md';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageProfile = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: '',
        photo: '',
        phone: '',
        address: '',
    });
    const [adminStats, setAdminStats] = useState(null);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // ✅ Fetch user data and set form values
    useEffect(() => {
        if (authUser?.email) {
            axiosSecure.get(`/users?email=${authUser.email}`)
                .then(res => {
                    setUser(res.data);
                    setEditedUser({
                        name: res.data.name || '',
                        photo: res.data.photo || '',
                        phone: res.data.phone || '',
                        address: res.data.address || '',
                    });

                    if (res.data.role === 'admin') {
                        axiosSecure.get('/admin/stats')
                            .then(res => setAdminStats(res.data))
                            .catch(error => console.error('Failed to fetch admin stats:', error));
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    navigate('/login');
                });
        }
    }, [authUser?.email, navigate]);

    // ✅ Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    // ✅ Update user profile
    const handleUpdate = () => {
        console.log("🔹 Sending update request with:", editedUser); // Debugging

        axiosSecure.patch(`/users/profile/${user._id}`, editedUser, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access-token')}` } // ✅ Include token
        })
        .then((res) => {
            console.log('✅ Profile updated successfully:', res.data);
            setUser(prev => ({ ...prev, ...editedUser })); // ✅ Update state to reflect new changes
            setIsEditModalOpen(false);
        })
        .catch(error => {
            console.error("❌ Error updating profile:", error.response ? error.response.data : error);
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-5">
            <div className="w-full p-5">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-3">Welcome, {user.name || 'User'}!</h1>
                    <p className="text-gray-600">Manage your profile and preferences here.</p>
                </div>
                <div className='flex items-center gap-4'>
                    <img src={user.photo || 'https://via.placeholder.com/100'} alt="User Profile" className="w-24 h-24 rounded-full mb-3" />
                    <div>
                        <h2>{user.name || 'N/A'}</h2>
                        <p>{user.role || 'Tourist'}</p>
                    </div>
                </div>
                <div className="bg-white">
                    <p className="text-lg font-semibold">{user.name || 'N/A'}</p>
                    <p className="text-gray-500 flex items-center gap-2"><MdMailOutline /> {user.email || 'N/A'}</p>
                    <p className="text-gray-500 flex items-center gap-2"><MdPhone /> {user.phone || 'N/A'}</p>
                    <p className="text-gray-500 flex items-center gap-2"><MdLocationOn /> {user.address || 'N/A'}</p>
                    <p className="text-gray-500 mt-2">Role: {user.role || 'Tourist'}</p>
                </div>

                <div className="flex items-center justify-center gap-4 mt-5">
                    <button onClick={() => setIsEditModalOpen(true)} className="py-2 px-4 rounded-md bg-blue-800 hover:bg-blue-900 text-white">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Profile</h3>
                        <div className="form-control mt-3">
                            <label className="label">Name</label>
                            <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} className="input input-bordered" />
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">Profile Photo URL</label>
                            <input type="text" name="photo" value={editedUser.photo} onChange={handleInputChange} className="input input-bordered" />
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">Phone Number</label>
                            <input type="text" name="phone" value={editedUser.phone} onChange={handleInputChange} className="input input-bordered" />
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">Address</label>
                            <input type="text" name="address" value={editedUser.address} onChange={handleInputChange} className="input input-bordered" />
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <button onClick={() => setIsEditModalOpen(false)} className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
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
