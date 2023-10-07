//word library
const words = ['peanutbutter', 'jelly', 'nutella', 'banana', 'marshmellow', 'bread', 'grape', 'apple', 'pineapple', 'chocolate', 'honey', 'apricot', 'cantaloupe'];

const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e5f11a2f79msha2ec657c0ed7588p19fd9ejsn95c4765e5a6e',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};
let guessedWord;
let guessesLeft;
let guessedLetters;

async function getWord() { 
    try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
    let selectedWord = await getWord();

    console.log(selectedWord);
    selectedWord = selectedWord.word;
    console.log(selectedWord);

     guessedWord = Array(selectedWord.length).fill('_');
     guessesLeft = 7;
     guessedLetters = [];

    } 
    catch (error) {
	console.error(error);
    }
}
//getWord();
//verify API works
    //console.log(getWord())

//used chatGPT to figure out how to randomize word
//let selectedWord = words[Math.floor(Math.random() * words.length)];

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
    updateHangmanImage()
    
    //win or loss result
    if (guessesLeft === 0) {
        alert('Game over! The word was: ' + selectedWord);
        resetGame();
    } else if (!guessedWord.includes('_')) {
        alert('You are a WINNER! You guessed ' + selectedWord);
        resetGame();
    }
}

//add character pieces (with Johns help)
function updateHangmanImage() {
    const statusImage = document.getElementById('status-image');
    const wrongGuesses = guessesLeft;
    const imagesrc = `url('images/${wrongGuesses}.png')`;
    statusImage.style.backgroundImage = imagesrc;
    }
  
function resetHangmanImage() {
    const statusImage = document.getElementById('status-image');
    const wrongGuesses = guessesLeft;
    const imagesrc = `url('images/${wrongGuesses}.png')`;
    statusImage.style.backgroundImage = imagesrc;
    }
    

//reset game
function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill('_');
    guessesLeft = 7;
    guessedLetters = [];
    updateDisplay();
    updateHangmanImage();
}

updateDisplay();
