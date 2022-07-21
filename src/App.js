import { within } from '@testing-library/react';
import React, { useState } from 'react';
import './App.css';
function Square(props) {
  return (
    <button className='square' onClick={props.clickFunc}>
      {props.value}
    </button>
  )
}
class Board extends React.Component {
  constructor(props){
    super(props);
  }
  renderSquare(i) {
    return (
      <Square value={this.props.value[i]}
        clickFunc={()=>this.props.clickFunc(i)}
      />
    )
  }
  render() {
    return (<div>
      <div className='board-row'>
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
      </div>
      <div className='board-row'>
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
      </div>
      <div className='board-row'>
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        {this.renderSquare(9)}
      </div>
    </div>);
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [
        {squares: Array(9).fill(null)}
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }
 
  clickFunc(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    var currentSquare = history[this.state.stepNumber];
    const squares = currentSquare.squares.slice();
    const winner = calculateWinner(squares);
    if(winner == null){
      
      if(!squares[i]){
        squares[i]= this.state.xIsNext? 'X' : 'O';

        this.setState ({
          history: history.concat([{squares: squares}]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext
        });
      }
    }
  };
  jumpTo(i){
    this.setState({

      stepNumber: i,
      xIsNext: (i% 2) == 0
    })
  }
  render(){
    var history = this.state.history;
    var currentSquare = history[this.state.stepNumber].squares;
    const squares = currentSquare.slice();
    var winner = calculateWinner(squares);
    const moves = history.map((step,move)=>{
      
      var desc = move ? "Go to step #" + move: "Go to start game";
      return(
        <li key={move}>
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return(
      <div className='game'>
        <div className='game-board'>
          <Board 
            value= {currentSquare}
            clickFunc = {(i)=>{this.clickFunc(i)}}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  };
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
export default App;
