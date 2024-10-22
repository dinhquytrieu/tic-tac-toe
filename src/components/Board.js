import React from "react";
import Square from "./Square";

function Board({ squares, onClick, winningSquares }) {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={winningSquares && winningSquares.includes(i)}
      />
    );
  };

  const boardSize = 3;
  let board = [];
  for (let row = 0; row < boardSize; row++) {
    let rows = [];
    for (let col = 0; col < boardSize; col++) {
      rows.push(renderSquare(row * boardSize + col));
    }
    board.push(
      <div key={row} className="board-row">
        {rows}
      </div>
    );
  }

  return <div>{board}</div>;
}

export default Board;
