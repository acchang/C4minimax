# C4minimax

1/4/2022
working out the gameplay in primitives alone. Got some Odinhelp:
https://discord.com/channels/505093832157691914/690590001486102589/927965098960637985

Checking on checking mechanism
https://discord.com/channels/505093832157691914/690590001486102589/928055379940741160


1/3/2022
this is in python but it was helpful, it will be even more when I get the gameplay down
it's only the AI
https://www.youtube.com/watch?v=MMLtza3CZFM

Not sure if this was helpful
https://stackoverflow.com/questions/54778741/connect-four-game-logic

Checkwin guidance in java
https://stackoverflow.com/questions/32770321/connect-4-check-for-a-win-algorithm

A little discussion of logic
https://stackoverflow.com/questions/15457796/four-in-a-row-logic


I know I have to build a simple array of arrays
it will be six rows and seven columns
splice R or Y into array when selected

checking will not use winning combinations but if these states where player is in
[row] and 4 in left or right
[row][column] and [row-1] or [row+1] up to 4
and diagonals: [row+1][column+1], +2,+2, etc 
you will to radiate out bc it could be +1 on one side and +2 on the other
... then game won.

So build the array and then specify:
When mouseclick over column, replace lowest row with available column
check for win after each

Separately build board 
take input
alters the array
--> will become moveable row that drops when clicked
builds board off the array

check and proclaim a win.
