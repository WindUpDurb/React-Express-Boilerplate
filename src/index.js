"use strict";
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore.dev";
import {Provider} from "react-redux";
import { Router, applyRouterMiddleware, browserHistory } from "react-router";
import useScroll from "react-router-scroll";
import {generateRoutes} from "./routes";
import "./styles/styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

render(
    <Provider store={store}>
        <Router
            history={browserHistory}
            routes={generateRoutes(store)}
            render={applyRouterMiddleware(useScroll())}/>
    </Provider>,
    document.getElementById("app")
);

export default store;