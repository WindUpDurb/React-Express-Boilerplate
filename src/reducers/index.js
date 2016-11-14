"use strict";

import { combineReducers } from "redux";
import initialStateReducer from "./initialStateReducer";
import requestStatusReducer from "./requestsInProgress";
import challengeReducer from "./challengeReducer";

const rootReducer = combineReducers({
    initialState: initialStateReducer,
    requestsInProgress: requestStatusReducer,
    currentChallenge: challengeReducer
});

export default rootReducer;
