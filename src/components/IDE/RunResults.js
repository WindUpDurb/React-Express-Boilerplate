"use strict";

import React, {PropTypes} from "react";
import {NoErrorResponse} from "./NoErrorResponse";
import {ErrorResponse} from "./ErrorResponse";

export const RunResults = ({results}) => {
    console.log("results: ", results);
    let resultsComponents;
    if (!results.reason) resultsComponents = <NoErrorResponse results={results}/>;
    if (results.reason) resultsComponents = <ErrorResponse results={results}/>;

    return (
        <div className="runResultsDiv">
            {resultsComponents}
        </div>
    )
};

RunResults.propTypes = {
    results: PropTypes.object
};