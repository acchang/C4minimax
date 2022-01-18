# C4minimax
1/18
Now that I'm writing minimax, a little digression to explain the scoring and why minimax is necessary

I put 3 opponent, 1 space as -500 because it's most important to block. This makes other choices less attractive
then 4 player should be next, grab it while you can at 100
then 3/1 at 10 because if at 50, two 3/1 is not as decisive as a 4
then 2/2 at 5 just to encourage 
and middles at 3

of course, there are times when the highest scoring move is not the smartest. This is why minimax is necessary.
The AI might try to complete a 3/1, when it should prevent opponent from setting up a 2/2 which will give him a 3/1 with a choice on each side.



1/17
Learned arrow functions a little more deeply, will be able to abstract my countPlayerMarkers/countOpponentMarkers/countEmptySpaces functions further, but do I really want to?

https://www.reddit.com/r/learnjavascript/comments/s5npnl/is_it_possible_for_me_to_add_a_second_function_as/ht22oqk/?context=3

1/16
right now 2 problems I think the minimax can solve
1) it tends to keep playing straight up, usually, if there are no better moves
2) it doesn't block, it doesn't react to me getting close to 4 in a row
And I think I need to impose a tie condition; if no avail spaces, alert tie game

I added this or condition which doesn't really help, because of the loop it either piles up on the left end or right end
(positionScore > bestScore || positionScore == bestScore)

maybe randomize the bestColumn initially? But that does not solve the piling up on either end;I start off in the middle anyway

... actually, what I'll try before minimax is:

Change scoring algo: for every four spaces, if 4 same, 100 pts, 3 same 10 pts
But for 3, need to have one be empty, so vet for integers bc if 3 in a row but other is filled, no good
that way I don't have to worry about the two if loops running
use a reduce function or filter
https://www.freecodecamp.org/news/how-to-count-objects-in-an-array/
https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-70.php
use score +=
and 2 and 2 (5 pts)
and opponent piece (3 and 1) (-80 make it prefer blocking more, and also start at very negative number)
abstract the scoring out, every check with have sets of 4 anyway
also add a condtion to prefer center (50:00)






1/15 final stage
So I think I'm ready to move on to minimax
- some odd behaviors: whenever the computer doesn't have any good options, it tends to pile up choices from left to right. This makes sense because it's taking the first option if all other options are equal.
Maybe there is way to randomize when all scores are the same? Or I could add another scan for 2-in-a-rows?
- It does not block.
- I hope minimax resolves both these issues.

1/15 - the baseline algorithm telling the computer how to pick the right move is in. It doesn't block though, to see ahead, I will have to work on the minimax now. Almost done!

1/15 working on the first part of my algorithm, and debugging why it was piling up picks in column 0 and the program was allowing it choose a full column and then swap sides so 1P had to play red.

It was so interesting to console log everything and understand why this was happening. 

I have a function:

          function findAvailableSpots(board) {
          return board[0].filter(x => Number.isInteger(x) == true)
          };

This basically says "look at row 0 on the C4 board, and filter the numbers that have integers."

My row 0 on the C4 Board looks like this: [1,2,3,4,5,6,7], and if a spot is claimed, it will be replaced by a string.

If I eliminate the strings and subtract by 1, I get the indexes of the columns that are free. It worked for the 2P game.

But in the 1P game, I have this code:

     let parallelAvailable = findAvailableSpots(parallelBoard)

     for (s=0; s<parallelAvailable.length; s++) {
            score = 0
            let i;
            let j = parseInt(parallelAvailable[s] - 1)

I iterate on what findAvailableSpots() returns, and j always assumes parallelAvailable[s] will be offset by one. But when a column disappears they're no longer offset by 1,

For example in this set up, index is availspots minus 1.
     availspots: 1 2 3 4
     index:      0 1 2 3

But when 1 is filled, this is how the alignment changes:
     availspots: 2 3 4
     index:      0 1 2
Index is now availspots minus 2.

So I have to change availableSpots function to point to indexes and get the indexes of the elements in row 0 that are still intergers. This will solve the over-picking from column issue too

this was never even an issue in the 1P Easy game because the index of the reduced available spaces never mattered. but with the AI, I use a for loop where j is the column I check, and that is based on the integer, not the index, so the column being checked will skip around.

I also had bestColumn being s but it should be j because s will always tell me column 0 is a choice even when it's not because the loop always starts from 0.


1/12
I had these questions in recent days:
https://stackoverflow.com/questions/70690577/why-are-my-functions-executing-out-of-order-at-the-end-of-this-connect-four-game

https://www.reddit.com/r/learnprogramming/comments/s1bojo/dom_manipulationcss_bug_hunt_mouseover_adds_class/

https://discord.com/channels/505093832157691914/930830274151985182

https://discord.com/channels/505093832157691914/690589233919819797/930135022218932305


1/9 
Dangit, I hate CSS. I don't feel like I'm learning anything. It's just a matter of testing code changes to understand how the system interprets commands. I feel like I got nothing done today. It's all just styling. I can style, but this is like doing style with a spatula. It's just mechanical, learing about technique.

I spent the day switching the JS only code using prompts to constructing the DOM. But then I ran into issues with using a function that accesses an element in the DOM before it had been constructed.

https://discord.com/channels/505093832157691914/513125308757442562/929821898404139040
https://stackoverflow.com/questions/14028959/why-does-jquery-or-a-dom-method-such-as-getelementbyid-not-find-the-element


1/8
figuring out how to translate the array into a graphic was hard but I figured it out.
Now the issue is:

(1) getting the board to refresh (delete the old one and update) instead of simply concatenating a new one.
(2) drawing the board on each turn instead of it missing until the end.

     this is partly due to my use of prompts, which prevents the user from accessing the rest of the program's interface until the dialog box is closed
     https://stackoverflow.com/questions/55310262/how-to-fix-access-dom-in-a-loop-using-prompt
     So either I learn to use async and promises or refactor how I take input with radials or text input (probably better)
     * radios for type of game
     * textinput for choosing column 
     * once that's done switch it for a slider, mouseover lights up the box)
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

* I made some changes today to fix some issues, then I had to rewind them. Took me all day. (see Twitter for details)

1/7
- I finished with making a dumb opponent, today I work on the DOM
- then a minimax with depth

Swapped all the var for let (I always forget) Let is block scope so limits misuse.
https://codeburst.io/javascript-var-let-or-const-which-one-should-you-use-2fd521b050fa

Struggled a bit with the DOM, asked:
https://discord.com/channels/505093832157691914/513125308757442562/929069860397387836

Considered doing it with canvas:
https://stackoverflow.com/questions/55599165/trying-for-draft-a-6x6-game-board-with-2d-array

Tried Checkers as a model:
https://levelup.gitconnected.com/creating-a-board-game-checkers-with-javascript-ecd562f985c2


1/6/2022
I have 2/3 tasks left
- create the DOM
- create an automated opponent (to which the ideal minimax move will be fed)
- create a minimax with depth

This was good guidance but in python
https://www.youtube.com/watch?v=MMLtza3CZFM


1/5/2022

I had to abandon the checking mechanism I started with because it goes out of bounds, so:

1) someone suggested something using more recursive methods, map and foreach.
https://www.reddit.com/r/learnjavascript/comments/rwb7il/how_can_i_get_avoid_undefined_when_checking_a/

2) This forloop is rather elegant:
https://stackoverflow.com/questions/33181356/connect-four-game-checking-for-wins-js
https://stackoverflow.com/questions/15457796/four-in-a-row-logic

3) I could also add borders to prevent out of bounds issues
or turn each row into a string and use regex to find a match of 4
https://stackoverflow.com/questions/44936747/connect-4-algorithm-in-javascript

this was more complicated than it needed to be:
https://medium.com/@fsadikin/lessons-learned-in-making-connect-4-41c0b86df360

Also looked at this solution in Ruby (hard to follow, not that helpful)
https://discord.com/channels/505093832157691914/513125308757442562/918947467989483592


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
