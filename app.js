/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, rollButton, dice;

console.log(dice);
init();

var lastDice;
// document.querySelector('#current-' + activePlayer).textContent = dice;
// var x = (document.querySelector('#score-' + activePlayer).textContent = dice);

document.querySelector('.btn-roll').addEventListener('click', function() {
	var dice1 = Math.floor(Math.random() * 6) + 1;
	var dice2 = Math.floor(Math.random() * 6) + 1;

	//Display the result
	// var diceDOM = document.querySelector('.dice');
	document.getElementById('dice1').style.display = 'block';
	document.getElementById('dice2').style.display = 'block';
	document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
	document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
	document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
	// diceDOM.style.display = 'block';

	//Using template literals
	// diceDOM.src = `dice-${dice}.png`;

	//Updating the game scores
	document.querySelector('#score-' + activePlayer).textContent = dice;
	if (dice == 6 && lastDice == 6) {
		scores[activePlayer] = 0;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		nextPlayer();
	} else if (dice !== 1) {
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		nextPlayer();
	}
	lastDice = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	//Add current score to GLobal Score
	scores[activePlayer] += roundScore;

	//Update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	//Dynamic Endgame Score
	var input = document.querySelector('.final-score').value;
	var winningScore;

	//Undefined ,0,null are coerced to false
	if (input) {
		var winningScore = input;
	} else {
		winningScore = 100;
	}

	//Check if the player won
	if (scores[activePlayer] >= winningScore) {
		document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
		document.querySelector('.dice1').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
		// document.querySelector('.dice2').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.btn-roll').addEventListener('click', init, { once: true });
	} else {
		nextPlayer();
	}
});

function nextPlayer() {
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [ 0, 0 ];
	roundScore = 0;
	activePlayer = 0;

	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');
}
