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
var playerEnters
var currentIndex
var currentRow
var playerOneTurn = true
var isThereAWinner = false

function twoPlayerPickSides() {
    playerOne = prompt('Player One chooses')
    playerTwo = prompt('Player Two chooses')
};
// need to give an AI option

// function 1Por2P(){
//     prompt 1 or 2?
//     if 2P go to picksides() and begin2PlayerGame();
//     if 1P write beginOnePlayerGame with playerSelects, placeToken, AISelects, placetoken
// }


function whosPlaying() {
    if(playerOneTurn) {
    return playerOne
    } else {
    return playerTwo
    }
};
    
function beginTwoPlayerGame(){
    while (isThereAWinner == false) {
        playerSelects()
        placeToken()
    }
};

function swapTurns() {
    playerOneTurn = !playerOneTurn
};


// GAMEPLAY

// function playRound() {
//     playerSelects()
//     placeToken()
// }

function playerSelects() {
    playerEnters = prompt(whosPlaying() +  ', choose which column 1-7');
    columnPick = parseInt(playerEnters);
}

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
                    alert("your choice is " + (gameboard[currentRow][currentIndex + 1]))
                    horizontalCheck()
                    verticalCheck()
                    downrightCheck()
                    uprightCheck()
                    swapTurns()
                    return}
                }
             }
        else {(alert("Column Full"))
                return}
        }
};



// WIN CHECKERS

function findFour(w,x,y,z) {
    // Checks first cell against player and all cells match
    return ((w == whosPlaying()) && (w === x) && (w === y) && (w === z));
};

function winDeclared() {
    isThereAWinner = true
    console.log(whosPlaying() + " wins!")
    console.log(gameboard)
}

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

twoPlayerPickSides()
beginTwoPlayerGame();