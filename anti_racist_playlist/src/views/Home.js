import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import sections

import Routes from './../utils/Routes';
import LandingPage from '../components/sections/LandingPage';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = () => {
  
  return (
    <>
        <div className="App">
            <LandingPage />
        </div>
 
    </>
  );
}

export default Home; 