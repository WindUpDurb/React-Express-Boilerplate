"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import IDEComponent from "../IDE/IDEComponent";
import {ProblemSection} from "./ProblemSection";


class ChallengePageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.returnToMenu = this.returnToMenu.bind(this);
    }


    returnToMenu() {
        browserHistory.push("/");
    }

    render() {
        let currentChallenge;
        if (this.props.currentChallenge) currentChallenge = this.props.currentChallenge;
        return (
            <div style={{paddingTop: "8%"}}>
                <ProblemSection currentChallenge={currentChallenge}/>
                <IDEComponent submitSolution challengeDetails={this.props.currentChallenge}/>
                <div style={{padding: "4% 0 4% 0"}} className="text-center">
                    <button onClick={this.returnToMenu}>Return to Menu</button>
                </div>
            </div>
        );
    }

}

ChallengePageComponent.propTypes = {
    currentChallenge: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let currentChallenge;
    if (state.currentChallenge) currentChallenge = state.currentChallenge;
    return {
        currentChallenge
    }
}

export default connect(mapStateToProps)(ChallengePageComponent);