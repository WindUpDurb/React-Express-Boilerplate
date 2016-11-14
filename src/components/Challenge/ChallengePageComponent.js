"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import IDEComponent from "../IDE/IDEComponent";


class ChallengePageComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <IDEComponent submitSolution challengeDetails={this.props.currentChallenge}/>
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