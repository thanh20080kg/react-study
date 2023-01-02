import React from "react";

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            regex: this.props.regex
        };
    }

    handleChange(e) {
        const regex = this.state.regex;
        if (!regex || e.target.value === '' || regex.test(e.target.value)) {
            this.setState({value: e.target.value})
        }
    }

    render() {
        return <input value={this.state.value} onChange={(i) => this.handleChange(i)}/>
    }
}