"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Codemirror from "react-codemirror";
import {bindActionCreators} from "redux";
import * as ChallengeActions from "../../actions/ChallengeActions";
import {ProcessingCode} from "./ProcessingCode";
import {RunResults} from "./RunResults";
import "../../../node_modules/codemirror/lib/codemirror.css";
import "../../../node_modules/codemirror/mode/javascript/javascript";

//check out http://blog.dreamcss.com/wysiwyg-editor/javascript-source-code-editors/

// Probably change to a dumb component?
class IDEComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processingCode: false,
            testResults: null,
            code: `function ${this.props.challengeDetails.functionName} (${this.props.challengeDetails.argumentsIDE}) {
//construct your function below                

}`
        };

        this.updateCode = this.updateCode.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.runCode = this.runCode.bind(this);
    }

    componentWillUnmount() {
        this.props.ChallengeActions.clearChallenge();
    }

    updateCode(newCode) {
        this.setState({code: newCode});
    }

    runCode() {
        this.setState({processingCode: true});
        let userSubmission = this.state.code,
            challengeDetails = this.props.challengeDetails,
            options = {
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
                window.setTimeout(() => {
                    this.setState({processingCode: false, testResults: parsedResponse});
                }, 1500);
            })
    }

    submitCode() {
        //this.props.ChallengeActions.submitSolutioin(this.state.code, this.props.challengeDetails);
    }



    render() {
        let runResults, processingNotice, options = {lineNumbers: true, gutters: ["gutter"]};
        if (this.state.processingCode) processingNotice = <ProcessingCode/>;
        if (this.state.testResults) runResults = <RunResults results={this.state.testResults}/>;

        let resultsNotice = processingNotice || runResults;



        return (
            <div>
                <div style={{width: "800px", margin: "0 auto", paddingBottom: "25px"}}>
                    <div className="divAboveIDE">
                        <div style={{position: "absolute", left: "8px", paddingTop: "10px"}}>
                            <span style={{fontSize: "15px", color: "#39424e", fontWeight: "bold"}}>Coding House Code Evaluator</span>
                            <span style={{fontSize: "14px", color: "#767676"}}>  Javascript IDE</span>
                        </div>
                    </div>
                    <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
                    <div className="divAroundSubmit">
                        <div style={{paddingTop: "10px", position: "absolute", right: "25px"}}>
                            <div onClick={this.runCode} className="buttonDiv">
                                Run Code
                            </div>
                            <div style={{color: "white", border: "1px solid #f7c06b",  marginLeft: "15px", backgroundColor: "#f7c06b"}} className="buttonDiv">
                                Submit
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <br/>
                {resultsNotice}
            </div>
        )
    }
}

IDEComponent.propTypes = {
    challengeDetails: PropTypes.object,
    ChallengeActions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let challengeDetails;
    if (ownProps.challengeDetails) challengeDetails = ownProps.challengeDetails;
    return  {
        challengeDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ChallengeActions: bindActionCreators(ChallengeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IDEComponent);