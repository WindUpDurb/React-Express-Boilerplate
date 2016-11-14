"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import IDEComponent from "../IDE/IDEComponent";
import {bindActionCreators} from "redux";
import * as ChallengeActions from "../../actions/ChallengeActions";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.grabChallenge = this.grabChallenge.bind(this);
    }


    grabChallenge(event) {
        this.props.ChallengeActions.retrieveChallenge(event.target.name);
    }


    render() {
        return (
            <div className="text-center">
                <div style={{paddingTop: "40%"}}>
                    <button onClick={this.grabChallenge} name="1" className="btn btn-primary">Challenge 1</button>
                    <br/><br/>
                    <button onClick={this.grabChallenge} name="2" className="btn-primary btn">Challenge 2</button>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    ChallengeActions: PropTypes.object
};

function mapStateToProps (state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        ChallengeActions: bindActionCreators(ChallengeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);