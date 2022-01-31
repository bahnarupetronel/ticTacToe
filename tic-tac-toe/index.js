let currentPlayer, gameMode, numberOfMatches;
let visited = {}, table = {};

let score = {
    'X': 0,
    'O': 0,
    'Tie': 0
}

function resetScore(){
    score['X'] = 0; //X won
    score['O'] = 0; //O won
    score['Tie'] = 0; //Tie
    gameMode = '';
}

function getTable() {
    let table1 = document.querySelectorAll('.grid-item');
    table = Array.from(table1);    
    return table;
}

function initTable(table, visited) {
    table = getTable(); 
    for(let index = 0; index < table.length; index++){
        table[index].innerText = '';
        visited[index] = '';
    }
}

function startOver() {
    window.location.href = "index1.html";
    resetScore();
    initTable(table, visited); 
}

function playAgain() {  
    initTable(table, visited);
    currentPlayer = document.getElementById('startWith').value;
    document.getElementById('page2').innerHTML = currentPlayer + "'s turn";
}

function updateTable() {
    table = getTable();
    let nextPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    document.getElementById('page2').innerHTML = nextPlayer + "'s turn";
}

function easyMode() {
    resetScore();
    initTable();
    gameMode = "Easy game vs PC";
    currentPlayer = 'X';
    window.location.href = "index2.html";
}

function hardMode() {
    resetScore();
    initTable();
    gameMode = "Hard game vs PC";
    currentPlayer = 'X';
    window.location.href = "index2.html";
}

function PvP() {
    resetScore();
    initTable();
    gameMode = "Pvp game";
    currentPlayer = 'X';
    window.location.href = "index2.html";
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

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easyGame(currentPlayer) {
    let index, findFreePosition = false;
    while(findFreePosition === true)
    {
        index = generateRandomIntegerInRange(0, 8);
        if(visited[index] === '')
            findFreePosition = true;
    }

    updateTable();
    let grid = document.getElementById('grid-item' + index);
    grid.innerHTML = currentPlayer;
    visited[value] = currentPlayer;
    checkWinner(currentPlayer);

    if(currentPlayer == 'X')
            currentPlayer = 'O';
    else currentPlayer = 'X';
}

function hardGame(currentPlayer) {
    let index, findFreePosition = false;
    while(findFreePosition === true)
    {
        index = generateRandomIntegerInRange(0, 8);
        if(visited[index] === '')
            findFreePosition = true;
    }

    updateTable();
    let grid = document.getElementById('grid-item' + index);
    grid.innerHTML = currentPlayer;
    visited[value] = currentPlayer;
    checkWinner(currentPlayer);

    if(currentPlayer == 'X')
            currentPlayer = 'O';
    else currentPlayer = 'X';
}

function printPlayer(value) { 
    if(visited[value] === '') {
        updateTable();
        let grid = document.getElementById('grid-item' + value);
        grid.innerHTML = currentPlayer;
        visited[value] = currentPlayer;
        checkWinner(currentPlayer);

        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';

        if(gameMode === "Easy game vs PC")
            easyGame(currentPlayer);
        else if(gameMode === "Hard game vs PC")
            hardGame(currentPlayer);
    }  
}



