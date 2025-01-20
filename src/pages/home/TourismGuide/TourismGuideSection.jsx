import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Packages from './packages/Packages';
import Guides from './guides/Guides';

const TourismGuideSection = () => {
    return (
        <div className='my-20 max-w-screen-2xl mx-auto text-center'>
            <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
                <TabList>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet our Tour Guides</Tab>
                </TabList>
                <TabPanel>
                    <Packages></Packages>
                </TabPanel>
                <TabPanel>
                    <Guides></Guides>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourismGuideSection;