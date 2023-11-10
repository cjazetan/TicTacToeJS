let blocks = document.getElementsByClassName('block');
let restartBtn = document.getElementById('restart')

let turnCounter = 0;
let Xinputs = [];
let Oinputs = [];

const winCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

// Add click event listeners to each block
for (let i = 0; i < blocks.length; i++) {
  blocks[i].addEventListener('click', function () {
      addX(this);
  });
}

restartBtn.onclick = resetGame;

function addX(block)
{
  //Disallow inputs if there is already a winner
  if (checkWin(Xinputs, winCombinations) || checkWin(Oinputs, winCombinations)) {
    return;
  }
    //Add X and Switch Turns
    if(block.innerHTML === ''){
        turnCounter++;
      
        if(turnCounter % 2 === 0){
            block.innerHTML = "<img src='images/O.png' />";
            Oinputs.push(Number(block.id));
            console.log(Oinputs);

        }
        else{
            block.innerHTML = "<img src='images/X.png' />";
            Xinputs.push(Number(block.id));
            console.log(Xinputs);
        }

        //Check for win on X and O
        const XMatch = checkWin(Xinputs, winCombinations);
        const OMatch = checkWin(Oinputs, winCombinations);

        if (XMatch || OMatch){
          displayWinner(XMatch ? 'X' : 'O');
        }
        else if ( turnCounter === 9)
        {
          displayDraw();
        }
        
        
    }  
}
  
  // Function to check if Xinputs matches any combination in winCombinations
  function checkWin(inputs, winCombinations) {
    for (let i = 0; i < winCombinations.length; i++) {
      const combination = winCombinations[i];
      if (combination.every(pos => inputs.includes(pos))) {
        return true; // All positions in the combination are in inputs
      }
    }
    return false; // No winning combination found
  }

  function displayWinner(winner){
    message.innerHTML = `${winner} Wins!`;
    restartBtn.style.display = 'inline'; // Show the restart button
  }

  function displayDraw() {
    message.innerHTML = 'It\'s a draw!';
    restartBtn.style.display = 'inline'; // Show the restart button
  }


  function resetGame() {
    // Clear the board
    Array.from(blocks).forEach(block => {
      block.innerHTML = '';
    });
  
    // Reset game-related variables
    turnCounter = 0;
    Xinputs = [];
    Oinputs = [];
  
    // Clear the winner message
    message.innerHTML = '';
  
    // Hide the restart button
    restartBtn.style.display = 'none';
  }
  