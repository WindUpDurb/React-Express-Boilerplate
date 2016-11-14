"use strict";

import * as types from "../actions/actionTypes";
import {currentChallenge} from "./initialState";

export default function challengeReducer (state = currentChallenge, action) {
    switch(action.type) {
        case types.GOT_CHALLENGE:
            return (
                Object.assign({}, state, action.challengeDetails)
            );

        case types.CHALLENGE_SUCCESS:
            return (
                Object.assign({}, state, {challengeResults: action.results.evaluations, completedChallenge: true})
            );

        case types.CHALLENGE_FAILURE:
            return (
                Object.assign({}, state, {challengeResults: action.results.evaluations, failedChallenge: true})
            );

        case types.CHALLENGE_ERROR:
            return (
                Object.assign({}, state, {userError: action.error})
            );

        case types.CLEAR_CHALLENGE:
            return null;

        default:
            return state;
    }
}