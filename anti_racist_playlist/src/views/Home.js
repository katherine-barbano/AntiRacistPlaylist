import React from 'react';
// import sections
import LandingPage from '../components/sections/LandingPage';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = () => {
  
  return (
    <>
      <LandingPage />
      <Cta split />
    </>
  );
}

export default Home;