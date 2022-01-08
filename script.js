let gameboard = [
                 [1,2,3,4,5,6,7],
                 [8,9,10,11,12,13,14],
                 [15,16,17,18,19,20,21],
                 [22,23,24,25,26,27,28],
                 [29,30,31,32,33,34,35],
                 [36,37,38,39,40,41,42]
                ];

let playerOne
let playerTwo
let columnPick
let currentIndex
let currentRow
let availableSpots
let playerOneTurn = true
let itsAOnePlayerGame = true
let isThereAWinner = false

//Draw Board -- this should be the first thing
//repeat this each time there is a change
//in html build another box above, with a slider, interpret the slide into a column number
//then maybe a radio button for the other info


let mainDiv = document.createElement("div");
mainDiv.id = 'mainDiv';
document.body.append(mainDiv);

let mainTable = document.createElement("table");
mainTable.id = 'mainTable'
mainDiv.append(mainTable)


function drawBoard() {
    for (i=0; i<gameboard.length; i++){
            let row = document.createElement("tr")
            mainTable.append(row)

                for (j=0; j<gameboard[i].length; j++){
                    let cell = document.createElement("td")
                    cell.innerHTML = gameboard[i][j]
                    cell.setAttribute('class', gameboard[i][j])
                    row.append(cell)
            }
        }
};

function clearMainTable() {
    document.body.innerHTML = ""
};

// Begin Game

function oneOrTwoPlayerGame(){
    drawBoard()
    typeOfGame = prompt('One or Two Player')
    if (typeOfGame == "1"){
        itsAOnePlayerGame = true
        onePlayerPickSides()
        onePlayerSimpleOrAdvanced()
        }
    else if (typeOfGame == "2"){
        itsAOnePlayerGame = false
        twoPlayerPickSides()
        play2PGame()
        }
    else {alert("No")
        isThereAWinner = true
        return
        }
};

function onePlayerPickSides(){
    playerOne = prompt('Your name')
    playerTwo = 'Computer'
};

function twoPlayerPickSides() {
    playerOne = prompt('Player One name')
    playerTwo = prompt('Player Two name')
};

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

function whosPlaying() {
    if(playerOneTurn) {
    return playerOne
    } else {
    return playerTwo
    }
};

function play1PGame() {
    while (isThereAWinner == false) {
        playerSelects1P()
        placeToken()
    }
};

function playAdvanced1PGame() {
    while (isThereAWinner == false) {
        playerSelects1P()
        // advancedPlayerSelects1P()
        placeToken()
    }
};

function play2PGame() {
    while (isThereAWinner == false) {
        playerSelects2P()
        placeToken()
        drawBoard()
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
// a forloop evaluates a section of the matrix, moving through it and seeing if the 3 ahead match.
// it stops before going out of bounds

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
