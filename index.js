import Minimax from "./minimax.js";

var setupGameBtn = document.querySelector('#setupGame');
var statusLbl = document.querySelector('#status');

var ai = new Minimax('O');

function userHitsOnAi(e) {
    console.log("User hits on AI");
    let y = parseInt(e.target.getAttribute('data-col'));
    e.target.innerHTML = "X";

    if (checkIfPlayerWon('X')) {
        clearCellEvents();
        updateScore('X');
        statusLbl.innerHTML = "You won";
        return;
    }
    // check if user won
    aiHitsUser(y);
}

function aiHitsUser(y) {
    console.log("AI hits on user");
    var cells = document.getElementsByClassName("cell");
    let bestAiShot = ai.findNextHit(y);

    for (let cell of cells) {
        if (cell.getAttribute('data-col') == bestAiShot) {
            cell.innerHTML = "O";
        }
    }

    // check if AI won
    if (checkIfPlayerWon('O')) {
        clearCellEvents();
        updateScore('O');
        statusLbl.innerHTML = "AI won";
    }
}


function setupGame() {
    console.log("Setup game");   
    statusLbl.innerHTML = "Ready"; 

    var cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.addEventListener('click', userHitsOnAi, false);
    }

    ai = new Minimax('O');
    var cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.innerHTML = '';
    }    
}

function updateScore(who) {
    var userScore = document.getElementById('userScore');
    var aiScore = document.getElementById('aiScore');
    if (who == 'X') {
        userScore.innerHTML = parseInt(userScore.innerHTML) + 1;
    } else {
        aiScore.innerHTML = parseInt(aiScore.innerHTML) + 1;
    }
}

function clearCellEvents() {
    var cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.replaceWith(cell.cloneNode(true));
    }
}

function checkIfPlayerWon(player) {
    var cells = document.getElementsByClassName("cell");
    let values = [];
    for (let cell of cells) {
        values.push(cell.innerHTML);
    }

    if (values[0] == player && values[1] == player && values[2] == player) { 
        return true;
    }
    if (values[3] == player && values[4] == player && values[5] == player) { 
               return true;
    }
    if (values[6] == player && values[7] == player && values[8] == player) { 
        return true;
    }
    if (values[0] == player && values[3] == player && values[6] == player) {
        return true;
    }
    if (values[1] == player && values[4] == player && values[7] == player) {
        return true;
    }
    if (values[2] == player && values[5] == player && values[8] == player) {
        return true;
    }
    if (values[0] == player && values[4] == player && values[8] == player) {
        return true;
    }
    if (values[2] == player && values[4] == player && values[6] == player) {
        return true;
    }
 }

setupGameBtn.addEventListener('click', setupGame);