var gameboard = [
                 [1,2,3,4,5,6,7],
                 [8,9,10,11,12,13,14],
                 [15,16,17,18,19,20,21],
                 [22,23,24,25,26,27,28],
                 [29,30,31,32,33,34,35],
                 [36,37,38,39,40,41,42]
                ];

var playerOne
var playerTwo
var currentPlayer
var playerOneTurn = true

// need gameplay to switch rounds to fill board
// then scoring mechanism and minimax

// game status function?
// red goes first, run playRound
// add swap turns, win test

function pickSides() {
    playerOne = prompt('Player One chooses')
    playerTwo = prompt('Player Two chooses')
    };

function playRound() {
    const playerEnters = prompt('splice which column 1-7?');
    const columnPick = parseInt(playerEnters);
    let i;
    for (i = 5; i > -1; i--) 
        {if (Number.isInteger(gameboard[i][columnPick-1]))
            {gameboard[i].splice((columnPick -1), 1, checkClass())
            return}
        }
    
    // nothing happens after return
    // swapTurns()
    };

function swapTurns() {
    playerOneTurn = !playerOneTurn
    };

function checkClass() {
    if(playerOneTurn) {
    return playerOne
    } else {
    return playerTwo
    }
    };

function beginGame(){
    for (i=0; i<5; i++){
        playRound()
        // swapTurns()
    }
    console.log(gameboard)
}

pickSides();
beginGame();

// while loop fills the board until no numbers?
// while gameboard includes numbers playround?

// without scoring, just make terminal condition the number of Xs in gameboard(like 10)


