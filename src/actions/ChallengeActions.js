"use strict";

import * as types from "./actionTypes";
import {browserHistory} from "react-router";

export function dispatchCurrentChallenge(challengeDetails) {
    return {
        type: types.GOT_CHALLENGE,
        challengeDetails
    }
}

export function dispatchClearChallenge() {
    return {
        type: types.CLEAR_CHALLENGE
    }
}
export function dispatchChallengeFailed (results) {
    return {
        type: types.CHALLENGE_FAILURE,
        results
    }
}

export function dispatchChallengeSucccess (results) {
    return {
        type: types.CHALLENGE_SUCCESS,
        results
    }
}

export function dispatchChallengeError (error) {
    return {
        type: types.CHALLENGE_ERROR,
        error
    }
}

export function submitSolutioin (userSubmission, challengeDetails) {
    return function (dispatch) {
        let options = {
            method: "POST",
            body: JSON.stringify({userSubmission, challengeDetails}),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch("/api/test/evaluateSubmission", options)
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                console.log("parsed response: ", parsedResponse);
                if (parsedResponse.failedTest && parsedResponse.reason) return dispatch(dispatchChallengeError(parsedResponse.reason));
                if (parsedResponse.failedTest && parsedResponse.evaluations) return dispatch(dispatchChallengeFailed(parsedResponse));
                if (!parsedResponse.failedTest) return dispatch(dispatchChallengeSucccess(parsedResponse));
            })
    }
}

export function clearChallenge() {
    return function (dispatch) {
        dispatch(dispatchClearChallenge());
    }
}

export function retrieveChallenge (challengeId) {
    return function (dispatch) {
        let options = {
            method: "POST",
            body: JSON.stringify({challengeId}),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch("/api/test/retrieveChallenge", options)
            .then(response => {
                return response.json();
            })
            .then(parsedResponse => {
                console.log("Parsed Response: ", parsedResponse);
                dispatch(dispatchCurrentChallenge(parsedResponse));
                browserHistory.push("/challenge");
            })
    }
}