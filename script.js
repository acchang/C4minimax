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
            horizontalCheck()
            verticalCheck()
            downrightCheck()
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
    while (isThereAWinner == false) {
        playRound()
    }
    console.log(gameboard)
};

function findFour(w,x,y,z) {
    // Checks first cell against player and all cells match
    return ((w == checkClass()) && (w === x) && (w === y) && (w === z));
};

function downrightCheck() {
    for (r=0; r<3; r++) {
        for (c=0; c<4; c++){
            if (findFour(gameboard[r][c], gameboard[r+1][c+1], gameboard[r+2][c+2], gameboard[r+3][c+3])) {
                console.log("win")
                isThereAWinner = true
                console.log(gameboard[r][c], gameboard[r+1][c+1], gameboard[r+2][c+2], gameboard[r+3][c+3])
                return
            }
        }
    }
};

function verticalCheck() {
    for (r=5; r>2; r--) {
        for (c=0; c<7; c++){
            if (findFour(gameboard[r][c], gameboard[r-1][c], gameboard[r-2][c], gameboard[r-3][c])) {
                console.log("win")
                isThereAWinner = true
                console.log(gameboard[r][c], gameboard[r-1][c], gameboard[r-2][c], gameboard[r-3][c])
                return
            }
        }
    }
};

function horizontalCheck() {
    for (r=0; r<6; r++) {
        for (c=0; c<4; c++){
            if (findFour(gameboard[r][c], gameboard[r][c+1], gameboard[r][c+2], gameboard[r][c+3])) {
                console.log("win")
                isThereAWinner = true
                return
            }
        }
    }
};


// the play continues after a win because of the beginGame loop
// I need to set a while loop for it to close when win declared


pickSides();
beginGame();


