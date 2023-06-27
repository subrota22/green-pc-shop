import React from 'react';
import { Helmet } from 'react-helmet';
import Advertise from '../Advertise/Advertise';
import Categories from '../Categories/Categories';
import ResellProcess from '../ResellProcess/ResellProcess';
import Slider from '../Slider/Slider';
import AboutUs from '../AboutUs/AboutUs';
import ContactUs from '../ContactUs/ContactUs';
import Newsletter from './NewLatter/NewLatter';
import OurTeam from './OurTeam/OurTeam';
import Testimonials from './TestiMonal/TestiMonal';
import FrequentlyAskQuestions from '../FrequentlyAskQuestions/FrequentlyAskQuestions';

const Home = () => {
    return (
        <>
    <Helmet><title>Home page</title></Helmet>
        
        <Slider></Slider>
        <Categories></Categories>
        <Advertise></Advertise>
        <ResellProcess></ResellProcess>
        <AboutUs></AboutUs>
        <ContactUs></ContactUs>
        <FrequentlyAskQuestions></FrequentlyAskQuestions>
        <OurTeam></OurTeam>
        <Testimonials></Testimonials>
        <Newsletter></Newsletter>


        </>
    );
};

export default Home;