import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper/core';
import apartment1 from './images/apartment1.jpg';
import apartment2 from './images/apartment2.jpg';
import apartment3 from './images/apartment3.jpg';

// Install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

const Banner = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            loop={true}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src={apartment1} alt="Apartment 1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={apartment2} alt="Apartment 2" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={apartment3} alt="Apartment 3" />
            </SwiperSlide>
            {/* Add more SwiperSlides for additional images */}
        </Swiper>
    );
};

export default Banner;
