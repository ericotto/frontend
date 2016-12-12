
var playerPicks = [];
var computerPicks = [];
var playerScore = 0;
var computerScore = 0;
var choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Event listener for Gameboard
$("#game").on("click", "button", function() {
  var choice = $(this).attr("id");
  choice = parseInt(choice);
  playerTurn(choice);
});
  
// Event listener for 'Reset' button
$("#reset").on("click", resetAll);

function playerTurn(choice) {
  // Lets player take a turn
  if (choices.indexOf(choice) === -1) {
    return;
  }
  playerPicks.push(choice);
  $("#"+choice).text("X");
  choices.splice(choices.indexOf(choice), 1);
  win(playerPicks, "player");
  computerTurn();
}

function computerTurn() {
  // Lets computer take a turn
  var computerChoice;
  var index;
  index = Math.floor(Math.random() * choices.length);
  computerChoice = choices[index];
  computerPicks.push(computerChoice);
  $("#"+computerChoice).text("O");
  choices.splice(choices.indexOf(computerChoice), 1);
  win(computerPicks, "computer")
}

function win(arr, player) {
  // Check if choice results in a win or tie
  var total;
  var wins = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], 
              [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
  if (choices.length === 1) {
    alert("Tie.");
    reset();
    return;
  }
  for (var i = 0; i < 8; i++) {
    total = 0;
    for (var j = 0; j < 3; j++) {
      if (arr.indexOf(wins[i][j]) > -1) {
        total += 1;
      }
      if (total === 3) {
        alert(player + " wins!");
        score(player);
        reset();
        return;
      }
    }
  }
}

function score(player) {
  // Adds win to scoreboard
  if (player === "player") {
    playerScore += 1;
    $("#playerScore").text(playerScore);
  } else if (player === "computer") {
    computerScore += 1;
    $("#computerScore").text(computerScore);
  }
}

function reset() {
  // Reset game to initial state
  playerPicks = [];
  computerPicks = [];
  choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 1; i < 10; i++) {
    $("#"+i).text('-');
  }
}

function resetAll() {
  // Reset session to initial state
  playerScore = 0;
  computerScore = 0;
  $("#playerScore").text(playerScore);
  $("#computerScore").text(computerScore);
  reset();
}