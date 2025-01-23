import React from 'react';
import Banner from './Banner';
import TourismAndGuide from './TourismAndGuide/TourismAndGuide';
import TouristStory from './TouristStory/TouristStory';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <TourismAndGuide></TourismAndGuide>
            <TouristStory></TouristStory>
        </div>
    );
};

export default HomePage;