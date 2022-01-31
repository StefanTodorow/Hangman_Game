import { wordList } from "./consts.js";
import { getRandomInt, hideChars, $, isLetter, showLetter, checkFirstAndLast } from "./utils.js";

// get random word from array of words
let currentWord = wordList[getRandomInt(wordList.length)];

// hide middle chars of the currentWord
let displayWord = hideChars(currentWord);

// get elements from HTML
let hiddenWord = $("#hiddenWord");
let label = $("#label")
let input = $("#input");
let button = $("#button");
let endText = $("#end-text");
let showLives = $("#show-lives");
let showUsedLetters = $("#show-used-letters");
let tryAgain = $("#try-again");
let lives = 3;

// add the first and last char to the usedChars
let usedChars = addFirstAndLastLetter();

// check if the word includes first and last char in the middle and show it if it does
displayWord = checkFirstAndLast(currentWord, displayWord);

// set hiddenWord's word with spaces between chars
hiddenWord.innerHTML = displayWord.split('').join(' ');

// display lives and used letters
showLives.innerHTML = 'Lives remaining: ' + lives;
showUsedLetters.innerHTML = 'Used letters: ' + usedChars;

// Click button or Enter key on the input text box
input.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        button.click();
    }
});
button.addEventListener('click', function() {
    let currLetter = input.value.toLowerCase();
    if(isLetter(currLetter) && !usedChars.includes(currLetter)) {
        // if letter is not used
        newLetter(currLetter);
    }
    // update lives and letters
    update();
    // if player is dead
    if(lives === 0) {
        badEnding();
    }
    // if player guessed the word
    if (displayWord === currentWord) {
        goodEnding();
    }
})

// animates end text and button
function animateEnding() {
    tryAgain.style.display = "block";
    endText.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 1000  
    }
    );
    tryAgain.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 1000  
    }
    );
}

// add first and last letter to the usedChars array
function addFirstAndLastLetter() {
    let array = [];
    if(currentWord[0].toLowerCase() === currentWord[currentWord.length-1]) {
        array = [currentWord[0].toLowerCase()];
    }
    else {
        array = [currentWord[0].toLowerCase(), currentWord[currentWord.length-1]];
    }
    return array;
}

// display ending scene by removing and adding elements
// if player lost all of his lives
function badEnding() {
    label.remove();
        input.remove();
        button.remove();
        endText.innerHTML = 'You died. The word was: ' + currentWord;
        animateEnding();
}
// if player guessed the word
function goodEnding() {
    label.remove();
        input.remove();
        button.remove();
        endText.innerHTML = 'Congratulations! You guessed the word!';
        animateEnding();
}

//update lives and used letters
function update() {
    showUsedLetters.innerHTML = 'Used letters: ' + usedChars;
    showLives.innerHTML = 'Lives remaining: ' + lives;
}

// if letter is correct show it, if not - take 1 live and push the letter to usedChars
function newLetter(currLetter) {
    if(currentWord.includes(currLetter)) {
        // if letter is correct
        displayWord = showLetter(currentWord, displayWord, currLetter);
        hiddenWord.innerHTML = displayWord.split('').join(' ');
    }
    else {
        // if letter is not correct
        lives--;
    }
    // clear text box
    input.value = '';
    //add the current letter
    usedChars.push(currLetter);
}