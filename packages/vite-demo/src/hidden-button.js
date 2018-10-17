// @flow
import * as React from "react";
import {css, StyleSheet} from "aphrodite";

type Props = {
    cover: boolean,
}
export default class HiddenButton extends React.Component<Props> {
    static defaultProps = {
        cover: false,
    }

    state = {
        clicked: false,
    }

    handleClick = () => {
        this.setState({clicked: true});
    }

    render() {
        return <div>
            <button onClick={this.handleClick}>
                {this.state.clicked ? "clicked" : "no yet"}
            </button>
            <div className={css(this.props.cover && styles.cover)}/>
        </div>;
    }
}

const styles = StyleSheet.create({
    cover: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 100,
        height: 50,
    },
});
