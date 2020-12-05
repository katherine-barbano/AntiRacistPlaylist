import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from '../views/Home';
import LandingScreen from '../components/sections/LandingPage';
import CreatePlaylist from '../views/CreatePlaylist';
import history from "./History";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Home" exact component={LandingScreen} />
                    <Route path="/CreatePlaylist" component={CreatePlaylist} />
                </Switch>
            </Router>
        )
    }
}