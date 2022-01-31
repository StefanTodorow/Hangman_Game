// returns random index
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// hides the middle chars of currentWord
export function hideChars(currentWord) {
    let array = currentWord.split('');
    for (let index = 1; index < currentWord.length - 1; index++) {
        array[index] = '_';
    }
    return array.join('');
}

// easier way to get elements from HTML
export function $(selector) {
    return document.querySelector(selector);
}

// checks if the input is letter
export function isLetter(char) {
    return (/[a-zA-Z]/).test(char);
}

// reveals letter if guessed correct
export function showLetter(currWord, displayWord, letter) {
    let array = displayWord.split('');
    for (let index = 1; index < currWord.length - 1; index++) {
        if(currWord[index] === letter) {
            array[index] = letter;
        }
    }
    return array.join('');
}

// check if the word includes first and last char in the middle and shows it if it does
export function checkFirstAndLast(currentWord, displayWord) {
    displayWord = showLetter(currentWord, displayWord, currentWord[0].toLowerCase());
    displayWord = showLetter(currentWord, displayWord, currentWord[currentWord.length-1]);
    return displayWord;
}

