let secretNumber = null;
let attempts = 0;
let guesses = [];
let gameRunning = false;
const localStorageKey = "history";

const startSection = document.getElementById("startSection");
const gameSection = document.getElementById("gameSection");

const startButton = document.getElementById("startBtn");
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const restartBtn = document.getElementById("restartBtn");
const resultText = document.getElementById("resultText");
const attemptCount = document.getElementById("attemptCount");
const historyList = document.getElementById("historyList");

function random1to100() {
    return Math.floor(Math.random() * 100) + 1;
}

function show(section) {
    section.classList.add("show");
}

function hide(section) {
    section.classList.remove("show");
}

function readHistory() {
    const history = localStorage.getItem(localStorageKey);
    return history ? JSON.parse(history) : [];
}

writeHistory = (items) => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
}

function renderHistory() {
    const items = readHistory();
    historyList.innerHTML = "";

    if (items.length === 0) {
        const div = document.createElement("div");
        div.className = "historyEmpty";
        div.textContent = "No game history available.";
        historyList.appendChild(div);
        return;
    }

    items.slice().reverse().forEach(item => {
        const div = document.createElement("div");
        div.className = "historyItem";

        div.innerHTML = iv.innerHTML =
            "<strong>Game #" + (items.length - idx) + "</strong><br>" +
            "Secret number: <strong>" + g.secret + "</strong><br>" +
            "Attempts: <strong>" + g.attempts + "</strong><br>" +
            "Tips: " + (g.guesses.length ? g.guesses.join(", ") : "-");
        historyList.appendChild(div);
    });
}

function startGame() {
    secretNumber = random1to100();
    attempts = 0;
    guesses = [];
    gameRunning = true;

    attemptCount.textContent = 0;
    resultText.textContent = "Start guessing";
    guessInput.value = "";
    guessInput.disabled = false;
    restartBtn.style.display = "none";

    hide(startSection);
    show(gameSection);

    guessInput.focus();
}

function endGame() {
    gameRunning = false;
    resultText.textContent = "Congratulations! You've guessed the number " + secretNumber + " in " + attempts + " attempts.";
    guessInput.disabled = true;
    restartBtn.style.display = "inline-block";

    const items = readHistory();
    items.push({
        secret: secretNumber,
        attempts: attempts,
        guesses: guesses
    });
    writeHistory(items);
    renderHistory();
}

startButton.addEventListener("click", startGame);

guessForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!gameRunning) return;

    const guess = parseInt(guessInput.value, 10);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        resultText.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }

    attempts++;
    guesses.push(guess);
    attemptCount.textContent = attempts;

    if (guess < secretNumber) {
        resultText.textContent = "Too low! Try again.";
    } else if (guess > secretNumber) {
        resultText.textContent = "Too high! Try again.";
    }
    else {
        endGame();
    }

    guessInput.value = "";
    guessInput.focus();
});

restartBtn.addEventListener("click", startGame);
renderHistory();
show(startSection);
hide(gameSection);

