/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, gamePlaying;
var twoSix = [0,0];

function initialize(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  //document.querySelector('#current-' + activePlayer).textContent = dice;
  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
  //var x = document.querySelector('#score-0').textContent;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('active');
}

initialize();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
  //displays the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.jpg';
  //Update the round score if the number != 1
    if (dice !== 1) {  //double == for no type coercion
      //adds score to the current
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      breaking();
    } else {
      //continues to the next player
      nextPlayer();
    }
  }
});

function breaking() {
  if (dice === 2 ) {
    twoSix[0] = 1;
  } else if (dice === 2 && twoSix[0] === 1) {
      nextPlayer();
    } else {
      twoSix[0] = 0;
    }
};

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
  //add current score to the global score
  scores[activePlayer] += roundScore;
  //update the interface
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  var input = document.querySelector('.final-score').value;
  var winningScore;
  //if nothing is inputted,, the default is false
  if (input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }
  //check if player won the game
  if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
  } else {
    nextPlayer();
  }
  //document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}
});

document.querySelector('.btn-new').addEventListener('click', initialize);


/* Dont repeat yourself idealology!!*/
function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};
