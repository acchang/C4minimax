// build minimax
// clean up calendar, duolingo


// clean up desktop and notes
// i can turn this into an article on medium since there are no c4 JS minimax

let gameboard = [
                 [1,2,3,4,5,6,7],
                 [8,9,10,11,12,13,14],
                 [15,16,17,18,19,20,21],
                 [22,23,24,25,26,27,28],
                 [29,30,31,32,33,34,35],
                 [36,37,38,39,40,41,42]
                ];

let parallelBoard = [
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
let availableIndexes
let gameType
let playerOneTurn = true
let itsAOnePlayerGame = false
let itsAHardGame = false
let itsTwoPlayerGame = false
let isThereAWinner = true

let score  // = 0

// DOM creation

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
    parallelBoard = [
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
        itsAHardGame = true
        resetBoard()
        }
    else if (gameType == "2P"){
        itsATwoPlayerGame = true
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

function whosNotPlaying() {
    if (playerOneTurn) {
    return "Red"
    } else {
    return "Yellow"
    }
};

// starts from the bottom row and claims spot when there it is a number (unoccupied)
function claimSpot(){
    availableIndexes = findAvailableIndexes(gameboard)
    if (availableIndexes.includes(indexPick)) {

    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][indexPick])) {
            gameboard[i].splice((indexPick), 1, whosPlaying())
            parallelBoard[i].splice((indexPick), 1, whosPlaying())
            mainTable.innerHTML = ""
            drawBoard()
            checkForWinners() 
            setTimeout(
                function() {
                    swapTurns() 
                    if ((itsAOnePlayerGame == true && isThereAWinner == false) || (itsAHardGame == true && isThereAWinner == false))
                     {computerPlays()}
                    else {return}
                }, 240)  
            break
            }
        }
    }
    else {
        console.log(availableIndexes)
        alert("Forbidden")
    }
};

function computerPlays() {
    if (itsAOnePlayerGame == true) {
        availableIndexes = findAvailableIndexes(gameboard)
        console.log("AI: " + availableIndexes)
        indexPick = (availableIndexes[Math.floor(Math.random() * availableIndexes.length)])
    }
    else if (itsAHardGame == true)
        { indexPick = pickBestMove() }
 

    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][indexPick])) {
            gameboard[i].splice((indexPick), 1, whosPlaying())
            parallelBoard[i].splice((indexPick), 1, whosPlaying())
            console.log("computerplays SG score is " + scoreGameboard(parallelBoard))
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
// find available columns by creating a "newArray" and then "forEach" element in board[0], if it's an integer
// push the index of the integer into the newArray and return it.
function findAvailableIndexes(board) {
    let newArray=[]
    board[0].forEach(function(x){
    if (Number.isInteger(x) == true) 
    {newArray.push(board[0].indexOf(x))}
})
return newArray
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
    return ((w == whosPlaying()) && (w === x) && (w === y) && (w === z));
};

function winDeclared() {
    isThereAWinner = true
    document.getElementsByName("announcements")[0].innerHTML = whosPlaying() + " wins!&nbsp;"

    setTimeout(
        function() {
          alert(whosPlaying() + " wins!")
        }, 10)
    
    itsAOnePlayerGame = false
    itsAHardGame = false
    itsATwoPlayerGame = false
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


// Game-playing AI
// reassess these scorers bc they're all triple-counting when they have room
// they only single-count when at edge and nowhere to go
// but side spaces should get more points, more plays.

function assessHorizWindows(board) {
    let horizTotal = 0
    for (r=0; r<6; r++) {
        for (c=0; c<4; c++){
            let window = [board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]]
            horizTotal += scoreTheArray(window)
        }
    }
return horizTotal
};

function assessVertWindows(board) {
    let vertTotal = 0
    for (r=5; r>2; r--) {
        for (c=0; c<7; c++){
            let window = [board[r][c], board[r-1][c], board[r-2][c], board[r-3][c]]
            vertTotal += scoreTheArray(window)
        }
    }
return vertTotal
};

function assessUprightWindows (board) {
    let uprightTotal = 0
    for (r=5; r>2; r--) {
        for (c=0; c<4; c++){
            let window = [board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]]
            uprightTotal += scoreTheArray(window)
        }
    }
return uprightTotal
};

function assessDownrightWindows (board) {
    let downrightTotal = 0
    for (r=0; r<3; r++) {
        for (c=0; c<4; c++){
            let window = [board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]]
            downrightTotal += scoreTheArray(window)
        }
    }
return downrightTotal
};

function weightMiddles(board){
    let middles = [board[0][3],board[1][3],board[2][3],board[3][3],board[4][3],board[5][3]]
    let middleScore = [middles.reduce(countPlayerMarkers, 0)] * 3
    return middleScore 
};

function countPlayerMarkers(counter, ele) { 
    if (ele == whosPlaying()) counter +=1
    return counter}

function countOpponentMarkers(counter, ele) { 
    if (ele == whosNotPlaying()) counter +=1
    return counter}

function countEmptySpaces(counter, ele) { 
    if (Number.isInteger(ele)) counter +=1
    return counter}


function scoreTheArray(array) {
    if (array.reduce(countPlayerMarkers, 0) === 4){return 100}
    else if ((array.reduce(countPlayerMarkers, 0) === 3) && (array.reduce(countEmptySpaces, 0) === 1)) {console.log(array); return 10}
    else if ((array.reduce(countPlayerMarkers, 0) === 2) && (array.reduce(countEmptySpaces, 0) === 2)) {console.log(array); return 5}
    else if ((array.reduce(countOpponentMarkers, 0) === 3) && (array.reduce(countEmptySpaces, 0) === 1)) {console.log(array); return -500}
    else if ((array.reduce(countOpponentMarkers, 0) === 2) && (array.reduce(countEmptySpaces, 0) === 2)) {console.log(array); return -250}
    // any move that allows this to happen will be undesirable, so it'll push to put in the space where this doesn't apply
    else {return 0}
};


// *********** WHY IS IT NOT BLOCKING BIG MOVES ON THE RIGHT?

function pickBestMove() {
    let bestScore = -10000
    // you want this to be very low as a default so that blocking is preferred to nothing (bc even -80 is higher than -1k)
    let bestColumn = (availableIndexes[Math.floor(Math.random() * availableIndexes.length)])
    let parallelAvailable = findAvailableIndexes(parallelBoard)

     for (s=0; s<parallelAvailable.length; s++) {
            score = 0 
            let i;
            let j = parallelAvailable[s]
            for (i = 5; i > -1; i--) 
                if (Number.isInteger(parallelBoard[i][j])) {
                parallelBoard[i].splice((j), 1, whosPlaying())
                break
            }
        console.log("PBM score @ " + j + ":" + score)

        let positionScore = assessHorizWindows(parallelBoard) + assessVertWindows(parallelBoard)
                            + assessUprightWindows(parallelBoard) + assessDownrightWindows(parallelBoard)
                            + weightMiddles(parallelBoard)

        console.log("SG function says " + scoreGameboard(parallelBoard))
        
        console.log("index " + j + " in spot " + gameboard[i][j]+ " score " + positionScore )

        parallelBoard[i].splice((j), 1, gameboard[i][j])
        console.log("Top Score was " + bestScore)

        if (positionScore > bestScore || positionScore == bestScore) {
        bestScore = positionScore
        bestColumn = j
        console.log("Top Column/Score is now " + bestColumn, bestScore)
        }
        else {console.log("columm " + s + " is not better")}
        }

        console.log("Final Column/Score is " + bestColumn, bestScore)
        return bestColumn
};

// minimax

function scoreGameboard(board){
    score = 0
    console.log("PS score: " + score)
    console.log("horiz:" + assessHorizWindows(board) + "vert:" + assessVertWindows(board)
    + "upright:" + assessUprightWindows(board) + "downr:" + assessDownrightWindows(board)
    + "mid:" + weightMiddles(board)
    )

    let SGB = (assessHorizWindows(board) + assessVertWindows(board)
    + assessUprightWindows(board) + assessDownrightWindows(board)
    + weightMiddles(board) 
    )
    return SGB
};

function isTerminalMode(board){
    if (isThereAWinner == true || [findAvailableIndexes(board)].length == 0)
    {return true}
}

function minimax(board, depth, maximizingPlayer) {
    validLocations = findAvailableIndexes(board)
    if (isTerminalMode(board)) {
        if (isThereAWinner == true && !playerOneTurn){
            return 10000000000
        }
        else if (isThereAWinner == true && playerOneTurn){
            return -10000000000
        }
        else {return 0}
    }
    else if (depth == 0)
        {return //positionScore and player (but it's trapped inside that function
        // and if its taken out I have take it back to zero)
        // 1. score the board outside the algo
        }
    if (!playerOneTurn) {// maximizingPlayer 
        value = math.infinity //start off
        // score the board for each move
        // return the top value and position
        // move the board and erase it
    }
    else if (playerOneTurn)
    {
        // score the board for each move
        // return the top value and position
        // move the board and erase it
    }
};

// it's pretty simple what I need to do: I need to score the board and 
// I need to duplicate and alter and return it
// *** NEED TO FIGURE HOW BEST TO SCORE THE BOARD
// *** THEN WHY HORIZONTALS NOT WORKING

// function  minimax(node, depth, maximizingPlayer) is
//     if depth = 0 or node is a terminal node then
//         return the heuristic value of node
//     if maximizingPlayer then
//         value := −∞
//         for each child of node do
//             value := max(value, minimax(child, depth − 1, FALSE))
//         return value
//     else (* minimizing player *)
//         value := +∞
//         for each child of node do
//             value := min(value, minimax(child, depth − 1, TRUE))
//         return value



// Minimax
// I'm done with the scoring mechanism, now I'm looking for terminal states and working backwards.
// the current highest scoring may not be the wisest if it sets the opponent up to win 2 moves in 

// start 54:00
// 14:00 score a board independent of the piece dropped
// function minimax(gameboard)
// 22:45 else if 3 in a row, 10 pts
// score a horizontal move, and prefer move to 31:00

// use scores for each move and make sure it preferences it
// up to 50:00 he writes algos pref each direction

// function Minimax(board, depth, player) {
//     if depth == 0 ||
// }
// function isTerminalNode{
// }


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
  
  function minimaxTTT() {
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


