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
    // added and changed scoring to be symmetrical, formerly -500, -250
    // else if (array.reduce(countOpponentMarkers, 0) === 4){return -1000}
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

function scoreGameboard(board){
    score = 0
    let SGB = (assessHorizWindows(board) + assessVertWindows(board)
    + assessUprightWindows(board) + assessDownrightWindows(board)
    + weightMiddles(board) 
    )
    return SGB
};

function isTerminalMode(board){
    if (isThereAWinner == true || [findAvailableIndexes(board)].length == 0)
    {return true}
};


function findOpenRow(board, column){
    for (i = 5; i > -1; i--) {
        if (Number.isInteger(board[i][column])) {
            return i
        }
    }
};


function computerPlays() {
    if (itsAOnePlayerGame == true) {
        availableIndexes = findAvailableIndexes(gameboard)
        console.log("AI chooses from: " + availableIndexes)
        // indexPick = (availableIndexes[Math.floor(Math.random() * availableIndexes.length)])
        indexPick = (minimax(parallelBoard, 4, !playerOneTurn)).move
    }
    else if (itsAHardGame == true)
        { indexPick = pickBestMove() }
 

    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][indexPick])) {
            gameboard[i].splice((indexPick), 1, whosPlaying())
            parallelBoard[i].splice((indexPick), 1, whosPlaying())
            console.log("**** computerplays " + indexPick + " SG score is " + scoreGameboard(parallelBoard))
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

/* what I need to do is get the boardState hasPlayerWon or hasComputerWon
scan board in 4 directions, if true, get isPlayerTurn value
that player won
true or false for 
    hasPlayerWon: hasPlayerWon,
    hasComputerWon: hasComputerWon
--------*/

    /* replace with my own scoring algo 
    let isInbound = function (boardLocation) {
        return 0 <= boardLocation.i && boardLocation.i < board.length
        && 0 <= boardLocation.j && boardLocation.j < board[0].length;
        };
    
    let check4 = function (location1, location2, location3, location4) {
        if (!isInbound(location1) || !isInbound(location2) || !isInbound(location3) || !isInbound(location4))
        return null;
    
    let location1Move = board[location1.i][location1.j];
    let location2Move = board[location2.i][location2.j];
    let location3Move = board[location3.i][location3.j];
    let location4Move = board[location4.i][location4.j];
    
    if (location1Move === "Yellow" && location2Move === "Yellow" && location3Move === "Yellow" && location4Move === "Yellow")
        return "Yellow";
    if (location1Move === "Red" && location2Move === "Red" && location3Move === "Red" && location4Move === "Red")
        return "Red";
    
    return null;
        };*/


    // let directions = [
    // [1, 0], /* a horizontal win */
    // [0, 1], /* a vertical win */
    // [1, 1], /* a diagonal win */
    // [1, -1] /* a diagonal win (in the other direction) 
    // ];

/*
    for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
    for (let direction of directions) {
    
       let location1 = { i: i + direction[0] * 0, j: j + direction[1] * 0 };
       let location2 = { i: i + direction[0] * 1, j: j + direction[1] * 1 };
       let location3 = { i: i + direction[0] * 2, j: j + direction[1] * 2 };
       let location4 = { i: i + direction[0] * 3, j: j + direction[1] * 3 };
     
       let possibleWinner = check4(location1, location2, location3, location4);
       
       if (possibleWinner === "Yellow")
           hasPlayerWon = true;
       if (possibleWinner === "Red")
           hasComputerWon = true;
    }
    }
    };
*/

// the new way of checking is not outputting as many as Dtsudo's
// it's also not choosing smartly but persistently moving up the left side. why?



// The reason why it kept placing tokens upwards in a single column is 
// because I kept asking it to choose from the seven available spaces -- 
// and since I was iterating over the available spaces from index[0] and this is Connect Four,
// the first space to choose would repeatedly be index[0] until that column was full.


// bc the checking in mine is serial whereas he uses a for/of loop?
// but the for loop does the same thing!
// it's not choosing because it's not getting as many winning scores, mostly zeroes.
// but there are some. 
// the problem is not in the minimax. it's in what's declared playerwon or computerwon

    let hasPlayerWon = false;
    let hasComputerWon = false;

{
    // boardStateUprightCheck(board) -- goes thru and searches direction, declares a winnner
    for (r=5; r>2; r--) {
        for (c=0; c<4; c++){
            if (board[r][c] == board[r-1][c+1] && board[r][c] == board[r-2][c+2] && board[r][c] == board[r-3][c+3]) {
                if (isPlayerTurn){hasPlayerWon = true}
                else if (!isPlayerTurn){hasComputerWon = true}
            }
        }
    }

    // boardStateDownrightCheck(board)
    for (r=0; r<3; r++) {
        for (c=0; c<4; c++){
            if (board[r][c] == board[r+1][c+1] && board[r][c] == board[r+2][c+2] && board[r][c] == board[r+3][c+3]) {
                if (isPlayerTurn){hasPlayerWon = true}
                else if (!isPlayerTurn){hasComputerWon = true}
            }
        }
    }

    // boardStateVerticalCheck(board)
    for (r=5; r>2; r--) {
        for (c=0; c<7; c++){
            if (board[r][c] == board[r-1][c] && board[r][c] == board[r-2][c] && board[r][c] == board[r-3][c]) {
                if (isPlayerTurn){
                    hasPlayerWon = true
                }
                else if (isPlayerTurn == false){
                    hasComputerWon = true
                }
            }
        }
    }

    // boardStateHorizontalCheck(board)
    for (r=0; r<6; r++) {
        for (c=0; c<4; c++){
            if (board[r][c] == board[r][c+1] && board[r][c] == board[r][c+2] && board[r][c] == board[r][c+3]) {
                if (isPlayerTurn){hasPlayerWon = true}
                else if (!isPlayerTurn){hasComputerWon = true}
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
    // add in my own
    // score will be in absolute terms, overly negative or positive.
    return 0;
    }

    
function minimax(board, depth) {

let boardState = getBoardState(board);
let moves = boardState.moves;
let isPlayerTurn = boardState.isPlayerTurn;
let hasPlayerWon = boardState.hasPlayerWon;
let hasComputerWon = boardState.hasComputerWon;

if (depth === 0)
return { score: evaluateBoardPosition(board) };

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
            console.log("score: " + scoreOfThisMove + " move: " + move)
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
        console.log("score: " + scoreOfThisMove + " move: " + move)
        }
    }

return { score: bestScoreFoundSoFar, move: bestMoveFoundSoFar };
}
}










// Minimax process works
// but at 2 depth but crashes, 3, t
// number of tokens doesn't matter, as low as 4, up to 7 placed
// can't get past row 2 but sometimes crashes before that

/*
function OLDminimax(board, depth, player) {
    console.log("initial depth:" + depth)
    minimaxAvailable = findAvailableIndexes(board) 

    if (isTerminalMode(board)) {
        if (isThereAWinner == true && player == playerOneTurn){
            return {score: -10000000000}
            }
        else if (isThereAWinner == true && player == !playerOneTurn){
            return {score: 10000000000}
            }
        else {return {score:0}}
    }

    else if (depth == 0) //&& playerOneTurn
        {console.log("score depth:" + depth)
            return {score: scoreGameboard(board)} 
        }

  let moves = [];
  let result

  for (var j = 0; j < minimaxAvailable.length; j++){
        let i = findOpenRow(board, j) // finds the first row for the available index
        let move = {};
        move.special = j // records which index it was as the chosen move
  	    move.index = board[minimaxAvailable[i]] // not sure if this even needed. 

            if (player == playerOneTurn){
            // console.log("yellow:" + gameboard[i][j] + " depth:" + depth)
            board[i].splice((j), 1, "Yellow")
            }
            else if (player == !playerOneTurn){
            console.log("red:" + gameboard[i][j] + " depth:" + depth)
            board[i].splice((j), 1, "Red")
            }

            if (player == !playerOneTurn){
            result = minimax(board, depth-1, player == playerOneTurn)
            console.log("score:" + result.score)
            move.score = result.score;
            }
            else {
            result = minimax(board, depth-1, player == !playerOneTurn)
            console.log("score:" + result.score)
            move.score = result.score;
            }
    board[i].splice((j), 1, gameboard[i][j])
    moves.push(move);
  }

let bestMove;

if(player == !playerOneTurn){
  let bestScore = -1000000000;
  for(var k = 0; k < moves.length; k++){
    if(moves[k].score > bestScore){
        console.log(moves[k].score + " bigger than " + bestScore)
      bestScore = moves[k].score;
      bestMove = k;
    }
  }
}else{ 
    let bestScore = 10000000;
    for(let k = 0; k < moves.length; k++){
    if(moves[k].score < bestScore){
        console.log(moves[k].score + " smaller than " + bestScore)
      bestScore = moves[k].score;
      console.log("bestScore:" + bestScore)
      bestMove = k;
      console.log("bestMove:" + bestMove)
    }
  }
}

console.log("moves:" + moves + "bestMove:" + bestMove)
let answer = moves[bestMove].special
console.log("choice: " + answer)
console.log("best score:" + moves[bestMove].score)
return moves[bestMove]

}
*/