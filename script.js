var gameboard = [
                 [1,2,3,4,5,6,7],
                 [8,9,10,11,12,13,14],
                 [15,16,17,18,19,20,21],
                 [22,23,24,25,26,27,28],
                 [29,30,31,32,33,34,35],
                 [36,37,38,39,40,41,42]
                ];
// represent this graphically

var playerOne
var playerTwo
var columnPick
var currentIndex
var currentRow
var playerOneTurn = true
var itsAOnePlayerGame = true
var isThereAWinner = false


function oneOrTwoPlayerGame(){
    typeOfGame = prompt('One or Two Player')
    if (typeOfGame == "1"){
        itsAOnePlayerGame = true
        }
    else if (typeOfGame == "2"){
        itsAOnePlayerGame = false
        }
    else {alert("No")
        return
        }
};

function whosPlaying() {
    if(playerOneTurn) {
    return playerOne
    } else {
    return playerTwo
    }
};

function onePlayerPickSides(){
    playerOne = prompt('Who are you?')
    playerTwo = 'Computer'
};

function twoPlayerPickSides() {
    playerOne = prompt('Player One chooses')
    playerTwo = prompt('Player Two chooses')
};

function initializeGame() {
    if (itsAOnePlayerGame == true) {
        onePlayerPickSides()
        play1PGame()}
    else if (itsAOnePlayerGame == false) {
        twoPlayerPickSides()
        play2PGame()}
};

function play1PGame() {
    while (isThereAWinner == false) {
        playerSelectsAIGame()
        placeToken()
    }
};

function play2PGame() {
    while (isThereAWinner == false) {
        playerSelects()
        placeToken()
    }
};

function swapTurns() {
    playerOneTurn = !playerOneTurn
};

// GAMEPLAY

function playerSelects() {
    columnPick = prompt(whosPlaying() +  ', choose which column 1-7')
    // test if row 0 if occupied, if so, say not available.
    // if gameboard[0][columnPick] == interger, alert invalid until
    // if it's not in available spots, ask again
};

function findAvailableSpots() {
    availableSpots = gameboard[0].map(x => (Number.isInteger(x)))
    console.log(availableSpots)
// map is not what I want since map only uses isInterger to evaluate and I get true and falses/
// create a function that says if X is an integer, return integer, then do a forEach
};

function playerSelectsAIGame() {
    if (whosPlaying() == playerTwo) {columnPick = 6}
    // columnPick will be random with const randomElement = array[Math.floor(Math.random() * array.length)];
    else playerSelects();    
};


// starts from the bottom row and places token in chosen spot when there it is a number (unoccupied)
function placeToken() {
    let i;
    for (i = 5; i > -1; i--) 
        {console.log(gameboard[0][columnPick-1])
         if (Number.isInteger(gameboard[0][columnPick-1]))
            {
                {if (Number.isInteger(gameboard[i][columnPick-1])) {
                    currentIndex = (columnPick -1)
                    currentRow = i
                    gameboard[i].splice((columnPick -1), 1, whosPlaying())
                    alert(whosPlaying() + " choice is " + (gameboard[currentRow][currentIndex + 1]))
                    horizontalCheck()
                    verticalCheck()
                    downrightCheck()
                    uprightCheck()
                    swapTurns()
                    return}
                }
             }
        else {(alert("Column Full"))
        // for 2P does not swapTurns()
                return}
        }
};

// WIN CHECKERS
// a for loop evaluates a section of the matrix, moving through it and seeing if the 3 ahead match.

function findFour(w,x,y,z) {
    // Checks first cell against current player and all cells match that player
    return ((w == whosPlaying()) && (w === x) && (w === y) && (w === z));
};

function winDeclared() {
    isThereAWinner = true
    console.log(whosPlaying() + " wins!")
    console.log(gameboard)
};

// upright to check: 1,2 3,4 2,3 3,4 5,4 4,5
function uprightCheck() {
    for (r=5; r>2; r--) {
        for (c=0; c<4; c++){
            if (findFour(gameboard[r][c], gameboard[r-1][c+1], gameboard[r-2][c+2], gameboard[r-3][c+3])) {
                winDeclared()
                return
            }
        }
    }
};

// downright to check 4,3 2,1 3,2 2,1 2,1 1, X
function downrightCheck() {
    for (r=0; r<3; r++) {
        for (c=0; c<4; c++){
            if (findFour(gameboard[r][c], gameboard[r+1][c+1], gameboard[r+2][c+2], gameboard[r+3][c+3])) {
                winDeclared()
                return
            }
        }
    }
};


function verticalCheck() {
    for (r=5; r>2; r--) {
        for (c=0; c<7; c++){
            if (findFour(gameboard[r][c], gameboard[r-1][c], gameboard[r-2][c], gameboard[r-3][c])) {
                winDeclared()
                return
            }
        }
    }
};

function horizontalCheck() {
    for (r=0; r<6; r++) {
        for (c=0; c<4; c++){
            if (findFour(gameboard[r][c], gameboard[r][c+1], gameboard[r][c+2], gameboard[r][c+3])) {
                winDeclared()
                return
            }
        }
    }
};

oneOrTwoPlayerGame()
initializeGame()