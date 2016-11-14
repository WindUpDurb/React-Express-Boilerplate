"use strict";

import React from "react";

export const TestCaseFailureMessage = () => {
    return (
        <div>
            <span style={{fontSize: "18px", fontWeight: "bold"}}>Sorry. Your code did not pass all of the sample test cases.</span>
            <br/>
            Click the <span style={{fontWeight: "bold"}}>Run Code</span> button after refractoring your code to run it again before submitting.
        </div>
    )
};