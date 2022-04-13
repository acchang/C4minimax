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
let itsAMinimaxGame = false
let itsAScoringGame = false
let itsTwoPlayerGame = false
let isThereAWinner = true

let player
let depth
let minimaxAvailable
let boardValue

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

    if (gameType == "Minimax"){
        itsAMinimaxGame = true
        resetBoard()
        }
    else if (gameType == "Scoring"){
        itsAScoringGame = true
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
                    if ((itsAMinimaxGame == true && isThereAWinner == false) || (itsAScoringGame == true && isThereAWinner == false))
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
    
    itsAMinimaxGame = false
    itsAScoringGame = false
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
    if (array.reduce(countPlayerMarkers, 0) === 4){return 1000}
    else if ((array.reduce(countPlayerMarkers, 0) === 3) && (array.reduce(countEmptySpaces, 0) === 1)) {return 10}
    else if ((array.reduce(countPlayerMarkers, 0) === 2) && (array.reduce(countEmptySpaces, 0) === 2)) {return 5}
    else if ((array.reduce(countOpponentMarkers, 0) === 3) && (array.reduce(countEmptySpaces, 0) === 1)) {return -500}
    else if ((array.reduce(countOpponentMarkers, 0) === 2) && (array.reduce(countEmptySpaces, 0) === 2)) {return -250}
    else {return 0}
};


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
        
        let positionScore = assessHorizWindows(parallelBoard) + assessVertWindows(parallelBoard)
                            + assessUprightWindows(parallelBoard) + assessDownrightWindows(parallelBoard)
                            + weightMiddles(parallelBoard)
        
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


function computerPlays() {
    if (itsAMinimaxGame == true) {
        availableIndexes = findAvailableIndexes(gameboard)
        indexPick = (minimax(parallelBoard, 5)).move
    }
    else if (itsAScoringGame == true)
        { indexPick = pickBestMove() }
 
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
                }, 
            240)
            break
            }
        }    
};

function getBoardState(board) {    
    let numPlayerMoves = 0;
    let numComputerMoves = 0;
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === "Yellow")
                numPlayerMoves++;
            if (board[i][j] === "Red")
                numComputerMoves++;
        }
    }
    
    let isPlayerTurn = (numPlayerMoves === numComputerMoves)
    let hasPlayerWon = false;
    let hasComputerWon = false;

{
    // boardStateUprightCheck(board) -- goes thru and searches direction, declares a winnner
    for (r=5; r>2; r--) {
        for (c=0; c<4; c++){
            if (board[r][c] == board[r-1][c+1] && board[r][c] == board[r-2][c+2] && board[r][c] == board[r-3][c+3]) {
                if (isPlayerTurn){hasComputerWon = true}
                else if (!isPlayerTurn){hasPlayerWon = true}
            }
        }
    }

    // boardStateDownrightCheck(board)
    for (r=0; r<3; r++) {
        for (c=0; c<4; c++){
            if (board[r][c] == board[r+1][c+1] && board[r][c] == board[r+2][c+2] && board[r][c] == board[r+3][c+3]) {
                if (isPlayerTurn){hasComputerWon = true}
                else if (!isPlayerTurn){hasPlayerWon = true}
            }
        }
    }

    // boardStateVerticalCheck(board)
    for (r=5; r>2; r--) {
        for (c=0; c<7; c++){
            if (board[r][c] == board[r-1][c] && board[r][c] == board[r-2][c] && board[r][c] == board[r-3][c]) {
                if (isPlayerTurn){hasComputerWon = true}
                else if (!isPlayerTurn){hasPlayerWon = true}
            }
        }
    }

    // boardStateHorizontalCheck(board)
    for (r=0; r<6; r++) {
        for (c=0; c<4; c++){
            if (board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2] && board[r][c] == board[r][c+3]) {
                if (isPlayerTurn){hasComputerWon = true}
                else if (!isPlayerTurn){hasPlayerWon = true}
            }
        }
    }
}

    return {
    moves: hasPlayerWon || hasComputerWon ? [] : findAvailableIndexes(board),
    isPlayerTurn: isPlayerTurn,
    hasPlayerWon: hasPlayerWon,
    hasComputerWon: hasComputerWon
    }
};

function applyMove(board, move, isPlayerTurn) {
    let i = board.length - 1;
    while (true) {
        if (board[i][move] !== "Yellow" && board[i][move] !== "Red") {
        board[i][move] = ( isPlayerTurn ? "Yellow" : "Red" );
        return;
        }
    i--;
    }
};

function unapplyMove(board, move) {
    let i = 0;
    while (true) {
        if (board[i][move] === "Yellow" || board[i][move] === "Red") {
        board[i][move] = i * 7 + move + 1;
        return;
        }
    i++;
    }
};


function evaluateBoardPosition(board) {
    let evaluatedBoardScore = evaluateHorizWindows(board) + evaluateVertWindows(board)
    + evaluateUprightWindows(board) + evaluateDownrightWindows(board)
    + evalMiddles(board)
    return evaluatedBoardScore;
 };
 
 function evaluateHorizWindows(board) {
    let horizEval = 0
    for (r=0; r<6; r++) {   
       for (c=0; c<4; c++){
          let window = [board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]]
             horizEval += scoreForEval(window)
       }
    }
    return horizEval
 };
 
 function evaluateVertWindows(board) {
    let vertEval = 0
    for (r=5; r>2; r--) {
       for (c=0; c<7; c++){
          let window = [board[r][c], board[r-1][c], board[r-2][c], board[r-3][c]]
             vertEval += scoreForEval(window)
       }
    }
    return vertEval
 };
 
 function evaluateUprightWindows (board) {
    let uprightEval = 0
    for (r=5; r>2; r--) {
       for (c=0; c<4; c++){
          let window = [board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]]
             uprightEval += scoreForEval(window)
       }
    }
    return uprightEval
 };
 
 function evaluateDownrightWindows (board) {
    let downrightEval = 0
    for (r=0; r<3; r++) {
          for (c=0; c<4; c++){
             let window = [board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]]
                downrightEval += scoreForEval(window)
          }
    }
    return downrightEval
 };
 
 function evalMiddles(board){
    let middlerow = [board[0][3],board[1][3],board[2][3],board[3][3],board[4][3],board[5][3]]
       let middleScore = ([middlerow.reduce(countYellowMarkers, 0)] * -3) +
       ([middlerow.reduce(countRedMarkers, 0)] * 3) 
    return middleScore 
 };
 
 function countYellowMarkers(counter, ele) { 
    if (ele == "Yellow") counter +=1
    return counter}
 
 function countRedMarkers(counter, ele) { 
    if (ele == "Red") counter +=1
    return counter}
 
 function scoreForEval(array) { 
    if (array.reduce(countYellowMarkers, 0) === 4){return -1000}
    else if (array.reduce(countRedMarkers, 0) === 4){return 1000}
    else if ((array.reduce(countYellowMarkers, 0) === 3) && (array.reduce(countEmptySpaces, 0) === 1)) 
       {return -500}
    else if ((array.reduce(countRedMarkers, 0) === 3) && (array.reduce(countEmptySpaces, 0) === 1)) 
       {return 500}
    else if ((array.reduce(countYellowMarkers, 0) === 2) && (array.reduce(countEmptySpaces, 0) === 2))
       {return -250}
    else if ((array.reduce(countRedMarkers, 0) === 2) && (array.reduce(countEmptySpaces, 0) === 2)) 
       {return 250}
    else {return 0}
 };

    
function minimax(board, depth) {

if (depth === 0)
return { score: evaluateBoardPosition(board) };

        let boardState = getBoardState(board);
        let moves = boardState.moves;
        let isPlayerTurn = boardState.isPlayerTurn;
        let hasPlayerWon = boardState.hasPlayerWon;
        let hasComputerWon = boardState.hasComputerWon;

if (hasPlayerWon)   {
    console.log("PW")
    return { score: -10000000000 - depth }
}

if (hasComputerWon) {
    console.log("CW") 
    return { score: 10000000000 + depth }
}

if (moves.length === 0)
    return { score: 0 };

if (!isPlayerTurn) {
    let bestMoveFoundSoFar = null;
    let bestScoreFoundSoFar = -Infinity;

    for (let move of moves) {
        applyMove(board, move, isPlayerTurn);
        let scoreOfThisMove = minimax(board, depth - 1).score;
        unapplyMove(board, move);

        if (scoreOfThisMove > bestScoreFoundSoFar) {
            bestScoreFoundSoFar = scoreOfThisMove;
            bestMoveFoundSoFar = move;
        }   
    } 

    return { score: bestScoreFoundSoFar, move: bestMoveFoundSoFar };

} else {
        let bestMoveFoundSoFar = null;
        let bestScoreFoundSoFar = Infinity;

    for (let move of moves) {
    applyMove(board, move, isPlayerTurn);
    let scoreOfThisMove = minimax(board, depth - 1).score;
    unapplyMove(board, move);

        if (scoreOfThisMove < bestScoreFoundSoFar) {
        bestScoreFoundSoFar = scoreOfThisMove;
        bestMoveFoundSoFar = move;
        }
    }

return { score: bestScoreFoundSoFar, move: bestMoveFoundSoFar };
    }
}


