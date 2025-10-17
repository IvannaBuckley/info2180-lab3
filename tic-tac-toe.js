// tic-tac-toe.js
window.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('#board div');
  const status = document.getElementById('status');
  const newGameBtn = document.querySelector('.btn');
  let currentPlayer = 'X';
  let boardState = Array(9).fill('');

  // --- Exercise 1: Setup board classes ---
  squares.forEach(square => {
    square.classList.add('square');

    // --- Exercise 3: Hover effect ---
    square.addEventListener('mouseenter', () => {
      if (square.textContent === '') square.classList.add('hover');
    });
    square.addEventListener('mouseleave', () => {
      square.classList.remove('hover');
    });

    // --- Exercise 2: Click to add X or O ---
    square.addEventListener('click', () => {
      const index = Array.from(squares).indexOf(square);

      // --- Exercise 6: Disallow cheating ---
      if (square.textContent !== '' || checkWinner()) return;

      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);
      boardState[index] = currentPlayer;

      // --- Exercise 4: Check for winner ---
      if (checkWinner()) {
        status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
        status.classList.add('you-won');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    });
  });

  // --- Exercise 5: Restart game ---
  newGameBtn.addEventListener('click', () => {
    boardState.fill('');
    currentPlayer = 'X';
    status.textContent = 'Move your mouse over a square and click to play an X or an O.';
    status.classList.remove('you-won');
    squares.forEach(square => {
      square.textContent = '';
      square.classList.remove('X', 'O', 'hover');
    });
  });

  // Helper function: Check for winner
  function checkWinner() {
    const combos = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];

    return combos.some(([a,b,c]) => {
      return boardState[a] &&
             boardState[a] === boardState[b] &&
             boardState[a] === boardState[c];
    });
  }
});
