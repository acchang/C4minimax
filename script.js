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

// Draw Board -- 
// erase and redraw each time there is a change (prompt freezes the DOM, use async or change input)

//in html build another box above, with a slider, interpret the slide into a column number
//then maybe a radio button for the other info

let mainDiv = document.createElement("div");
mainDiv.id = 'mainDiv';
document.body.append(mainDiv);

// Draw selector
// make clear, mouseover with token color
let selectorHolder = document.createElement("div") 
selectorHolder.id ='selectorHolder'
mainDiv.append(selectorHolder)

let selectorTable = document.createElement("table") 
selectorTable.id ='selectorTable'
selectorHolder.append(selectorTable)

let selectorRow = document.createElement("tr") 
selectorRow.id ='selectorRow'
selectorTable.append(selectorRow)

function drawSelectorCell() {  
    for (i=0; i<7; i++){
        let selectorCell = document.createElement("td") 
        selectorCell.setAttribute('class', 'selectorCell')
        selectorCell.setAttribute('id', 'selectorCell'+[i])

        selectorCell.addEventListener("mouseover", function(event) {
            // console.log(selectorCell.id) 
            selectorCell.setAttribute('background-color','pink')
            // -- this works, I just need it to light up
        })

        selectorCell.onclick = function(){
            columnPick = i
            console.log("CP is" + selectorCell.id)
        }

        selectorRow.append(selectorCell)
        }
};

drawSelectorCell()

// Draw Main Gameboard

let mainTable = document.createElement("table");
mainTable.id = 'mainTable'
mainDiv.append(mainTable)

function drawBoard() {
    for (i=0; i<gameboard.length; i++){
            let row = document.createElement("tr")
            mainTable.append(row)

                for (j=0; j<gameboard[i].length; j++){
                    let cell = document.createElement("td")
                    cell.setAttribute('class', gameboard[i][j])
                    row.append(cell)
            }
        }
};

//Draw gameTypeDropDownArea

let gameTypeDropDownArea = document.createElement("div") 
gameTypeDropDownArea.id = 'gameTypeDropDownArea'
mainDiv.append(gameTypeDropDownArea);

let dropdown = document.createElement("div") 
gameTypeDropDownArea.append(dropdown);

let gameTypeButton = document.createElement('button') 
gameTypeButton.innerHTML = 'Type of Game?'
gameTypeButton.setAttribute('id', 'gameTypeButton')
gameTypeButton.setAttribute('class', 'dropbtn')
gameTypeButton.setAttribute('onclick', toggleGameOptions())
dropdown.append(gameTypeButton);

let myDropdown = document.createElement('div') 
myDropdown.setAttribute('id', 'myDropdown')
myDropdown.setAttribute('class', 'dropdown-content')
gameTypeButton.append(myDropdown);

let twoPLink = document.createElement('a')
twoPLink.setAttribute('href',"cnn.com")
myDropdown.innerHTML = '2P'
myDropdown.append(twoPLink);

let onePEasyLink = document.createElement('a')
onePEasyLink.setAttribute('href',"cnn.com")
myDropdown.innerHTML = '1P Easy'
myDropdown.append(onePEasyLink);

let onePHardLink = document.createElement('a')
onePHardLink.setAttribute('href',"cnn.com")
myDropdown.innerHTML = '1P Hard'
myDropdown.append(onePHardLink);

function toggleGameOptions() {
    console.log("toggle")
    document.getElementById("myDropdown").classList.toggle("show");
  }

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }








// Begin Game

// function oneOrTwoPlayerGame(){
//     typeOfGame = prompt('One or Two Player')
//     if (typeOfGame == "1"){
//         itsAOnePlayerGame = true
//         onePlayerPickSides()
//         onePlayerSimpleOrAdvanced()
//         }
//     else if (typeOfGame == "2"){
//         itsAOnePlayerGame = false
//         twoPlayerPickSides()
//         play2PGame()
//         }
//     else {alert("No")
//         isThereAWinner = true
//         return
//         }
// };

// function onePlayerPickSides(){
//     playerOne = prompt('Your name')
//     playerTwo = 'Computer'
// };

// function twoPlayerPickSides() {
//     playerOne = prompt('Player One name')
//     playerTwo = prompt('Player Two name')
// };

// function onePlayerSimpleOrAdvanced(){
//     simpleOrAdvanced = prompt('Simple(1) or Advanced(2)')
//     if (simpleOrAdvanced == 1) {
//         play1PGame()
//     }
//     else if (simpleOrAdvanced == 2) {
//         playAdvanced1PGame()
//     }
//     else {alert("No")
//         isThereAWinner = true
//         return
//         }
// };

function whosPlaying() {
    if(playerOneTurn) {
    return playerOne
    } else {
    return playerTwo
    }
};

// function play1PGame() {
//     while (isThereAWinner == false) {
//         playerSelects1P()
//         placeToken()
//     }
// };

// function playAdvanced1PGame() {
//     while (isThereAWinner == false) {
//         playerSelects1P()
//         // advancedPlayerSelects1P()
//         placeToken()
//     }
// };

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
    columnPick = prompt(whosPlaying() +  ', choose which column 1-7')
    if (availableSpots.includes(parseInt(columnPick))) 
        {console.log(columnPick)}
    else {
        alert("not available")
        playerSelects2P()}
};

// if there is a string in row[0], that column is no longer available.
function findAvailableSpots() {
    availableSpots = gameboard[0].filter(x => Number.isInteger(x) == true)
};



function playerSelects1P() {
    // alert("here is 1P (149)")
    // alert(whosPlaying() + " (151) " + availableSpots)
    if (whosPlaying() == playerTwo) {
        findAvailableSpots()
        columnPick = availableSpots[Math.floor(Math.random() * availableSpots.length)]
        return
    }
    else {playerSelects2P()}
};    

function tokenClassesForGameboard() {
    if(playerOneTurn) {
    return "One"
    } else {
    return "Two"
    }
};

// starts from the bottom row and places token in chosen spot when there it is a number (unoccupied)
function placeToken() {
    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][columnPick-1])) {
            currentIndex = (columnPick -1)
            currentRow = i
            alert(whosPlaying() + " choice is " + columnPick)

// I need to splice in something else here.
            gameboard[i].splice((columnPick -1), 1, tokenClassesForGameboard())

            horizontalCheck()
            verticalCheck()
            downrightCheck()
            uprightCheck()

            swapTurns()
            return
        }
        }
};

// WIN CHECKERS
// a forloop evaluates a section of the matrix, moving through it and seeing if the 3 ahead match.
// it stops before going out of bounds

function findFour(w,x,y,z) {
    // Checks first cell against current player and all cells match that player
    // this means the check is only for one side! can't do it this way
    return ((w == tokenClassesForGameboard()) && (w === x) && (w === y) && (w === z));
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

