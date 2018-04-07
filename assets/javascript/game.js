
// reference to my DOM elements
var $newGameButton = document.getElementById('newGameButton');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessedLetters');
var $guessesLeft = document.getElementById('guessesLeft');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
var $notification = document.getElementById('notification');
var $pic = document.getElementById('pic');

// game variables
var wordBank = ['pivot', 'hippy jump', 'boardslide', 'impossible', 'ollie', 'wallie', 'tre flip'];
var trickPicBank = ['pivot.gif', 'hippyJump.gif', 'boardslide.gif', 'impossible.gif', 'ollie.gif', 'wallie.gif', 'treflip.gif'];
var pic = '';
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];
var notification = '';

$pic.innerHTML = '<img src="assets/images/trick/push.jpg" <alt="skateboard gif">';


// newGame() resets stats, picks new word, creates placeholders
function newGame() {

    if (!gameRunning) {
    // placeholderPic = Math.floor((Math.random() * 23) + 1);
    // console.log(placeholderPic)
    // $pic.innerHTML = '<img src="assets/images/placeholder/place' + placeholderPic +'.gif" <alt=skateboard gif">';
    $pic.innerHTML = '<img src="assets/images/trick/push.jpg" <alt="skateboard gif">';
    // reset all game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    // pick a new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // create placeholders of new pickedWord
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }

    // write new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;
    $notification.innerHTML = '*press key to guess letter*';
    
} else if (gameRunning = true) {
    $notification.innerHTML = '*press key to guess letter*';

}
}


// letterGuess function takes onkeyup event when gameRunning
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // 
        guessedLetterBank.push(letter);

        // check if guessed letter is in picked word
        for (var i = 0; i < pickedWord.length; i++) {
            // convert both values toLowerCase
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                // if match, letter placed in placeholder
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);
    }
    else {
        if (!gameRunning) {
            $notification.innerHTML = "*click button for new trick*";
        } else {
            $notification.innerHTML = "*you already guessed that letter*";
        }
    }
}  


// checkIncorrect(letter)
function checkIncorrect(letter) {
    // check if letter not in pickedWordPlaceholderArr
    if (pickedWordPlaceholderArr.indexOf(letter.toLocaleLowerCase()) === -1 &&
        pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) { 
        // decrement guesses
        guessesLeft--;
        // add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
        // write incorrectLetterBank to DOM
        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        // write new amount of guesses left to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLose();
}

// checkLose
function checkLose() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
        $pic.innerHTML = '<img src="assets/images/trick/' + trickPicBank[wordBank.indexOf(pickedWord)] + '" <alt="skateboard gif">';
        $notification.innerHTML = 'YOU LOSE! The trick was...'
    }
    checkWin();
}

// checkWin
function checkWin() {
    if (pickedWord.toLocaleLowerCase() === pickedWordPlaceholderArr.join('').toLocaleLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
        $pic.innerHTML = '<img src="assets/images/trick/' + trickPicBank[wordBank.indexOf(pickedWord)] + '" <alt="skateboard gif">';
        $notification.innerHTML = 'YOU WIN!'
    }
}


// eventListener for new game button
$newGameButton.addEventListener('click', newGame);

// onkeyup event for letterGuess()
document.onkeyup = function(event) {
    if (gameRunning && event.keyCode >= 65 && event.keyCode <= 90) {
        $notification.innerHTML = '';
        letterGuess(event.key);
    } else if (gameRunning) {
        $notification.innerHTML = '*press a valid key a-z*';
    }
}