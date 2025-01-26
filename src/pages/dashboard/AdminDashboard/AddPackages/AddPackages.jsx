import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_Image_Hosting_Api_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddPackages = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [galleryImages, setGalleryImages] = useState([]);

    const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await axios.post(image_hosting_api, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data.data.display_url;
    };


    const onSubmit = async (data) => {
        console.log(data);

        try {
            const coverImage = await uploadImageToImgBB(data.coverImage[0]);
            if (!coverImage) {
              toast.error("Failed to upload cover image!");
              return;
            }

            const galleryImageUrls = await Promise.all(
                Array.from(galleryImages).map(image => uploadImageToImgBB(image))
              );
      
      
        
            const packageData = {
              title: data.title,
              description: data.description,
              price: parseFloat(data.price),
              tourPlan: data.tourPlan.split("\n"),
              tourType: data.tourType,
              coverImage,
              galleryImages: galleryImageUrls,
            };
      
            const response = await axiosPublic.post("/packages", packageData);
            if (response.status === 200) {
              toast.success("Package added successfully!");
              reset();
              setGalleryImages([]);
            } else {
              toast.error("Failed to add package!");
            }
          } catch (error) {
            console.error("Error adding package:", error);
            toast.error("An error occurred while adding the package.");
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
                        <input type="file" multiple  {...register('galleryImages', { required: 'Gallery images are required' })} onChange={(e) => setGalleryImages(e.target.files)} className='ml-3'  />
                        {errors.galleryImages && <p className="text-red-500 mt-1">{errors.galleryImages.message}</p>}
                    </div>
                    
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