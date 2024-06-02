import React from 'react';
import Banner from '../../Components/Banner/Banner';
import About from '../../Components/About/About';
import Coupon from '../../Components/Cupon/Cupon';
import Location from '../../Components/Location/Location';
import FAQ from '../../Components/Faq/Faq';
import Apartments from '../../Components/Apertment/Apertment';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Coupon></Coupon>
            <About></About>
            <Apartments></Apartments>
            <Location></Location>
            <FAQ />

        </div>
    );
};

export default Home;