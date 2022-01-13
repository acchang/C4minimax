// Try to do these
// (3) limit if trying to click on occupied column
// (4) fix the display window to swap player

// (2) change so one player, random select spot (basic AI)

// ASK
// (5) why is the order of finish wrong
// (6) I can't blank selector table to lock everyone out if there is a win 



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
let indexPick
let availableSpots
let gameType
let playerOneTurn = true
let itsAOnePlayerGame = true
let isThereAWinner = false

let mainDiv = document.createElement("div");
mainDiv.setAttribute('class', 'mainDiv')
document.body.append(mainDiv);

let selectorHolder = document.createElement("div") 
selectorHolder.setAttribute('class', 'selectorHolder')
mainDiv.append(selectorHolder)

let selectorTable = document.createElement("table") 
selectorTable.setAttribute('class', 'selectorTable')
selectorHolder.append(selectorTable)

function drawSelector() {  
    let selectorRow = document.createElement("tr") 
    selectorRow.setAttribute('class', 'selectorRow')
    selectorTable.append(selectorRow)

    for (i=0; i<7; i++){
        let selectorCell = document.createElement("td") 
        selectorCell.setAttribute('class', 'selectorCell')

        let innerSelectorCell = document.createElement("div") 
        innerSelectorCell.setAttribute('class', 'innerSelectorCell')
        innerSelectorCell.setAttribute('id', [i])
        selectorCell.append(innerSelectorCell)
        
        innerSelectorCell.addEventListener("mouseover", function(event) {
            if (playerOneTurn == true) {
            innerSelectorCell.classList.add('yellowBG')}
            else {innerSelectorCell.classList.add('redBG')
            }
        })

        innerSelectorCell.addEventListener("mouseout", function(event) {
            if (playerOneTurn == true) {
            innerSelectorCell.classList.remove('yellowBG')}
            else {innerSelectorCell.classList.remove('redBG')
            }
        })

        // if condition here depending on win condition and column opening
        // if Game is not won, this is clickable
        // if column is full, don't pass on indexPick, don't swap turn
        // if turn swapped and a 1P game then let computer play and return control 

        innerSelectorCell.onclick = function(){

                    indexPick = parseInt(this.id)
                    console.log(indexPick)
                    claimSpot()

                }
 
        selectorRow.append(selectorCell)
        }        
};


drawSelector()

// Draw Main Gameboard

let mainTable = document.createElement("table");
mainTable.setAttribute('class', 'mainTable')
mainDiv.append(mainTable)

function drawBoard() {
    for (i=0; i<gameboard.length; i++){
            let row = document.createElement("tr")
            mainTable.append(row)

                for (j=0; j<gameboard[i].length; j++){
                    let outerCell = document.createElement('td')
                    outerCell.setAttribute('class', 'outerCell')
                    row.append(outerCell)
                    let innerCell = document.createElement('div')
                    innerCell.setAttribute('class', 'innerCell')
                    innerCell.classList.add(gameboard[i][j])
                    innerCell.setAttribute('innerHTML', gameboard[i][j])
                    outerCell.append(innerCell)
                }   
            }
};

drawBoard()

function validateRadio() {
    let ele = document.getElementsByName('gameType');    
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
                gameType = (ele[i].value)
                beginGame()
                }
            }
};

function beginGame() {
    if (gameType == "1PEasy"){
        itsAOnePlayerGame = true
        resetBoard()
        onePlayerPickSides()
        play1PGame()
        }
    else if (gameType == "1PHard"){
        itsAOnePlayerGame = true
        resetBoard()
        onePlayerPickSides()
        play1PGame()
        }
    else if (gameType == "2P"){
        itsAOnePlayerGame = false
        resetBoard()
        twoPlayerPickSides()
        play2PGame()
        }
};

function resetBoard() {
    playerOneTurn = true
    isThereAWinner = false
    gameboard = [
        [1,2,3,4,5,6,7],
        [8,9,10,11,12,13,14],
        [15,16,17,18,19,20,21],
        [22,23,24,25,26,27,28],
        [29,30,31,32,33,34,35],
        [36,37,38,39,40,41,42]
       ];
}

document.getElementsByName("announcements")[0].innerHTML = "Current Player: " + whosPlaying() + "&nbsp;"





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
    selectorTable.innerHTML = ""
    drawSelector()
    playerOneTurn = !playerOneTurn
    document.getElementsByName("announcements")[0].innerHTML = "Current Player: " + whosPlaying() + "&nbsp;"
};

// GAMEPLAY

function playerSelects2P() {
    findAvailableSpots()

    // put an eventListener here?
    columnPick = prompt(whosPlaying() +  ', choose which column 1-7')


    if (availableSpots.includes(parseInt(columnPick))) 
        {console.log(columnPick)}
    else {
        alert("not available")
        playerSelects2P()}
};



function playerSelects1P() {
    if (whosPlaying() == playerTwo) {
        findAvailableSpots()
        columnPick = availableSpots[Math.floor(Math.random() * availableSpots.length)]
        return
    }
    else {playerSelects2P()}
};    

function whosPlaying() {
    if (playerOneTurn) {
    return "Yellow"
    } else {
    return "Red"
    }
};

// starts from the bottom row and claims spot when there it is a number (unoccupied)

function claimSpot(){
    findAvailableSpots()
    if (availableSpots.includes(indexPick+1)) {

    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][indexPick])) {
            gameboard[i].splice((indexPick), 1, whosPlaying())
            mainTable.innerHTML = ""
            drawBoard()
            checkForWinners() 
            swapTurns()
            return
            }
        }
    }
    else {
        console.log(availableSpots)
        alert("Forbidden")
    }

};

// if there is a string in row[0], that column is no longer available.
// the cells are numbered from 1 to 7, not per index so you need to add one to indexPick to identify
function findAvailableSpots() {
    availableSpots = gameboard[0].filter(x => Number.isInteger(x) == true)
};


function checkForWinners() {
    horizontalCheck()
    verticalCheck()
    downrightCheck()
    uprightCheck()
}

// WIN CHECKERS
// a forloop evaluates a section of the matrix, moving through it and seeing if the 3 ahead match.
// it stops before going out of bounds

function findFour(w,x,y,z) {
    // Checks first cell against current player and all cells match that player
    // this means the check is only for one side! can't do it this way
    return ((w == whosPlaying()) && (w === x) && (w === y) && (w === z));
};

function winDeclared() {
    isThereAWinner = true
    alert("winner")
    document.getElementsByName("announcements")[0].innerHTML = whosPlaying() + " wins!&nbsp;"
    selectorTable.innerHTML = ""
// same problem, swapTurns is executing before winDeclared is 
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



// REMOVE:
// Draw gameTypeDropDownArea
// to avoid the show function being written for a button that won't exist when the function is parsed I used radio buttons

// let gameInfoAreaDiv = document.createElement("div") 
// gameInfoAreaDiv.id = 'gameInfoArea'
// mainDiv.append(gameInfoAreaDiv);

// let gameTypeDiv = document.createElement("div") 
// gameTypeDiv.id = 'gameTypeDiv'
// gameInfoAreaDiv.append(gameTypeDiv);

// let gameTypeRadioForm = document.createElement("form")
// gameTypeRadioForm.id = 'gameTypeRadioForm'
// gameTypeDiv.append(gameTypeRadioForm);


// let twoPlayerChoiceDiv = document.createElement('div') 
// twoPlayerChoiceDiv.setAttribute('id', 'twoPlayerChoiceDiv')
// gameTypeRadioForm.append(twoPlayerChoiceDiv)

// let twoPlayerInput = document.createElement('input') 
// twoPlayerInput.setAttribute('type', 'radio')
// twoPlayerInput.setAttribute('id', '2P')
// twoPlayerInput.setAttribute('name', 'gameType')
// twoPlayerInput.setAttribute('value', '2 Player')
// twoPlayerChoiceDiv.append(twoPlayerInput)

// let twoPlayerLabel = document.createElement('label')
// twoPlayerLabel.setAttribute('for', '2P')
// twoPlayerLabel.innerHTML = '2P'
// twoPlayerChoiceDiv.append(twoPlayerLabel)


// let onePlayerEasyDiv = document.createElement('div') 
// gameTypeRadioForm.append(onePlayerEasyDiv)

// let onePlayerEasyInput = document.createElement('input') 
// onePlayerEasyInput.setAttribute('type', 'radio')
// onePlayerEasyInput.setAttribute('id', '1PE')
// onePlayerEasyInput.setAttribute('name', 'gameType')
// onePlayerEasyInput.setAttribute('value', '1 Player Easy')
// onePlayerEasyDiv.append(onePlayerEasyInput)

// let onePlayerEasyLabel = document.createElement('label')
// onePlayerEasyLabel.setAttribute('for', '1PE')
// onePlayerEasyLabel.innerHTML = '1P Easy'
// onePlayerEasyDiv.append(onePlayerEasyLabel)


// let onePlayerHardDiv = document.createElement('div') 
// gameTypeRadioForm.append(onePlayerHardDiv)

// let onePlayerHardInput = document.createElement('input') 
// onePlayerHardInput.setAttribute('type', 'radio')
// onePlayerHardInput.setAttribute('id', '1PH')
// onePlayerHardInput.setAttribute('name', 'gameType')
// onePlayerHardInput.setAttribute('value', '1 Player Hard')
// onePlayerHardDiv.append(onePlayerHardInput)

// let onePlayerHardLabel = document.createElement('label')
// onePlayerHardLabel.setAttribute('for', '1PE')
// onePlayerHardLabel.innerHTML = '1P Hard'
// onePlayerHardDiv.append(onePlayerHardLabel)
