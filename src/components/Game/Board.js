import Square from "./Square";
import React, {  } from 'react';

class Board extends React.Component {
  render() {
    const board = [[0,1,2],[3,4,5],[6,7,8]];
    return (
      <div>
        { board.map((j,row)=> 
          <div className="board-row" key={j}>
            {j.map((i)=>
              <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
            )}
          </div>
        )}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}

export default Board;