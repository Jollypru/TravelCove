import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GuideProfile = () => {
    const { id } = useParams();

    const { data: guide, isLoading: isGuideLoading, error: guideError } = useQuery({
        queryKey:['guide', id], 
        queryFn:async () => {
        const res = await axios.get(`http://localhost:5000/guides/${id}`);
        return res.data;
        }
    });

    const { data: stories, isLoading: isStoriesLoading, error: storiesError } = useQuery({
        queryKey:['stories', id], 
        queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/stories?guideId=${id}`);
        return res.data;
        }
    });

    if (isGuideLoading || isStoriesLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (guideError || storiesError) {
        return <p>Error loading guide or stories data.</p>;
    }

    return (
        <div className="min-h-screen bg-base-200 p-5">
            <div className="bg-white shadow-md rounded-lg p-5 mb-10 max-w-3xl mx-auto">
                <div className="flex items-center gap-5">
                    <img
                        src={guide.profilePicture || 'https://via.placeholder.com/150'}
                        alt={guide.name}
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{guide.name}</h2>
                        <p className="text-gray-600">{guide.experience} years of experience</p>
                        <p className="text-gray-600">Specialized in: {guide.specialization || 'N/A'}</p>
                        <p className="text-gray-600">Contact: {guide.email}</p>
                    </div>
                </div>
            </div>

            {/* Stories Section */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-5">Stories by {guide.name}</h3>
                {stories.length === 0 ? (
                    <p className="text-gray-600">No stories added by this guide yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {stories.map((story) => (
                            <div key={story._id} className="bg-white shadow-md rounded-lg p-5">
                                <img
                                    src={story.images[0] || 'https://via.placeholder.com/300'}
                                    alt={story.title}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h4 className="text-xl font-bold mb-2">{story.title}</h4>
                                <p className="text-gray-600 mb-3">{story.description.substring(0, 100)}...</p>
                                <button className="btn btn-primary btn-sm">Read More</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuideProfile;
