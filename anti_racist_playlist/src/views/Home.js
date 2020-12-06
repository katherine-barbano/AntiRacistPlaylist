import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import sections

import Routes from './../utils/Routes';
import LandingPage from '../components/sections/LandingPage';
import PlaylistCreation from '../components/sections/PlaylistCreation';


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