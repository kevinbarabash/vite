// @flow
import * as React from "react";

export default class HiddenButton extends React.Component<{}> {
    handleClick = () => {
        // eslint-disable-next-line no-console
        console.log("click me");
    }

    render() {
        return <div>
            <button onClick={this.handleClick}>Click me!</button>
        </div>
    }
}
