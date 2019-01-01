// ? Variables
let scores, currentScore, activePlayer, dice, isGameProgress;

appInit();


// ? roll the dice
document.querySelector('.btn-roll').addEventListener('click', function () {

    if(isGameProgress) {
        // ? create a random function that return 1 to 6 
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        
        // ? display images based on random number 
        dice.src = '../images/icons/dice-' + randomNumber +'.png';
        dice.style.display = 'block';
        
        // ? Apply Rules 
        if(randomNumber !== 1) {
            // ? keep adding the score
            currentScore += randomNumber;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        } else {
            nextPlayer();
        }
    }
});


// ? hold the score
document.querySelector('.btn-hold').addEventListener('click', function () {
    if(isGameProgress) {
        // ? add current score to the global scores array;
        scores[activePlayer] += currentScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        // ? check if the Player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'You are the Winner!';
            dice.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGameProgress = false;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer () {
    // ? change the current player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // ? reset all current score to zero
    currentScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // ? switch the active player by toggle it
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    dice.style.display = 'none';
}

// ? New Game
document.querySelector('.btn-new').addEventListener('click', appInit);

function appInit() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isGameProgress = true;

    // ? reset all score to zero;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    // ? remove the winner status if there is any
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // ? remove the active player if the game placed before
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    // ? set back to the active player
    document.querySelector('.player-0-panel').classList.add('active');

    // ? Hide the dice when page is loading
    dice = document.querySelector('.dice');
    dice.style.display = 'none';
}