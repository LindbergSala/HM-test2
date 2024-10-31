// Lista med ord att gissa på
const wordList = ["javascript", "html", "datalogi", "store", "subject", "hotel", "error", "piano", "suggestion", "transportation", "sample"];
let secretWord;
let wordState;
let guessedLetters = [];
let faultCounter = 0;
let gameOver = false;

// HTML-element för att visa spelet och meddelanden
const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const messageDiv = document.getElementById("message");
const guessedLetterDisplay = document.getElementById("guessedLetterDisplay");

// SVG-element för att visa delar av "hänga gubbe"-figuren
const hangmanParts = [
    document.getElementById("ground"),
    document.getElementById("head"),
    document.getElementById("scaffold"),
    document.getElementById("legs"),
    document.getElementById("arms"),
    document.getElementById("body")
];

// Dölj alla delar av gubben i början
hangmanParts.forEach(part => part.style.visibility = "hidden");

// Meddelanden för olika händelser
const succesMessages = ["Good choice!", "Better late than never!", "You're on a roll!"];
const failureMessages = ["Don't give up! Try again!", "Close! Try again!"];
const inputPromptMessages = ["Please enter a letter!", "Type a letter to start guessing"];
const victoryMessages = ["Congratulations! The word is: ", "Awesome! You guessed it! The word is: "];
const losingMessage = "GAME OVER";

// Funktion för att starta om spelet
function startGame() {
    secretWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    wordState = Array(secretWord.length).fill("_");
    guessedLetters = [];
    faultCounter = 0;
    gameOver = false;

    hangmanParts.forEach(part => part.style.visibility = "hidden");
    wordDisplay.innerText = wordState.join(" ");
    messageDiv.innerText = "New game! Guess the word.";
    guessedLetterDisplay.innerText = "Guessed letters:";
    letterInput.value = "";
}

// Funktion som körs när användaren gissar en bokstav
function guessLetter() {
    if (gameOver) return;

    const letter = letterInput.value.toUpperCase();
    letterInput.value = ''; // Tömmer inputfältet efter gissning

    // Kontroll om endast en bokstav är angiven
    if (letter.length === 1 && /^[A-Z]$/.test(letter)) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            guessedLetterDisplay.innerText = "Guessed letters: " + guessedLetters.join(", ");
        }

        if (secretWord.includes(letter)) {
            secretWord.split("").forEach((char, index) => {
                if (char === letter) wordState[index] = letter;
            });
            wordDisplay.innerText = wordState.join(" ");
            messageDiv.innerText = succesMessages[Math.floor(Math.random() * succesMessages.length)];

            if (!wordState.includes("_")) { // Kolla om alla bokstäver är gissade
                messageDiv.innerText = victoryMessages[Math.floor(Math.random() * victoryMessages.length)] + secretWord;
                gameOver = true;
            }
        } else {
            messageDiv.innerText = failureMessages[Math.floor(Math.random() * failureMessages.length)];
            faultCounter++;

            if (faultCounter <= hangmanParts.length) {
                hangmanParts[faultCounter - 1].style.visibility = "visible";
            }
            if (faultCounter === hangmanParts.length) {
                messageDiv.innerText = `${losingMessage} The word was: ${secretWord}`;
                gameOver = true;
            }
        }
    } else {
        messageDiv.innerText = inputPromptMessages[Math.floor(Math.random() * inputPromptMessages.length)];
    }
}


// Koppla knapparna till funktioner
document.querySelector("button[onclick='guessLetter()']").addEventListener("click", guessLetter);
document.querySelector("button[onclick='restartGame()']").addEventListener("click", startGame);

// Initiera spelet
startGame();
