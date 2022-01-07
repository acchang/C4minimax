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
var availableSpots
var playerOneTurn = true
var itsAOnePlayerGame = true
var isThereAWinner = false

function onePlayerSimpleOrAdvanced(){
    simpleOrAdvanced = prompt('Simple(1) or Advanced(2)')
    if (simpleOrAdvanced == 1) {
        play1PGame()
    }
    else if (simpleOrAdvanced == 2) {
        playAdvanced1PGame()
    }
    else {alert("No")
        isThereAWinner = true
        return
        }
};

function oneOrTwoPlayerGame(){
    typeOfGame = prompt('One or Two Player')
    if (typeOfGame == "1"){
        itsAOnePlayerGame = true
        onePlayerPickSides()
        onePlayerSimpleOrAdvanced()
        }
    else if (typeOfGame == "2"){
        itsAOnePlayerGame = false
        onePlayerPickSides()
        play2PGame()
        }
    else {alert("No")
        isThereAWinner = true
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

function playAdvanced1PGame() {
    while (isThereAWinner == false) {
        playerSelects1P()
        // advancedPlayerSelects1P()
        placeToken()
    }
};

function play1PGame() {
    while (isThereAWinner == false) {
        playerSelects1P()
        placeToken()
    }
};

function play2PGame() {
    while (isThereAWinner == false) {
        playerSelects2P()
        placeToken()
    }
};

function swapTurns() {
    playerOneTurn = !playerOneTurn
};

// GAMEPLAY

function playerSelects2P() {
    findAvailableSpots()
    console.log(availableSpots)
    columnPick = prompt(whosPlaying() +  ', choose which column 1-7')
    if (availableSpots.includes(parseInt(columnPick))) {console.log(columnPick)}
    else {
        alert("column full")
        playerSelects2P()}
};

// if there is a string in row[0], that column is no longer available.
function findAvailableSpots() {
    availableSpots = gameboard[0].filter(x => Number.isInteger(x) == true)
};

function playerSelects1P() {
    findAvailableSpots()
    console.log(availableSpots)
    if (whosPlaying() == playerTwo) {
        columnPick = availableSpots[Math.floor(Math.ceil() * availableSpots.length)]}
    else playerSelects2P();    
};

// starts from the bottom row and places token in chosen spot when there it is a number (unoccupied)
function placeToken() {
    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][columnPick-1])) {
            currentIndex = (columnPick -1)
            currentRow = i
            alert(whosPlaying() + " choice is " + (gameboard[currentRow][currentIndex]))
            gameboard[i].splice((columnPick -1), 1, whosPlaying())
            horizontalCheck()
            verticalCheck()
            downrightCheck()
            uprightCheck()
            swapTurns()
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
