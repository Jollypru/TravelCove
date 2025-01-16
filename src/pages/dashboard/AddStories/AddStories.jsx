import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStories = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = e => {
        const files = Array.from(e.target.files);
        setImages(files);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const storyData = {
            title, description, images
        }

        console.log('story',storyData);

        axios.post('http://localhost:5000/stories', storyData)
        .then(res => {
            console.log(res.data);
        })

    }

    return (
        <div>
            <h2>Add story</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='form-control'>Title</label>
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter story title' className='input input-bordered' required />
                </div>
                <div>
                    <label className='form-control'>Description</label>
                    <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder='Enter story title' className='input input-bordered' required />
                </div>
                <div>
                    <label className='form-control'>
                        <input type="file" multiple onChange={handleImageChange} />
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddStories;