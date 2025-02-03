const scoreBoard = {
    wins: 0,
    losses: 0,
    ties: 0,
}

changeScores();

//Change the Moves text.
function changeMoves(message) {
    document.querySelector('.js-moves').innerHTML = message;
}

//Change the Result of the game.
function changeResult(message) {
    document.querySelector('.js-result').innerHTML = message;
}

//Change the Scores.
function changeScores() {
    document.querySelector('.js-score').innerHTML = `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}.`;
}

//Add Event Listener to the Rock button.
document.querySelector('.js-rock-btn')
    .addEventListener('click', () => {
        checkResult('Rock');
    })

//Add Event Listener to the Paper button.
document.querySelector('.js-paper-btn')
    .addEventListener('click', () => {
        checkResult('Paper');
    })

//Add Event Listener to the Scissor button.
document.querySelector('.js-scissors-btn')
    .addEventListener('click', () => {
        checkResult('Scissors');
    })

//Add Event Listener to the Reset button.
document.querySelector('.js-reset-btn')
    .addEventListener('click', () => {
        resetScore();
    })

//Add Event Listener to the Auto Play button.
document.querySelector('.js-auto-btn')
    .addEventListener('click', () => {
        autoPlay();
    })

//Add Event Listener to the Body to play using Keyboard.
document.querySelector('body')
    .addEventListener('keydown', (event) => {
        if (event.key === 'r') {
            checkResult('Rock');
        } else if (event.key === 'p') {
            checkResult('Paper');
        } else if (event.key === 's') {
            checkResult('Scissors');
        } else if (event.key === 'Enter') {
            autoPlay();
        } else if (event.key === 'Backspace') {
            resetScore();
        }
    })

//Change text in the Auto Play button.
function changeAutoPlayButton() {
    if (isAutoPlaying) {
        document.querySelector('.auto-button').innerHTML = 'Stop Auto Play';
    } else {
        document.querySelector('.auto-button').innerHTML = 'Start Auto Play';
    }
}

//Random selection of a Move to play.
function selectComputerMove() {
    const randomNumber = Math.random();
    let randomMove = '';

    if (randomNumber >= 0 && randomNumber < (1 / 3)) {
        randomMove = 'Rock';
    } else if (randomNumber >= (1 / 3) && randomNumber < (2 / 3)) {
        randomMove = 'Paper';
    } else {
        randomMove = 'Scissors';
    }
    return randomMove;
}

//Check the result of a game with player Move.
function checkResult(move) {
    const computerMove = selectComputerMove();
    const playerMove = move;
    let result = '';

    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie';
        } else if (computerMove === 'Paper') {
            result = 'You lose';
        } else {
            result = 'You won!';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You won!';
        } else if (computerMove === 'Paper') {
            result = 'Tie';
        } else {
            result = 'You lose';
        }
    } else {
        if (computerMove === 'Rock') {
            result = 'You lose';
        } else if (computerMove === 'Paper') {
            result = 'You won!';
        } else {
            result = 'Tie';
        }
    }

    if (result === 'You won!') {
        scoreBoard.wins += 1;
    } else if (result === 'You lose') {
        scoreBoard.losses += 1;
    } else {
        scoreBoard.ties += 1;
    }

    const msgMoves = `You <img class="move-icon" src="images/${playerMove}-emoji.png"> <img class="move-icon" src="images/${computerMove}-emoji.png"> Computer`;

    changeMoves(msgMoves);
    changeResult(result);
    changeScores();
}

//Auto play functionality.
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        isAutoPlaying = true;
        changeAutoPlayButton();
        intervalId = setInterval(() => {
            const playerMove = selectComputerMove();
            checkResult(playerMove);
        }, 1500)
    } else {
        isAutoPlaying = false;
        changeAutoPlayButton();
        clearInterval(intervalId);
    }
}

//Reset the socres to 0.
function resetScore() {
    scoreBoard.wins = 0;
    scoreBoard.losses = 0;
    scoreBoard.ties = 0;

    changeResult(`Reseted!`)
    changeMoves('');
    changeScores();
}