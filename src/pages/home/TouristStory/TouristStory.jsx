import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FacebookIcon, FacebookShareButton } from 'react-share';

const TouristStory = () => {
    const [stories, setStories] = useState([]);
    const [expandedStories, setExpandedStories] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/stories/random')
            .then(res => {
                setStories(res.data)
            })
            .catch(error => {
                console.log('error fetching story', error);
            })
    }, [])

    const handleShare = (url) => {
        if (!user) {
            navigate('/login')
        } else {
            console.log('sharing:', url);
        }
    }
    const toggleStoryExpansion = (id) => {
        setExpandedStories((prev) => ({
            ...prev,
            [id]: !prev[id], 
        }));
    };
    return (
        <div className="min-h-screen p-10">
            <h2 className="text-4xl font-bold text-center mb-8">Tourist Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stories.map((story) => (
                    <div key={story._id} className="bg-white rounded shadow-md overflow-hidden">
                        <img
                            src={story.images[0] || 'https://via.placeholder.com/150'}
                            alt={story.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <div className='h-44'>
                                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                                <p className="text-gray-600 mt-2">
                                    {expandedStories[story._id]
                                        ? story.description // Show full description
                                        : `${story.description.slice(0, 100)}...`}
                                    <button
                                        onClick={() => toggleStoryExpansion(story._id)}
                                        className="text-blue-600 hover:underline mt-2"
                                    >
                                        {expandedStories[story._id] ? 'Read Less' : 'Read More'}
                                    </button>
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-5">
                                {/* Share Button */}
                                <FacebookShareButton
                                    url={window.location.href} // Current page URL
                                    quote={`Check out this amazing story: ${story.title}`}
                                    onClick={() => handleShare(window.location.href)}
                                    className='flex items-center gap-2'
                                >   Share on:
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>

                                {/* View All Stories */}
                                <button
                                    onClick={() => navigate('/allStories')}
                                    className="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    View All
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-10">
                <button
                    onClick={() => navigate('/allStories')}
                    className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    All Stories
                </button>
                <button
                    onClick={() => navigate('/add-stories')}
                    className="py-2 px-4 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                >
                    Add Story
                </button>
            </div>
        </div>
    );
};

export default TouristStory;