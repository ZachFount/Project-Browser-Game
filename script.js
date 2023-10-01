//word library
const words = ['peanutbutter', 'jelly', 'nutella', 'banana', 'marshmellow', 'bread', 'grape', 'apple', 'pineapple', 'chocolate', 'honey', 'apricot', 'cantaloupe'];

//used chatGPT to figure out how to randomize word
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill('_');
let guessesLeft = 10;
let guessedLetters = [];

function updateDisplay() {
    document.getElementById('word-display').innerText = guessedWord.join(' ');
    document.getElementById('guess-count').innerText = guessesLeft;
    document.getElementById('guessed-letters-display').innerText = guessedLetters.join(', ');
}
// Guessed letter input
function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();

    if (guessedLetters.includes(guess)) {
        alert('You already guessed that letter!');
        return;
    }

    guessedLetters.push(guess);
    guessInput.value = '';

    if (selectedWord.includes(guess)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                guessedWord[i] = guess;
            }
        }
    } else {
        guessesLeft--;
    }

    updateDisplay();

    //win or loss result
    if (guessesLeft === 0) {
        alert('Game over! The word was: ' + selectedWord);
        resetGame();
    } else if (!guessedWord.includes('_')) {
        alert('You are a WINNER! You guessed ' + selectedWord);
        resetGame();
    }
}

//add character pieces (cited: https://github.com/thepeekay/simple-javascript-games/tree/main/hangman)
let lives = guessesLeft;
let hangmanImage = document.createElement('img');
hangmanImage.setAttribute('src', `hangman-${guessesLeft}.png`);
gameContainer.appendChild(hangmanImage);


function handleLetterInput() {
    let guessedLetter = letterInput.value;
  
    if (!selectedWord.includes(guessedLetter)) {
      guessesLeft--;
      livesDisplay.innerText = `Lives: ${guessesLeft}`;
      hangmanImage.setAttribute('src', `hangman-${guessesLeft}.png`);
    }
  }

//reset game
function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    guessesLeft = 10;
    guessedLetters = [];
    updateDisplay();
}

updateDisplay();
