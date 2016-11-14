"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import Codemirror from "react-codemirror";
import {bindActionCreators} from "redux";
import * as ChallengeActions from "../../actions/ChallengeActions";
import "../../../node_modules/codemirror/lib/codemirror.css";
import "../../../node_modules/codemirror/mode/javascript/javascript";

//check out http://blog.dreamcss.com/wysiwyg-editor/javascript-source-code-editors/

// Probably change to a dumb component?
class IDEComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: `function ${this.props.challengeDetails.functionName} (${this.props.challengeDetails.argumentsIDE}) {
//construct your function below                

}`
        };

        this.updateCode = this.updateCode.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.returnToMenu = this.returnToMenu.bind(this);
    }

    componentWillUnmount() {
        this.props.ChallengeActions.clearChallenge();
    }

    updateCode(newCode) {
        this.setState({code: newCode});
    }

    submitCode() {
        this.props.ChallengeActions.submitSolutioin(this.state.code, this.props.challengeDetails);
    }

    returnToMenu() {
        this.props.ChallengeActions.clearChallenge();
        browserHistory.push("/");
    }


    render() {
        let challengeSuccess, failedChallenge, userErrorNotice, options = {lineNumbers: true, gutters: ["gutter"]};
        if (this.props.challengeDetails.completedChallenge) challengeSuccess = (
            <span style={{fontSize: "15px", color: "green"}} >Congratulations. You completed the challenge</span>
                );
        if (this.props.challengeDetails.failedChallenge) failedChallenge = (
            <div>
                <span style={{fontSize: "15px", color: "red"}}>Sorry. Your submission didn't pass all of the test cases</span>
                {this.props.challengeDetails.challengeResults.map((testCase, index) => (
                <div key={index}>{`Expected output: ${JSON.stringify(testCase.expectedOutput)}   Your output: ${JSON.stringify(testCase.output)} - ${testCase.result}`}</div>
                ))}
            </div>
        );

        if (this.props.challengeDetails.userError) userErrorNotice = <span style={{fontSize: "15px", color: "red"}}>{this.props.challengeDetails.userError}</span>;
        let resultsNotice = challengeSuccess || failedChallenge || userErrorNotice;



        return (
            <div style={{width: "800px", margin: "0 auto"}}>
                <div style={{paddingTop: "10%", paddingLeft: "3%", paddingRight: "3%", paddingBottom: "5%", textAlign: "center"}}>
                    <span style={{fontSize: "13px"}}>{this.props.challengeDetails.description || ""}</span>
                </div>
                <div className="divAboveIDE">
                    <div style={{position: "absolute", left: "8px", paddingTop: "10px"}}>
                        <span style={{fontSize: "15px", color: "#39424e", fontWeight: "bold"}}>Coding House Code Evaluator</span>
                        <span style={{fontSize: "14px", color: "#767676"}}>  Javascript IDE</span>
                    </div>
                </div>
              <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
                <div className="divAroundSubmit">
                    <div style={{paddingTop: "10px", position: "absolute", right: "25px"}}>
                        <div onClick={this.submitCode} className="buttonDiv">
                            Run Code
                        </div>
                        <div onClick={this.returnToMenu} style={{color: "white", border: "1px solid #f7c06b",  marginLeft: "15px", backgroundColor: "#f7c06b"}} className="buttonDiv">
                            Submit
                        </div>
                    </div>
                </div>
                <br/>
                <div style={{paddingTop: "3%", paddingBottom: "3%", textAlign: "center"}}>
                    {resultsNotice}
                </div>
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