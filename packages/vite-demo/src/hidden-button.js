// @flow
import * as React from "react";

export default class HiddenButton extends React.Component<{}> {
    state = {
        clicked: false,
    }

    handleClick = () => {
        this.setState({clicked: true});
    }

    render() {
        return <button onClick={this.handleClick}>
            {this.state.clicked ? "clicked" : "no yet"}
        </button>;
    }
}
