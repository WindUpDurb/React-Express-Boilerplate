"use strict";

import React from "react";
import { Route, IndexRedirect } from "react-router";
import App from "./components/App";
import HomePage from "./components/Home/HomePage";
import ChallengePageComponent from "./components/Challenge/ChallengePageComponent";

export const generateRoutes = (store) => {

    return (
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="/home" component={HomePage} />
            <Route path="/challenge" component={ChallengePageComponent} />
        </Route>
    );

};

