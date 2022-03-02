import React from 'react';
// import ReactDOM from 'react-dom';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber:0,
    };
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //複製一個新陣列

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext:!this.state.xIsNext,
    }); // 取代原本陣列

  }

  jumpTo(step){
    this.setState({
      stepNumber: step, 
      xIsNext: (step % 2) === 0, //根據返回記錄的不同，player也會更換
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}  onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            {history.map((step, move) => 
                <li key={move}>
                  <button 
                    className={move === this.state.stepNumber?'game-info-button-active':'' } 
                    onClick={() => this.jumpTo(move)}>{move?'Go to move #' + move :'Go to game start'}
                  </button>
                </li>
              )
            }
          </ol>
        </div>
      </div>
    );
  }
}


// history = [
//   // 第一個動作前
//   {squares: [null, null, null,null, null, null,null, null, null,]},
//   // 第一個動作後
//   {squares: [null, null, null,null, 'X', null,null, null, null,]},
//   // 第二個動作後
//   {squares: [null, null, null,null, 'X', null,null, null, 'O',]},
//   // ...
// ]

export default Game;