"use strict";

import React, {PropTypes} from "react";
import {TestCaseFailureMessage} from "./TestCaseFailureMessage";
import {TestCaseSuccessMessage} from "./TestCaseSuccessMessage";

export const NoErrorResponse = ({results}) => {
    let resultsMessage, input, output, expectedOutput;
    results.failedTest ? resultsMessage = <TestCaseFailureMessage/> : resultsMessage = <TestCaseSuccessMessage/>;
    if (results.evaluations && results.evaluations.length) input = results.evaluations.map((testCase, index) => <p key={index}>{testCase.inputString}</p>);
    if (results.evaluations && results.evaluations.length) output = results.evaluations.map((testCase, index) => {
        if (testCase.result === "passed") return <p style={{color: "green"}} key={index}>{testCase.output} </p>;
        return <p style={{color: "red"}} key={index}>{testCase.output} </p>
    });
    if (results.evaluations && results.evaluations.length) expectedOutput = results.evaluations.map((testCase, index) => <p key={index}>{testCase.expectedOutputString}</p>);
    console.log(input);
    console.log(output);
    console.log(expectedOutput);
    return (
        <div>
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

NoErrorResponse.propTypes = {
    results: PropTypes.object
};