import React, { Component } from "react";
import "./NavMessage.css";

// this component renders an li tag containing a message for the user

class NavMessage extends Component {
    state = {
        message: "",
        animating: false
    };

    componentWillReceiveProps({ score, topScore}) {
        const newState = { animating: true };
        if (score === 0 && topScore === 0) {
            newState.message = "nada";
         } else if (score === 0 && topScore > 0) {
            newState.message = "incorrect";
        } else {
            newState.message = "correct";
        }
        this.setState(newState, () =>
            setTimeout(() => this.setState({ animating: false }), 500)
        );
    }

    renderMessage = () => {
        switch (this.state.message) {
            case "correct":
                return "You guessed correctly!";
            case "incorrect":
                return "You guessed incorrectly!";
            default:
                return "Click on any stadium to begin!";
            }
        };

    render() {
        return (
                <li className={this.state.animating ? this.state.message : ""}>
                    {this.renderMessage()}
                </li>
        );
    }
}

export default NavMessage;