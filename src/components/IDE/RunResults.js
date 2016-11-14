"use strict";

import React, {PropTypes} from "react";
import {TestCaseFailureMessage} from "./TestCaseFailureMessage";
import {TestCaseSuccessMessage} from "./TestCaseSuccessMessage";

export const RunResults = ({results}) => {
    console.log("results: ", results)
    let resultsMessage, input, output, expectedOutput;
    results.failedTest ? resultsMessage = <TestCaseFailureMessage/> : resultsMessage = <TestCaseSuccessMessage/>;
    if (results.evaluations && results.evaluations.length) input = results.evaluations.map((testCase, index) => <p key={index}>{testCase.inputString}</p>);
    if (results.evaluations && results.evaluations.length) output = results.evaluations.map((testCase, index) => {
        if (testCase.result === "passed") return <p style={{color: "green"}} key={index}>{testCase.output} </p>
        return <p style={{color: "red"}} key={index}>{testCase.output} </p>
    });
    if (results.evaluations && results.evaluations.length) expectedOutput = results.evaluations.map((testCase, index) => <p key={index}>{testCase.expectedOutput}</p>);
    return (
        <div className="runResultsDiv">
           {resultsMessage}
            <br/>
            <span style={{fontWeight: "bold"}}>Input</span>
            <div className="inputResultsDiv">
                {input}
            </div>
            <span style={{fontWeight: "bold"}}>Expected Output</span>
            <div className="inputResultsDiv">
                {expectedOutput}
            </div>
            <span style={{fontWeight: "bold"}}>Your Output</span>
            <div className="inputResultsDiv">
                {output}
            </div>
        </div>
    )
};

RunResults.propTypes = {
    results: PropTypes.object
};