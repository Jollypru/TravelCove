import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';


const imageHostingKey = import.meta.env.VITE_Image_Hosting_Api_Key;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
const AddStory = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(imageHostingAPI, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data.data.display_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || images.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'All fields are required, including at least one image.',
            });
        }

        try {
            // Upload all images to ImgBB and get URLs
            const imageUrls = await Promise.all(
                Array.from(images).map((image) => uploadImageToImgBB(image))
            );

            // Create story data with uploaded image URLs
            const storyData = {
                title,
                description,
                userId: user?._id, // Replace with actual user ID if needed
                images: imageUrls,
            };

            // Save the story data to the backend
            const response = await axios.post(
                'https://assignment-12-server-tau-seven.vercel.app/stories',
                storyData
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Story added successfully!',
                });
                navigate('/dashboard/manage-stories');
            }
        } catch (error) {
            console.error('Error adding story:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to add story.',
            });
        }

        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('description', description);
        // formData.append('userId', user?._id);
        // Array.from(images).forEach((image) => formData.append('images', image));

        // try {
        //     const response = await axios.post('https://assignment-12-server-tau-seven.vercel.app/stories', formData, {
        //         headers: { 'Content-Type': 'multipart/form-data' },
        //     });

        //     if (response.status === 200) {
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Success',
        //             text: 'Story added successfully!',
        //         });
        //         navigate('/dashboard/manage-stories');
        //     }
        // } catch (error) {
        //     console.error('Error adding story:', error);
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: error.response?.data?.message || 'Failed to add story.',
        //     });
        // }
    };

    return (
        <div className="min-h-screen p-5 bg-base-200">
            <h2 className="text-3xl font-bold text-center mb-5">Add a Story</h2>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-5 shadow-md rounded-md">
                <div className="form-control mb-4">
                    <label className="label">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered"
                        placeholder="Enter story title"
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered"
                        placeholder="Write your story"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="form-control mb-4">
                    <label className="label">Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        // accept="image/*"
                        className="file-input file-input-bordered"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">Submit Story</button>
            </form>
        </div>
    );
};

export default AddStory;
