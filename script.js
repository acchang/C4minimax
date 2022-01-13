// Watch Leon Noel
// repack meats
// minimax
// consider resizing for mobile
// clean up desktop and notes

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
let itsAOnePlayerGame
let isThereAWinner = true

let mainDiv = document.createElement("div");
mainDiv.setAttribute('class', 'mainDiv')
document.body.append(mainDiv);

let selectorHolder = document.createElement("div") 
selectorHolder.setAttribute('class', 'selectorHolder')
selectorHolder.setAttribute('id', 'selectorHolder')
mainDiv.append(selectorHolder)

let selectorTable = document.createElement("table") 
selectorTable.setAttribute('class', 'selectorTable')
selectorTable.setAttribute('id', 'selectorTable')
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

        innerSelectorCell.onclick = function(){
                if (isThereAWinner == true){
                    alert("Select game")
                }
                else {
                    indexPick = parseInt(this.id)
                    claimSpot()
                    }
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

function resetBoard() {
    gameboard = [
        [1,2,3,4,5,6,7],
        [8,9,10,11,12,13,14],
        [15,16,17,18,19,20,21],
        [22,23,24,25,26,27,28],
        [29,30,31,32,33,34,35],
        [36,37,38,39,40,41,42]
       ]
    mainTable.innerHTML = ""
    drawBoard()
};

function beginGame() {
    isThereAWinner = false
    playerOneTurn = true
    document.getElementsByName("announcements")[0].innerHTML = "Current Player: " + whosPlaying() + "&nbsp;"

    if (gameType == "1PEasy"){
        itsAOnePlayerGame = true
        resetBoard()
        }
    else if (gameType == "1PHard"){
        itsAOnePlayerGame = true
        resetBoard()
        }
    else if (gameType == "2P"){
        itsAOnePlayerGame = false
        resetBoard()
        }
};

function swapTurns() {
    if (isThereAWinner == true) {return}
    else {
    selectorTable.innerHTML = ""
    drawSelector()
    playerOneTurn = !playerOneTurn
    document.getElementsByName("announcements")[0].innerHTML = "Current Player: " + whosPlaying() + "&nbsp;"
    }
};

// GAMEPLAY

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

            setTimeout(
                function() {
                    swapTurns()
                    if (itsAOnePlayerGame == true && isThereAWinner == false) {computerPlays()}
                    else {return}
                }, 240)            
            break
            }
        }
    }
    else {
        console.log(availableSpots)
        alert("Forbidden")
    }
};

function computerPlays() {
    findAvailableSpots()
// if it's 1PEasy then
    indexPick = (availableSpots[Math.floor(Math.random() * availableSpots.length)] - 1)
// if it's 1PHard then indexPick = another choice

    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][indexPick])) {
            gameboard[i].splice((indexPick), 1, whosPlaying())
            mainTable.innerHTML = ""
            drawBoard()
            checkForWinners() 
            setTimeout(
                function() {
                swapTurns()
                }, 
            240)
            break
            }
        }
    
};

// if there is a string in row[0], that column is no longer available.
// the cells are numbered from 1 to 7, not per index so you need to add one to indexPick to identify
function findAvailableSpots() {
    availableSpots = gameboard[0].filter(x => Number.isInteger(x) == true)
};

// function minimax(gameboard)


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
    return ((w == whosPlaying()) && (w === x) && (w === y) && (w === z));
};

function winDeclared() {
    isThereAWinner = true
    document.getElementsByName("announcements")[0].innerHTML = whosPlaying() + " wins!&nbsp;"

    setTimeout(
        function() {
          alert(whosPlaying() + " wins!")
        }, 10)
    
    return
};


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



// Minimax

function bestAIMove() {
    let bestScore = -10000
    var move;
    var parallelChoices = listParallelSpaces();
  
    for (var i = 0; i < parallelChoices.length; i++) {
      playerOneTurn = false;
      var parallelPick = parallelChoices[i];
      parallelBoard.splice(parallelPick, 1, TWO_CLASS);
      var score = minimax()
      playerOneTurn = false;
      parallelBoard.splice(parallelPick, 1, parallelPick);
      if (score > bestScore) {
        bestScore = score;
        move = parallelPick;
        } 
    }
  playerOneTurn = false;
  parallelBoard.splice(move, 1, TWO_CLASS);
  origBoard[move].classList.add(TWO_CLASS);
  origBoard[move].innerHTML = TWO_CLASS;
  if (playerhasWon()) {
    declareWinner();
    return
    } 
  if (isThereATie() == true) {
  declareTie()
  return
  }
  suggestedAIMove()
  }
  
  // minimax() fires when it is called by bestAIMove()
  // (1) if neither checkwin() nor tie() is true, then swapTurns(), then ...
  // (2) listParallelSpaces(), forloop over that array.
  // (3) splice a marker into parallelboard, use minimax (on itself)
  // this again goes to step 1, checking and swapping sides until there is a win. 
  // if there is a score, `parallelBoard.splice(player2Pick, 1, player2Pick)` steps it back
  // there is no swap, the board is tested again
  // if there is no win, then again swapTurns() until there is a win
  // and then again, step back, no swap, test again
  // this goes until the `forloop` is done, and you get a score for one choice at bestAIMove()
  // then bestAIMove() goes through its own forloop
  // There is only one "score" and it is "best" depending on who is the player
  
  // so bestAIMove() starts with one choice and tests all possible combinations
  // the `parallelPick` that gets the best score is turned into the `move`
  // because the bestAIMove() does a forloop
  // the `move` will always be the last relevant one in the array.
  // there is a possibility that a move blocking a projected win is not the optimal move
  // if the opponent does not do the optimal move. But because the board is so small, 
  // if the opponent's move is sub-optimal, the AI will take the first win it sees.
  // the AI is only effective if it takes a win over a tie or a loss and assumes you do too.
  // `bestScore` is interesting because there is only one best score. 
  // It keeps updating to -10, 10 or 2 depending on who the current player is.
  
// I may need a simpler swapTurnsMM mechanism
// I need to copy and evaluate gameboard

  function minimax() {
    if (newCheckWin() &&  playerOneTurn) {
      return -10;
    } else if (newCheckWin() && !playerOneTurn) {
      return 10;
    } else if (isThereATieParallel() === true) {
      return 2;
    }
    swapTurns()  
    if (!playerOneTurn) {
      let bestScore = -10000; 
      var player2Choices = listParallelSpaces();
      for (var i = 0; i < player2Choices.length; i++) {
        playerOneTurn = false
        var player2Pick = player2Choices[i];
        parallelBoard.splice(player2Pick, 1,TWO_CLASS);
        var score = minimax(parallelBoard)
        parallelBoard.splice(player2Pick, 1, player2Pick);
        if (score > bestScore) {
          bestScore = score
        }
        return bestScore
      }
    }
    else {
      let bestScore = 100000; 
      var player1Choices = listParallelSpaces();
  
      for (var i = 0; i < player1Choices.length; i++) {
        playerOneTurn = true
        var player1Pick = player1Choices[i];
        parallelBoard.splice(player1Pick, 1,ONE_CLASS);
        var score = minimax(parallelBoard)
        parallelBoard.splice(player1Pick, 1, player1Pick);
        if (score < bestScore) {
          bestScore = score
        }
        return bestScore
      }
    }
}


