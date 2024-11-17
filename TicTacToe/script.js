const cells = document.querySelectorAll(".cell");
const ganadorP = document.querySelector(".mostrarGanador");
const btnReiniciar = document.querySelector(".btnReiniciar");

let cont = 0;
let hayGanador = false;
let grid = Array.from({ length: 9 }, (_, index) => index);

document.querySelector(".tic-tac-toe-grid").addEventListener("click", function(e) {
    const cell = e.target;

    if (hayGanador || cell.textContent !== "") return;

    if (cell.classList.contains("cell") && cell.textContent === "") {
        cont++;
        if (cont % 2 === 0) {
            cell.textContent = "0";
            grid[parseInt(cell.classList[1])] = "0";
        } else {
            cell.textContent = "X";
            grid[parseInt(cell.classList[1])] = "X";
        }
        checarGanador();
    }
});

btnReiniciar.addEventListener("click", function() {
    cont = 0;
    hayGanador = false;
    ganadorP.textContent = "The winner is: ";
    grid = Array.from({ length: 9 }, (_, index) => index);
    reiniciarCeldas();
});

function reiniciarCeldas() {
    cells.forEach(element => {
        element.textContent = "";
    });
}

function checarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winner = null;
    for (let combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (grid[a] === grid[b] && grid[b] === grid[c]) {
            winner = grid[a];
            break;
        }
    }

    if (winner) {
        hayGanador = true;
        ganadorP.textContent = "The winner is: " + winner;
    } else if (checarGridCompleto()) {
        hayGanador = true; 
        ganadorP.textContent = "It's a tie!";
    }
}

function checarGridCompleto() {
    return grid.every(pos => typeof pos !== 'number');
}
