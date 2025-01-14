import React from 'react';
import bannerImage from '../../assets/Saint_Martins_Island_with_boats_in_foreground.jpg';
import { FaArrowRight } from 'react-icons/fa';

const Banner = () => {
    return (
        <div
            className="hero"
            style={{
                backgroundImage: `url(${bannerImage})`,
                height: '85vh'
            }}>
            <div className="hero-overlay bg-opacity-45"></div>
            <div className="hero-content text-white text-center">
                <div className="">
                    <h1 className="mb-2 lg:mb-5 text-4xl md:text-5xl lg:text-6xl font-bold">Discover the Wonders of Bangladesh</h1>
                    <p className="mb-2 lg:mb-8">
                    Explore the beautiful landscapes and unique attractions of Bangladesh with our travel guide.
                    </p>
                    <button className="btn btn-sm rounded-md hover:bg-purple-700 font-normal lg:btn-md lg:text-base border-0 bg-purple-500 text-white">Get Started <FaArrowRight></FaArrowRight></button>
                </div>
            </div>
        </div>
    );
};

export default Banner;