import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from '../views/Home';
import LandingScreen from '../components/sections/LandingPage';
import CreatePlaylist from '../views/CreatePlaylist';
import FinishPlaylist from '../views/FinishPlaylist';
import Playlists from '../views/Playlists';
import history from "./History";
import LogIn from "../views/LogIn";
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LogIn} />
                    <Route path="/Home" exact component={LandingScreen} />
                    <Route path="/CreatePlaylist" component={CreatePlaylist} />
                    <Route path="/FinishPlaylist" component={FinishPlaylist} />
                    <Route path="/Playlists" component={Playlists} />
                </Switch>
            </Router>
        )
    }
}