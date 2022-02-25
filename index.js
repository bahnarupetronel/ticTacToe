let currentPlayer;
let visited = {}, table = {};
//visited[i] retains the player from a position i, while table will get the value of the cells with querySelectorAll 

let score = {
    'X': 0,
    'O': 0,
    'Tie': 0
}

function resetScore(){
    score['X'] = 0; //X won
    score['O'] = 0; //O won
    score['Tie'] = 0; //Tie
}

function getTable(){ 
    let table1 = document.querySelectorAll("td");
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
    window.location.href = "index.html";
    resetScore();
    initTable(table, visited); 
}

function playAgain() {  
    initTable(table, visited);
    currentPlayer = document.getElementById('startWith').value;
    document.getElementById('displayPlayersTurn').innerHTML = currentPlayer + "'s turn";
}

//updates the bottom form with who is next to move
function showNextPlayer() {
    table = getTable();
    let nextPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    document.getElementById('displayPlayersTurn').innerHTML = nextPlayer + "'s turn";
}

//First page buttons
function easyMode() {
    resetScore();
    initTable(table, visited);
    localStorage.setItem("gameMode", "Easy game vs PC");
    window.location.href = "index2.html";
}
   
function hardMode() {
    resetScore();
    initTable(table, visited);
    localStorage.setItem("gameMode", "Hard game vs PC");
    window.location.href = "index2.html";
}

function PvP() {
    resetScore();
    initTable(table, visited);
    localStorage.setItem("gameMode", "PVP game");
    window.location.href = "index2.html";
}

//checks if every cell is occupied and if we have a Tie, it returns true if we have no moves available
// It returns false if there are moves left.
function allOccupied() {
    let nrVisited = 0;
    for(let index = 0; index < 9; index++){
        if(visited[index] !== '')
            nrVisited++;
    }
    return nrVisited === 9;
}

//updates the table so no move is available after we have a winner
function visitAll() {
    for(let i = 0; i < 9; i++)
        if(visited[i] === '')
            visited[i] = currentPlayer;
}

//updates the score
function printScore(score) {
    document.getElementById('scoreX').innerHTML = "X " + score['X'];
    document.getElementById('scoreO').innerHTML = "O " + score['O'];
    document.getElementById('scoreTie').innerHTML = "Tie " + score['Tie'];
}

//displays the winner and calls the function to update the score
function showWinner() {
    score[currentPlayer]++;
    visitAll();
    printScore(score);
    document.getElementById('displayPlayersTurn').innerHTML = currentPlayer + " won!";
    document.getElementById('playAgain').innerHTML = "Play again!";
}

//returns true if we have a winner, false if we don t have a winner
function checkWinner() {
    for(let i = 0; i < 9; i++){
        //checking for rows for X or O victory.
        if(i == 0 || i == 3 || i == 6)
            if(visited[i] !== '' && visited[i] == visited[i + 1] && visited[i] == visited[i + 2]){    
                showWinner();
                return true;
            }
        //checking for columns for X or O victory.    
        if(i == 0 || i == 1 || i == 2)
            if(visited[i] != '' && visited[i] == visited[i + 3] && visited[i] == visited[i + 6]){
                showWinner();
                return true;
            }           
    }
    //checking for diagonals for X or O victory.
    if(visited[0] != '' && visited[0] == visited[4] && visited[0] == visited[8]){
        showWinner();
        return true;
    }
    if(visited[2] != '' && visited[2] == visited[4] && visited[2] == visited[6]){
        showWinner();
        return true;
    }
    if(allOccupied() == true){
        document.getElementById('displayPlayersTurn').innerHTML = "Tie";
        score['Tie']++;
        printScore(score);
        return true;
    }
    return false;
}

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//returns a random move available for PC
function easyGameMove() {
    let index, findFreePosition = false;
    while(findFreePosition === false)
    {
        index = generateRandomIntegerInRange(0, 8);
        if(visited[index] === '')
            findFreePosition = true;
    }
   return index;
}

//find the next optimal move for a player
function evaluate(visited){
	
	for(let i = 0; i < 9; i++){
        // Checking for Rows for X or O victory.
		if(i == 0 || i == 3 || i == 6)
            if(visited[i] !== '' && visited[i] == visited[i + 1] && visited[i] == visited[i + 2]){    
                if (visited[i] === currentPlayer)
			        return +10;
	        	return -10;
            }
        //checking for columns for X or O victory. 
        if(i == 0 || i == 1 || i == 2)
            if(visited[i] !== '' && visited[i] == visited[i + 3] && visited[i] == visited[i + 6]){
                if (visited[i] === currentPlayer)
			        return +10;
	        	return -10;
            }           
	}
    
	// Checking for Diagonals for X or O victory.
    if(visited[0] !== '' && visited[0] == visited[4] && visited[0] == visited[8]){
        if (visited[0] === currentPlayer)
		    return +10;
	    return -10;
    }
    if(visited[2] !== '' && visited[2] == visited[4] && visited[2] == visited[6]){
        if (visited[2] === currentPlayer)
			return +10;
	    return -10;
    }

	// Else if none of them have won then return 0
	return 0;
}

// This is the minimax function. It considers all the possible ways
// the game can go and returns the value of the board
function minimax(visited, depth, isMax)
{
	let score = evaluate(visited);
	// If Maximizer has won the game return his/her evaluated score
	if (score == 10)
		return score;

	// If Minimizer has won the game return his/her evaluated score
	if (score == -10)
		return score;

	// If there are no more moves and no winner then it is a tie
	if (allOccupied() == true)
	    return 0;
    if (isMax){
        let best = -1000;
        // Traverse all cells
        for(let index = 0; index < 9; index++) {
            // Check if cell is empty
            if (visited[index] === ''){
                // Make the move
                visited[index] = currentPlayer;
                // Call minimax recursively and choose the maximum value
                best = Math.max(best, minimax(visited, depth + 1, !isMax));
                // Undo the move
                visited[index] = '';
            }
        }
        return best;
    }
    else{
        let best = 1000;
        let opponent = currentPlayer === 'X' ? 'O' : 'X';
        // Traverse all cells
        for(let index = 0; index < 9; index++){     
            // Check if cell is empty
            if (visited[index] === ''){      
                // Make the move
                visited[index] = opponent;
                // Call minimax recursively and choose the minimum value
                best = Math.min(best, minimax(visited, depth + 1, !isMax));
                // Undo the move
                visited[index] = '';
            }
        }
        return best;
    }
}

// This will return the best possible move for the PC
function hardGameMove(){
	let bestVal = -1000;
	let bestMove = -1;

	// Traverse all cells, evaluate minimax function for all empty
	// cells. And return the cell with optimal value.
	for(let index = 0; index < 9; index++){
		// Check if cell is empty
		if (visited[index] === ''){
			// Make the move
			visited[index] = currentPlayer;

			// compute evaluation function for this move.
			let moveVal = minimax(visited, 0, false);

			// Undo the move
			visited[index] = '';

			// If the value of the current move is more than the best value, then update best
			if (moveVal > bestVal){
				bestMove = index;
				bestVal = moveVal;
			}
		}
	}
	return bestMove;
}

//makes next move for PC
function makeNextMove() {
    let index;
    if(JSON.stringify(localStorage.getItem("gameMode")) === JSON.stringify("Hard game vs PC"))
        index = hardGameMove();
    else index = easyGameMove();
    let grid = document.getElementById('grid-item' + index);
    grid.innerHTML = currentPlayer;
    visited[index] = currentPlayer;
    if (checkWinner(currentPlayer))
        return;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

//makes the player move, if its against PC, it will call the function to make their move afterwards
function printPlayer(value) { 
    if(visited[value] === '') {
        if(JSON.stringify(localStorage.getItem("gameMode")) === JSON.stringify("PVP game"))
            showNextPlayer();
        let grid = document.getElementById('grid-item' + value);
        grid.innerHTML = currentPlayer;
        visited[value] = currentPlayer;
        if (checkWinner() == false){
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if(JSON.stringify(localStorage.getItem("gameMode")) !== JSON.stringify("PVP game")){
                //makeNextMove returns true if PC won
                makeNextMove();
            }
        }
    }  
}
