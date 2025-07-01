import React from 'react';
import Banner from './Banner';
import OurServices from './OurServices';
import ServiceBrands from './ServiceBrands';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <OurServices></OurServices>
           <ServiceBrands></ServiceBrands>
        </div>
    );
};

export default Home;