let currentPlayer, easyGame, hardGame, pvpGame, numberOfMatches;
let visited = {}, table = {};

let score = {
    'X': 0,
    'O': 0,
    'Tie': 0
}

function resetScore(score){
    score['X'] = 0; //X won
    score['O'] = 0; //O won
    score['Tie'] = 0; //Tie
}

function getValues() {
    let table1 = document.querySelectorAll('.grid-item');
    table = Array.from(table1);    
    return table;
}

function initValues(table, visited) {
    table = getValues(); 
    for(let index = 0; index < table.length; index++){
        table[index].innerText = '';
        visited[index] = 0;
    }
}

function startOver() {
    resetTable(score);
    initValues(table, visited);
    window.location.href = "index1.html";
}

function playAgain() {
    currentPlayer = document.getElementById('startWith').value;
    initValues(table, visited);
    document.getElementById('page2').innerHTML = currentPlayer + "'s turn";
}

function changeTable() {
    table = getValues();
    let nextPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    document.getElementById('page2').innerHTML = nextPlayer + "'s turn";
}

function easyMode() {
    resetScore(score);
    easyGame = true;
    window.location.href = "index2.html";
    currentPlayer = 'X';
    document.getElementById('page2').innerHTML = currentPlayer + "'s turn";
}

function hardMode() {
    resetScore(score);
    hardGame = true;
    window.location.href = "index2.html";
    currentPlayer = 'X';
    document.getElementById('page2').innerHTML = currentPlayer + "'s turn";
}

function PvP() {
    resetScore(score);
    pvpGame = true;
    window.location.href = "index2.html";
    currentPlayer = 'X';
    document.getElementById('page2').innerHTML = currentPlayer + "'s turn";
}

function allVisited() {
    let nrVisited = 0;
    for(let index = 0; index < 9; index++){
        if(visited[index] != '')
            nrVisited++;
    }
    if(nrVisited == 9)
        return true;
    return false;
}

function visitAll() {
    for(let i = 0; i < 9; i++)
        if(visited[i] === '')
            visited[i] = currentPlayer;
}

function printScore(score) {
    document.getElementById('scoreX').innerHTML = "X " + score['X'];
    document.getElementById('scoreO').innerHTML = "O " + score['O'];
    document.getElementById('scoreTie').innerHTML = "Tie " + score['Tie'];
}

function checkWinner(currentPlayer) {
    for(let i = 0; i < 9; i++){
        if(i == 0 || i == 3 || i == 6)
            if(visited[i] != '' && visited[i] == visited[i + 1] && visited[i] == visited[i + 2]){
                score[currentPlayer]++;
                visitAll();
                printScore(score);
                document.getElementById('page2').innerHTML = currentPlayer + " won!";
                return;
            }
             
        if(i == 0 || i == 1 || i == 2)
            if(visited[i] != '' && visited[i] == visited[i + 3] && visited[i] == visited[i + 6]){
                score[currentPlayer]++;
                document.getElementById('page2').innerHTML = currentPlayer + " won!";
                visitAll();
                printScore(score);
                return;
            }           
    }

    if(visited[0] != '' && visited[0] == visited[4] && visited[0] == visited[8]){
        score[currentPlayer]++;
        document.getElementById('page2').innerHTML = currentPlayer + " won!";
        visitAll();
        printScore(score);
        return;
    }
    if(visited[2] != '' && visited[2] == visited[4] && visited[2] == visited[6]){
        score[currentPlayer]++;
        document.getElementById('page2').innerHTML = currentPlayer + " won!";
        visitAll();
        printScore(score);
        return;
    }

    if(allVisited() == true){
        document.getElementById('page2').innerHTML = "Tie";
        score['Tie']++;
        printScore(score);
        return;
    }
}

function printPlayer(value) {
    changeTable();
    if(visited[value] === '') {
        let grid = document.getElementById('grid-item' + value);
        grid.innerHTML = currentPlayer;
        visited[value] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}



