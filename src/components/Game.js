import React, { useState } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  const handleClick = (i) => {
    const historyUntilNow = history.slice(0, stepNumber + 1);
    const current = historyUntilNow[historyUntilNow.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;

    setHistory(historyUntilNow.concat([{ squares, location: { row, col } }]));
    setStepNumber(historyUntilNow.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  };

  const sortedHistory = ascending ? history : history.slice().reverse();

  const moves = sortedHistory.map((step, move) => {
    const actualMove = ascending ? move : history.length - 1 - move;
    const desc = actualMove
      ? `Go to move #${actualMove} (${step.location?.row}, ${step.location?.col})`
      : "Go to game start";

    return (
      <li key={actualMove}>
        {actualMove === stepNumber ? (
          <span>You are at move #{actualMove}</span>
        ) : (
          <button onClick={() => jumpTo(actualMove)}>{desc}</button>
        )}
      </li>
    );
  });

  const toggleSort = () => setAscending(!ascending);

  let status;
  if (winner) {
    status = `${winner} wins!`; // Hiển thị người thắng
  } else if (stepNumber === 9) {
    status = "It's a draw!"; // Hiển thị khi hòa
  } else {
    status = `Next: ${xIsNext ? "X" : "O"}`; // Hiển thị lượt chơi tiếp theo
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winningSquares={winnerInfo?.line}
        />
        <div class="status">{status}</div>
      </div>
      <div className="game-info">
        <button onClick={toggleSort}>
          {ascending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;

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
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
