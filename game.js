const wordToGuess = "blast";
let score = 0;
let lives = 3;
let guessedLetters = [];
const maxLives = 3;


const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const wordDisplay = document.getElementById("word-display");
const messageDisplay = document.getElementById("message");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const resetButton = document.getElementById("reset-button");

function createLetterBoxes() {
  wordDisplay.innerHTML = "";
  for (let i = 0; i < wordToGuess.length; i++) {
    const letterBox = document.createElement("div");
    letterBox.className = "letter-box";
    letterBox.setAttribute("data-index", i);
    wordDisplay.appendChild(letterBox);
  }
}



function updateWordDisplay() {
    const boxes = document.querySelectorAll(".letter-box");
    wordToGuess.split("").forEach((letter, index) => {
      if (guessedLetters.includes(letter)) {
        const letterImg = document.getElementById(`letter-${letter.toUpperCase()}`);
        if (letterImg) {
          const clone = letterImg.cloneNode(true);
          clone.style.display = "block";
          clone.width = 60;
          boxes[index].innerHTML = "";
          boxes[index].appendChild(clone);
        }
      }
    });
  }
  

function checkGameOver() {
  if (Array.from(wordDisplay.children).every(box => box.innerHTML !== "")) {
    messageDisplay.textContent = "You Win!";
    disableGame();
  } else if (lives <= 0) {
    messageDisplay.textContent = ' You Lose! The word was "Blast"';
    disableGame();
  }
}

function disableGame() {
  guessButton.disabled = true;
  guessInput.disabled = true;
}


guessButton.addEventListener("click", () => {
  const guess = guessInput.value.toLowerCase().trim();
  guessInput.value = "";

  if (!guess || guess.length !== 1) {
    messageDisplay.textContent = "⚠️ Please enter a valid single letter.";
    return;
  }

  if (guessedLetters.includes(guess)) {
    messageDisplay.textContent = "⚠️ You already guessed that letter.";
    return;
  }

  guessedLetters.push(guess);

  if (wordToGuess.includes(guess)) {
    score += 20;
    messageDisplay.textContent = "✅ Correct guess!";
  } else {
    lives--;
    messageDisplay.textContent = "❌ Wrong guess!";
  }

  scoreDisplay.textContent = score;
  livesDisplay.textContent = "❤️".repeat(lives) + "🖤".repeat(maxLives - lives);
  updateWordDisplay();
  checkGameOver();
});


resetButton.addEventListener("click", () => {
  score = 0;
  lives = maxLives;
  guessedLetters = [];
  scoreDisplay.textContent = score;
  livesDisplay.textContent = "❤️❤️❤️";
  messageDisplay.textContent = "";
  guessButton.disabled = false;
  guessInput.disabled = false;
  createLetterBoxes();
});

createLetterBoxes();
