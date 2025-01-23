import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';

const Community = () => {
    const [stories, setStories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/stories')
        .then((res) => {
            setStories(res.data);
        })
        .catch(error => {
            console.log('error fetching stories', error);
        })
    }, [])
    return (
        <div className="min-h-screen p-10 md:pt-20">
            <h2 className="text-4xl font-bold text-center mb-5">All Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stories.map((story) => (
                    <div key={story._id} className="bg-white rounded shadow-md pb-3 overflow-hidden">
                        <img
                            src={story.images[0] || 'https://via.placeholder.com/150'}
                            alt={story.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                            <p className="text-gray-600">{story.description.slice(0, 100)}...</p>
                        </div>
                        <div className='px-5 flex items-center gap-5'>
                            <h4>Share with your friends:</h4>
                            <FacebookShareButton
                                url={window.location.href} 
                                quote={`Check out this amazing story: ${story.title}`}
                                onClick={() => handleShare(window.location.href)}
                            >   
                                <FacebookIcon size={32} round></FacebookIcon>
                            </FacebookShareButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;