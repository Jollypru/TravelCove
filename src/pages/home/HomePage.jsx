import React from 'react';
import Banner from './Banner';
import TourismAndGuide from './TourismAndGuide/TourismAndGuide';
import TouristStory from './TouristStory/TouristStory';
import PopularDestinations from './PopularDestination/PopularDestination';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <TourismAndGuide></TourismAndGuide>
            <TouristStory></TouristStory>
            <PopularDestinations></PopularDestinations>
        </div>
    );
};

export default HomePage;