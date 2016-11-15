"use strict";

import React, {PropTypes} from "react";

export const ErrorResponse = ({results}) => {
    return (
        <div>
            <span style={{color: "red", fontSize: "20px", fontWeight: "bold"}}>Error</span>
            <br/>
            <span style={{fontWeight: "bold"}}>Error Message</span>
            <div className="inputResultsDiv">
                {results.reason}
            </div>
        </div>
    )
};

ErrorResponse.propTypes = {
    results: PropTypes.object
};