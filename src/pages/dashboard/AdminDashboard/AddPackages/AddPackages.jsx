import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const AddPackages = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [galleryImages, setGalleryImages] = useState([]);

    const handleGalleryImages = (event) => {
        const files = Array.from(event.target.files); 
        setGalleryImages((prevGalleryImages) => [...prevGalleryImages, ...files]); 
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('tourPlan', JSON.stringify(data.tourPlan.split('\n')));
        formData.append('tourType', data.tourType);

        if (data.coverImage[0]) {
            formData.append('coverImage', data.coverImage[0]);
        }

        galleryImages.forEach((image) => {
            formData.append('galleryImages', image);
        })

        const response = await axios.post('http://localhost:5000/packages', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.status === 200) {
            toast.success('Package added successfully!');
            reset();
            setGalleryImages([]);
        } else {
            toast.error('Failed to add package')
        }
    };

    return (
        <div className='min-h-screen p-10'>
            <h2 className='text-4xl font-bold mb-5 text-center'>Add Packages</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <div className='form-control mb-4'>
                        <label>Package Name</label>
                        <input type="text" {...register('title', { required: 'Package name is required' })} className='input input-bordered' placeholder='Enter package name' />
                        {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
                    </div>
                    <div className='form-control mb-4'>
                        <label>Package Description</label>
                        <textarea {...register('description', { required: 'Description is required' })}
                            className='textarea textarea-bordered' placeholder='Enter description' rows='4'></textarea>
                        {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
                    </div>
                    <div className='form-control mb-4'>
                        <label>Price</label>
                        <input type="number" {...register('price', { required: 'Price is required' })} className='input input-bordered' placeholder='Enter Price' />
                        {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Tour Plan</label>
                        <textarea
                            {...register('tourPlan', { required: 'Tour plan is required' })}
                            className="textarea textarea-bordered"
                            placeholder="Enter tour plan (one plan per line)"
                            rows="5"
                        ></textarea>
                        {errors.tourPlan && <p className="text-red-500 mt-1">{errors.tourPlan.message}</p>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Tour Type</label>
                        <input
                            type="text"
                            {...register('tourType', { required: 'Tour type is required' })}
                            className="input input-bordered"
                            placeholder="Enter tour type (e.g., Adventure, Relaxation)"
                        />
                        {errors.tourType && <p className="text-red-500 mt-1">{errors.tourType.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label>Cover Image:</label>
                        <input type="file" {...register('coverImage', { required: 'Cover image is required' })} className='ml-3' />
                        {errors.coverImage && <p className="text-red-500 mt-1">{errors.coverImage.message}</p>}
                    </div>
                    <div>
                        <label>Gallery Images:</label>
                        <input type="file" multiple  {...register('galleryImages', { required: 'Gallery images are required' })} onChange={handleGalleryImages} className='ml-3'  />
                        {errors.galleryImages && <p className="text-red-500 mt-1">{errors.galleryImages.message}</p>}
                    </div>
                    {galleryImages.length > 0 && (
                        <div className="mt-3">
                            <h4 className="font-semibold">Selected Gallery Images:</h4>
                            <ul className="list-disc list-inside">
                                {Array.from(galleryImages).map((image, index) => (
                                    <li key={index}>{image.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className='text-center'>
                        <button type="submit" className="py-1 px-5 mt-5 bg-sky-700 rounded-sm text-white font-semibold">
                            Add Package
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddPackages;