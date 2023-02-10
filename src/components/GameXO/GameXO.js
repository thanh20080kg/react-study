import {Button, Dropdown} from "antd";
import Editor from "../Common/Editor";
import Board from "./Broad";
import React from "react";


import "../../styles/GameXO/gameOX.css"

export default class GameXO extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(0).fill(Array(0).fill(null)),
                winner: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            won: null,
            winArray: null,
            winCondition: 0,
        }
        this.nRowsText = React.createRef();
        this.nColsText = React.createRef();
        this.winConditionText = React.createRef();
        this.broad = React.createRef();
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return ({
                    key: move,
                    label: <label key={move}
                                  onClick={() => jumpTo(this, move)}>
                        {desc}
                    </label>,
                }
            )
        });

        const dropDownMoves = (
            <Dropdown
                className="ant-dropdown-menu"
                menu={{
                    items: moves,
                }}
                placement="bottomLeft"
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <Button>bottomLeft</Button>
            </Dropdown>
        )
        let status;
        if (this.state.won) {
            status = 'Winner: ' + this.state.won;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-setup">
                    <div className={"game-setup-label"}>
                        <label>Rows: </label>
                        <label>Cols: </label>
                        <label>Win Condition: </label>
                    </div>
                    <div className={"game-setup-editor"}>
                        <Editor ref={this.nRowsText} regex={/^[0-9\b]+$/}/>
                        <Editor ref={this.nColsText} regex={/^[0-9\b]+$/}/>
                        <Editor ref={this.winConditionText} regex={/^[0-9\b]+$/}/>
                    </div>
                    <button onClick={() => createBroad(this)}>Create Broad</button>
                </div>
                <div className="game-board">
                    <div className="game-info">
                        <div>{status}</div>
                        <div>{dropDownMoves}</div>
                    </div>
                    <Board ref={this.broad}
                           squares={current.squares}
                           onClick={(i, j) => clickMove(this, i, j)}
                    />
                </div>
            </div>
        )
            ;
    }
}

function initState(prods, nRows, nCols, winCondition) {
    prods.setState({
        history: [{
            squares: Array(nRows).fill(Array(nCols).fill(null)),
            winner: null,
        }],
        stepNumber: 0,
        xIsNext: true,
        won: null,
        winCondition: winCondition,
    });
}

function createBroad(prods) {
    const nRows = Number(prods.nRowsText.current.state.value);
    const nCols = Number(prods.nColsText.current.state.value)
    const winCondition = Number(prods.winConditionText.current.state.value)
    initState(prods, nRows, nCols, winCondition)
    prods.broad.current.setState({
        nRows: nRows,
        nCols: nCols,
    });
}

function jumpTo(prods, step) {
    const history = prods.state.history[step];
    prods.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        won: history.winner,
    });
}

function clickMove(prods, i, j) {
    const history = Array.from(prods.state.history).slice(0, Number(prods.state.stepNumber) + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice().map(i => i.slice());
    let winner = current.winner;
    const currentPlayer = prods.state.xIsNext ? 'X' : 'O';
    let winArray;
    if (squares[i][j] || prods.state.won) {
        return;
    } else {
        winArray = calculateWinner(squares, prods.broad.current, prods.state.winCondition, i, j, currentPlayer)
        if (winArray) {
            winner = currentPlayer;
        }
    }
    squares[i][j] = currentPlayer;
    prods.setState({
        history: history.concat([{
            squares: squares,
            winners: winner,
        }]),
        stepNumber: history.length,
        xIsNext: !prods.state.xIsNext,
        winArray: winArray,
        won: winner,
    });
}


function calculateWinner(squares, broad, winCondition, x, y, currentPlayer) {
    const nRows = broad.state.nRows;
    const nCols = broad.state.nCols;
    let winArray = [];
    //// win row
    for (let i = y - 1; i >= 0; i--) {
        if (squares[x][i] === currentPlayer) {
            winArray.push(x + "-" + i);
        } else {
            break;
        }
    }
    for (let i = y + 1; i < nCols; i++) {
        if (squares[x][i] === currentPlayer) {
            winArray.push(x + "-" + i);
        } else {
            break;
        }
    }
    if (winArray.length >= winCondition - 1) {
        return currentPlayer;
    }

    //// win col
    winArray = [];
    for (let i = x - 1; i >= 0; i--) {
        if (squares[i][y] === currentPlayer) {
            winArray.push(i + "-" + y);
        } else {
            break;
        }
    }
    for (let i = x + 1; i < nRows; i++) {
        if (squares[i][y] === currentPlayer) {
            winArray.push(i + "-" + y);
        } else {
            break;
        }
    }
    if (winArray.length >= winCondition - 1) {
        return currentPlayer;
    }

    winArray = [];
    //// win \
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
        if (squares[i][j] === currentPlayer) {
            winArray.push(i + "-" + j);
        } else {
            break;
        }
    }
    for (let i = x + 1, j = y + 1; i < nRows && j < nCols; i++, j++) {
        if (squares[i][j] === currentPlayer) {
            winArray.push(i + "-" + j);
        } else {
            break;
        }
    }
    if (winArray.length >= winCondition - 1) {
        return currentPlayer;
    }

    /// win /
    winArray = [];
    for (let i = x - 1, j = y + 1; i >= 0 && j < nCols; i--, j++) {
        if (squares[i][j] === currentPlayer) {
            winArray.push(i + "-" + j);
        } else {
            break;
        }
    }
    for (let i = x + 1, j = y - 1; i < nRows && j >= 0; i++, j--) {
        if (squares[i][j] === currentPlayer) {
            winArray.push(i + "-" + j);
        } else {
            break;
        }
    }
    if (winArray.length >= winCondition - 1) {
        return currentPlayer;
    }
    return null;
}


// ========================================
