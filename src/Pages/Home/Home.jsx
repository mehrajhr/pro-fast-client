import React from 'react';
import Banner from './Banner';
import OurServices from './OurServices';
import ServiceBrands from './ServiceBrands';
import KeyBenefits from './KeyBenefits';
import BeMerchent from './BeMerchent';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <OurServices></OurServices>
           <ServiceBrands></ServiceBrands>
           <KeyBenefits></KeyBenefits>
           <BeMerchent></BeMerchent>
        </div>
    );
};

export default Home;