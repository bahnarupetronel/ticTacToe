let score = {}, table, currentPlayer, visited = {};

function resetTable(){
    score['X'] = ''; //X won
    score['O'] = ''; //O won
    score['Tie'] = ''; //Tie
    table = {};
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
    resetTable();
    initValues(table, visited);
    window.location.href = "index1.html";
}

function playAgain() {
    currentPlayer = document.getElementById('startWith').value;
    initValues(table, visited);
    console.log(currentPlayer);
}

function changeTable() {
    table = getValues();
}

function easyMode() {
    window.location.href = "index2.html";
    currentPlayer = document.getElementById('startWith').value;
    document.querySelector('#page2 p').innerHTML = currentPlayer + "'s turn";
}

function hardMode() {
    window.location.href = "index2.html";
    currentPlayer = document.getElementById('startWith').value;
    document.querySelector('#page2 p').innerHTML = currentPlayer + "'s turn";
}

function PvP() {
    window.location.href = "index2.html";
    currentPlayer = document.getElementById('startWith').value;
    document.querySelector('#page2 p').innerHTML = currentPlayer + "'s turn";
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

function checkWinner(currentPlayer) {
    for(let i = 0; i < 9; i++){
        if(i == 0 || i == 3 || i == 6)
            if(visited[i] != '' && visited[i] == visited[i + 1] && visited[i] == visited[i + 2]){
                console.log(currentPlayer + " won!");
                score[currentPlayer]++;
                return;
            }
             
        if(i == 0 || i == 1 || i == 2)
            if(visited[i] != '' && visited[i] == visited[i + 3] && visited[i] == visited[i + 6]){
                console.log(currentPlayer + " won!");
                score[currentPlayer]++;
                return;
            }           
    }

    if(visited[0] != '' && visited[0] == visited[4] && visited[0] == visited[8]){
        score[currentPlayer]++;
        console.log(currentPlayer + " won!");
        return;
    }
    if(visited[2] != '' && visited[2] == visited[4] && visited[2] == visited[6]){
        score[currentPlayer]++;
        console.log(currentPlayer + " won!");
        return;
    }

    if(allVisited() == true){
        console.log("Tie");
        score['Tie']++;
        return;
    }
}

function function1() {
    if(visited[0] == '') {
        let grid = document.getElementById('grid-item1');
        grid.innerHTML = currentPlayer;
        visited[0] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function2() {
    if(visited[1] == '') {
        let grid = document.getElementById('grid-item2');
        grid.innerHTML = currentPlayer;
        visited[1] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function3() {
    if(visited[2] == '') {
        let grid = document.getElementById('grid-item3');
        grid.innerHTML = currentPlayer;
        visited[2] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function4() {
    if(visited[3] == '') {
        let grid = document.getElementById('grid-item4');
        grid.innerHTML = currentPlayer;
        visited[3] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function5() {
    if(visited[4] == '') {
        let grid = document.getElementById('grid-item5');
        grid.innerHTML = currentPlayer;
        visited[4] = currentPlayer;
        checkWinner(currentPlayer);      
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function6() {
    if(visited[5] == '') {
        let grid = document.getElementById('grid-item6');
        grid.innerHTML = currentPlayer;
        visited[5] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function7() {
    if(visited[6] == '') {
        let grid = document.getElementById('grid-item7');
        grid.innerHTML = currentPlayer;
        visited[6] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function8() {
    if(visited[7] == '') {
        let grid = document.getElementById('grid-item8');
        grid.innerHTML = currentPlayer;
        visited[7] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
}

function function9() {
    if(visited[8] == '') {
        let grid = document.getElementById('grid-item9');
        grid.innerHTML = currentPlayer;
        visited[8] = currentPlayer;
        checkWinner(currentPlayer);
        if(currentPlayer == 'X')
            currentPlayer = 'O';
        else currentPlayer = 'X';
    }  
  
}