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

    if (guessesLeft === 0) {
        alert('Game over! The word was: ' + selectedWord);
        resetGame();
    } else if (!guessedWord.includes('_')) {
        alert('You are a WINNER! You guessed ' + selectedWord);
        resetGame();
    }
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    guessesLeft = 10;
    guessedLetters = [];
    updateDisplay();
}

updateDisplay();
