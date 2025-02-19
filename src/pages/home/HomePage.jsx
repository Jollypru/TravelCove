import React from 'react';
import Banner from './Banner';
import TourismAndGuide from './TourismAndGuide/TourismAndGuide';
import TouristStory from './TouristStory/TouristStory';
import PopularDestinations from './PopularDestination/PopularDestination';
import Newsletter from './NewsletterSection/NewsletterSection';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <TourismAndGuide></TourismAndGuide>
            <TouristStory></TouristStory>
            <PopularDestinations></PopularDestinations>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;