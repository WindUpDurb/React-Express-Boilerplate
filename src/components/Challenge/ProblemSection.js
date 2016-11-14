"use strict";

import React, {PropTypes} from "react";

export const ProblemSection = ({currentChallenge}) => {
    let inputFormat, outputFormat, sampleInput, sampleOutput, title;
    if (currentChallenge.title) title = currentChallenge.title;
    if (currentChallenge.inputFormat.length) inputFormat = currentChallenge.inputFormat.map((paragraph, index) => <p className="descriptionText" key={index}>{paragraph}</p>);
    if (currentChallenge.outputFormat.length) outputFormat = currentChallenge.outputFormat.map((paragraph, index) => <p className="descriptionText" key={index}>{paragraph}</p>);
    if (currentChallenge.sampleInput.length) sampleInput = currentChallenge.sampleInput.map((input, index) => {
        return (
            <div key={index} style={{paddingLeft: "15px"}}>
                <p className="inputText">{input}</p>
            </div>
        )
    });
    if (currentChallenge.sampleOutput.length) sampleOutput = currentChallenge.sampleOutput.map((output, index) => {
        return (
            <div key={index} style={{paddingLeft: "15px"}}>
                <p className="inputText" >{output}</p>
            </div>
        )
    });
    return (
        <div className="descriptionDiv">
            <h2 style={{fontWeight: "bold"}}>{title}</h2>
            <p className="descriptionText">{currentChallenge.description}</p>
            <span className="descriptionTextSectionHeading">Input Format</span>
            {inputFormat}
            <span className="descriptionTextSectionHeading">Output Format</span>
            {outputFormat}
            <span className="descriptionTextSectionHeading">Sample Input</span>
            <div className="sampleInputDiv">
                {sampleInput}
            </div>
            <span className="descriptionTextSectionHeading">Sample Output</span>
            <div className="sampleInputDiv">
                {sampleOutput}
            </div>
        </div>
    )
};

ProblemSection.propTypes = {

};