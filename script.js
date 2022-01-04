var gameboard = [
                 [1,2,3,4,5,6,7],
                 [8,9,10,11,12,13,14],
                 [15,16,17,18,19,20,21],
                 [22,23,24,25,26,27,28],
                 [29,30,31,32,33,34,35],
                 [36,37,38,39,40,41,42]
                ];

var playerOne
var playerTwo
var currentIndex
var currentRow
var playerOneTurn = true

function pickSides() {
    playerOne = prompt('Player One chooses')
    playerTwo = prompt('Player Two chooses')
    };

function playRound() {
    const playerEnters = prompt('splice which column 1-7?');
    const columnPick = parseInt(playerEnters);
    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][columnPick-1])) {
            currentIndex = (columnPick -1)
            currentRow = i
            gameboard[i].splice((columnPick -1), 1, checkClass())
            console.log(currentRow, currentIndex)
            checkHorizontalWin()
            swapTurns()
            return}
        }
    };

function swapTurns() {
    playerOneTurn = !playerOneTurn
    };

function checkClass() {
    if(playerOneTurn) {
    return playerOne
    } else {
    return playerTwo
    }
};

function beginGame(){
    for (i=0; i<10; i++){
        playRound()
    }
    console.log(gameboard)
}

function checkHorizontalWin() {
    if (
        (gameboard[currentRow][currentIndex-1] == checkClass() && 
        gameboard[currentRow][currentIndex-2] == checkClass() &&
        gameboard[currentRow][currentIndex-3] == checkClass())
        ||
        (gameboard[currentRow][currentIndex+1] == checkClass() && 
        gameboard[currentRow][currentIndex+2] == checkClass() &&
        gameboard[currentRow][currentIndex+3] == checkClass())
        ||
        (gameboard[currentRow][currentIndex+1] == checkClass() && 
        gameboard[currentRow][currentIndex-1] == checkClass() &&
        gameboard[currentRow][currentIndex-2] == checkClass())
        ||
        (gameboard[currentRow][currentIndex+1] == checkClass() && 
        gameboard[currentRow][currentIndex+2] == checkClass() &&
        gameboard[currentRow][currentIndex-1] == checkClass())
        )
        {console.log("win")
        return}
};

function checkVerticalWin() {
    if (
        (gameboard[currentRow+1][currentIndex] == checkClass() && 
        gameboard[currentRow+2][currentIndex] == checkClass() &&
        gameboard[currentRow+3][currentIndex] == checkClass())
        )
        {console.log("win")
        return}
};


// the play continues after a win because of the beginGame loop
// I need to set a while loop for it to close when win declared



pickSides();
beginGame();


