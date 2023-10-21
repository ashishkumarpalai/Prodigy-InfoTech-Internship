
const board = document.getElementById("board");
const cells = [];
const message = document.getElementById("message");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Create the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.style.cursor = "not-allowed";

        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (isBoardFull()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin(player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== "");
}

function endGame(isDraw) {
    gameActive = false;
    if (isDraw) {
        Swal.fire({
            title: "It's a draw!",
            icon: "info",
            confirmButtonText: "Restart"
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            }
        });
    } else {
        Swal.fire({
            title: `${currentPlayer} wins!`,
            icon: "success",
            confirmButtonText: "Play Again"
        }).then((result) => {
            if (result.isConfirmed) {
                resetGame();
            }
        });
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
        cell.innerText = "";
        cell.style.cursor = "pointer";
    });
    message.innerText = "";
}
// Reset the game when the user closes the Swal pop-up
Swal.fire({
    title: 'Welcome to Tic-Tac-Toe',
    text: 'Click on a cell to make your move!',
    confirmButtonText: "Start Game",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false
}).then((result) => {
    if (result.isConfirmed) {
        resetGame();
    }
});
