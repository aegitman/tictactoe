import Minimax from "./minimax.js";

var setupGameBtn = document.querySelector('#setupGame');
var statusLbl = document.querySelector('#status');

var ai = new Minimax('O');

function userHitsOnAi(e) {
    console.log("User hits on AI");
    let y = parseInt(e.target.getAttribute('data-col'));
    if (e.target.innerHTML == "O" || e.target.innerHTML == "X") {
        // no override
        return;
    }
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
        cell.classList.remove("cell-win");
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
        values.push({v:cell.innerHTML, c:cell});
    }

    if (values[0].v == player && values[1].v == player && values[2].v == player) { 
        markWin(values[0].c, values[1].c, values[2].c);
        return true;
    }
    if (values[3].v == player && values[4].v == player && values[5].v == player) { 
        markWin(values[3].c, values[4].c, values[5].c);
        return true;
    }
    if (values[6].v == player && values[7].v == player && values[8].v == player) { 
        markWin(values[6].c, values[7].c, values[8].c);
        return true;
    }
    if (values[0].v == player && values[3].v == player && values[6].v == player) {
        markWin(values[0].c, values[3].c, values[6].c);
        return true;
    }
    if (values[1].v == player && values[4].v == player && values[7].v == player) {
        markWin(values[1].c, values[4].c, values[7].c);
        return true;
    }
    if (values[2].v == player && values[5].v == player && values[8].v == player) {
        markWin(values[2].c, values[5].c, values[8].c);
        return true;
    }
    if (values[0].v == player && values[4].v == player && values[8].v == player) {
        markWin(values[0].c, values[4].c, values[8].c);
        return true;
    }
    if (values[2].v == player && values[4].v == player && values[6].v == player) {
        markWin(values[2].c, values[4].c, values[6].c);
        return true;
    }
 }

 function markWin(c1, c2, c3) {
    c1.classList.add("cell-win");
    c2.classList.add("cell-win");
    c3.classList.add("cell-win");
 }

setupGameBtn.addEventListener('click', setupGame);