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
var isThereAWinner = false

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
            console.log(gameboard)
            checkHorizontalWin()
            checkVerticalWin()
            // checkDiagonalFromTopWin()
            // checkDiagonalFromBottomWin()
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
    //while isThereAWinner=False
    for (i=0; i<15; i++){
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
        isThereAWinner = true
        console.log(isThereAWinner)
        return}
};

function checkVerticalWin() {
    if (currentRow > 2){return}
    else if ( 
        gameboard[currentRow+1][currentIndex] == checkClass() && 
        gameboard[currentRow+2][currentIndex] == checkClass() &&
        gameboard[currentRow+3][currentIndex] == checkClass())
        {console.log("win")
        isThereAWinner = true
        return}
};




// I need to check the diagonal conditions for going to an undefined row
// and verify that's why undefined

function checkDiagonalFromTopWin() {
    if (currentRow > 2){return}
    else if (
        (gameboard[currentRow+1][currentIndex+1] == checkClass() && 
        gameboard[currentRow+2][currentIndex+2] == checkClass() &&
        gameboard[currentRow+3][currentIndex+3] == checkClass())
        ||
        (gameboard[currentRow-1][currentIndex-1] == checkClass() && 
        gameboard[currentRow-2][currentIndex-2] == checkClass() &&
        gameboard[currentRow-3][currentIndex-3] == checkClass())
        ||
        (gameboard[currentRow-1][currentIndex-1] == checkClass() && 
        gameboard[currentRow+1][currentIndex+1] == checkClass() &&
        gameboard[currentRow+2][currentIndex+2] == checkClass())
        ||
        (gameboard[currentRow-1][currentIndex-1] == checkClass() && 
        gameboard[currentRow-2][currentIndex-2] == checkClass() &&
        gameboard[currentRow+1][currentIndex+1] == checkClass())
        )
        {console.log("win")
        isThereAWinner=True
        return}
};

function checkDiagonalFromBottomWin() {
    if (
        (gameboard[currentRow-1][currentIndex+1] == checkClass() && 
        gameboard[currentRow-2][currentIndex+2] == checkClass() &&
        gameboard[currentRow-3][currentIndex+3] == checkClass())
        ||
        (gameboard[currentRow+1][currentIndex-1] == checkClass() && 
        gameboard[currentRow+2][currentIndex-2] == checkClass() &&
        gameboard[currentRow+3][currentIndex-3] == checkClass())
        ||
        (gameboard[currentRow-1][currentIndex+1] == checkClass() && 
        gameboard[currentRow-2][currentIndex+2] == checkClass() &&
        gameboard[currentRow+1][currentIndex-1] == checkClass())
        ||
        (gameboard[currentRow+1][currentIndex-1] == checkClass() && 
        gameboard[currentRow+2][currentIndex-2] == checkClass() &&
        gameboard[currentRow-1][currentIndex+1] == checkClass())
        )
        {console.log("win")
        isThereAWinner=True
        return}
};




// the play continues after a win because of the beginGame loop
// I need to set a while loop for it to close when win declared



pickSides();
beginGame();


