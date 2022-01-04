
var gameboard = [[1,2,3,4,5,6,7],
                 [8,9,10,11,12,13,14],
                 [15,16,17,18,19,20,21],
                 [22,23,24,25,26,27,28],
                 [29,30,31,32,33,34,35],
                 [36,37,'X',39,40,41,42]];

// need gameplay to switch rounds and then build a column
// then scoring mechanism
// then minimax

function swapTurns() {

}

// 'X' is the token below, could be if space is not a number

function playRound() {
    const playerEnters = prompt('splice which column 1-7?');
    const columnPick = parseInt(playerEnters);
    let i;
    for (i = 5; i > -1; i--) 
    {if (Number.isInteger(gameboard[i][columnPick-1]))
     {gameboard[i].splice((columnPick -1), 1, 'X')
     console.log(columnPick + gameboard[i])
     return}
    };
    };

playRound()