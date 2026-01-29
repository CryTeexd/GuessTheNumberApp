let secretNumber = null;
let attempts = 0;
let guesses = [];
let gameRunning = false;
const localStorageKey = "history";

const startSection = document.getElementById("startSection");
const gameSection = document.getElementById("gameSection");

const startButton = document.getElementById("startButton");
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const restartBtn = document.getElementById("restartBtn");
const resultText = document.getElementById("resultText");
const attemptCount = document.getElementById("attemptCount"); 
const historyList = document.getElementById("historyList");
