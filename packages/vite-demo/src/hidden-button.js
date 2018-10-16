// @flow
import * as React from "react";

export default class HiddenButton extends React.Component<{}> {
    handleClick = () => {
        console.log("click me");
    }

    render() {
        return <div>
            <button onClick={this.handleClick}>Click me!</button>
        </div>
    }
}
