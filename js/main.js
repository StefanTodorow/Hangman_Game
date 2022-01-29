import { wordList } from "./consts.js";
import { getRandomInt, hideChars, $, isLetter, showLetter, checkFirstAndLast } from "./funcs.js";

// get random word from array of words
var currentWord = wordList[getRandomInt(wordList.length)];

// hide middle chars of the currentWord
var displayWord = hideChars(currentWord);

// get elements from HTML
var hiddenWord = $("#hiddenWord");
var label = $("#label")
var input = $("#input");
var button = $("#button");
var endText = $("#end-text");
var showLives = $("#show-lives");
var showUsedLetters = $("#show-used-letters");
var lives = 3;

// add the first and last char to the usedChars
var usedChars = [currentWord[0].toLowerCase(), currentWord[currentWord.length-1]];

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
    var currLetter = input.value.toLowerCase();
    if(isLetter(currLetter) && !usedChars.includes(currLetter)) {
        // if letter is not used
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
    // update lives and letters
    showUsedLetters.innerHTML = 'Used letters: ' + usedChars;
    showLives.innerHTML = 'Lives remaining: ' + lives;
    // if player is dead
    if(lives === 0) {
        label.remove();
        input.remove();
        button.remove();
        endText.innerHTML = 'You died. The word was: ' + currentWord;
    }
    // if player guessed the word
    if (displayWord === currentWord) {
        label.remove();
        input.remove();
        button.remove();
        endText.innerHTML = 'Congratulations! You guessed the word!';
    }
})