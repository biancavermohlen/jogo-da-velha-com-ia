document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset");
    const message = document.getElementById("message");
    const scoreX = document.getElementById("score-x");
    const scoreO = document.getElementById("score-o");

    let currentPlayer = "X";
    let gameBoard = Array(9).fill("");
    let scores = { X: 0, O: 0 };

    // Nomes dos jogadores
    const playerNames = {
        X: "Você",
        O: "IA Supremo"
    };

    // Combinações vencedoras possíveis
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                const winnerSymbol = gameBoard[a]; // "X" ou "O"
                const winnerName = playerNames[winnerSymbol]; // "Você" ou "IA Supremo"
                message.textContent = `${winnerName} venceu!`;
                updateScore(winnerSymbol);
                return true;
            }
        }
        if (!gameBoard.includes("")) {
            message.textContent = "Empate!";
            return true;
        }
        return false;
    }

    function updateScore(player) {
        scores[player]++;
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
    }

    function handleClick(index, cell) {
        if (gameBoard[index] === "" && !message.textContent) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");
            if (!checkWinner()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    setTimeout(makeAIMove, 300);
                }
            }
        }
    }

    function makeAIMove() {
        if (message.textContent) return;
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === "") {
                const cells = board.querySelectorAll(".cell");
                handleClick(i, cells[i]);
                break;
            }
        }
    }

    function resetGame() {
        gameBoard = Array(9).fill("");
        currentPlayer = "X";
        message.textContent = "";
        board.innerHTML = "";
        createBoard();
    }

    function createBoard() {
        gameBoard.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click", () => handleClick(index, cell));
            board.appendChild(cell);
        });
    }

    createBoard();
    resetButton.addEventListener("click", resetGame);
});
