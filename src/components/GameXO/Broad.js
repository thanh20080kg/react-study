import React from "react";

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nRows: 0,
            nCols: 0,
        }
    }

    renderSquare(i, j) {
        return <Square key={i + "" + j}
                       value={this.props.squares[i][j]}
                       onClick={() => this.props.onClick(i, j)}/>;
    }

    render() {
        const tr = [];
        for (let i = 0; i < this.state.nRows; i++) {
            const td = [];
            for (let j = 0; j < this.state.nCols; j++) {
                td.push(this.renderSquare(i, j));
            }
            tr.push(<div className="board-row" key={i}> {td} </div>);
        }
        return (
            <div>{tr}</div>
        );
    }
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}