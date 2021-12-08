// CARD DECK ARRAY
let cardArray = [
  { name: "crocodile", value: 1, img: "assets/crocodile.png" },
  { name: "crocodile", value: 1, img: "assets/crocodile.png" },
  { name: "dog", value: 2, img: "assets/dog.png" },
  { name: "dog", value: 2, img: "assets/dog.png" },
  { name: "elephant", value: 3, img: "assets/elephant.png" },
  { name: "elephant", value: 3, img: "assets/elephant.png" },
  { name: "monkey", value: 4, img: "assets/monkey.png" },
  { name: "monkey", value: 4, img: "assets/monkey.png" },
  { name: "shark", value: 5, img: "assets/shark.png" },
  { name: "shark", value: 5, img: "assets/shark.png" },
  { name: "tiger", value: 6, img: "assets/tiger.png" },
  { name: "tiger", value: 6, img: "assets/tiger.png" },
];

// ELEMENT VARIABLES
const start = document.getElementById("start");
const startBtn = document.getElementById("startBtn");
const main = document.getElementById("main");
const grid = document.createElement("section");
const startContainer = document.getElementById("startContainer");
const header = document.getElementById("header");
const movesCounter = document.getElementById("moves");
const scene = document.querySelector(".scene");
const cardFront = document.querySelector(".cardFront");
const cardBack = document.querySelector(".cardBack");

// TIMER VARIABLES
let second = 0;
let minute = 0;
let timer = document.querySelector("#timer");
let matchedCount = 0;
let interval;

// GUESS VARIABLES
let counter = 0;
let firstGuess = 0;
let secondGuess = 0;

// CLICK VARIABLES
let totalClicks = 0;
let moves = 0;

// TOTAL GAME TIME VARIABLE
let finalTime = 0;

// START SCREEN BUTTON
startBtn.addEventListener("click", () => {
  start.remove();
  deal();
  startContainer.remove();
  header.style.display = "flex";
});

// CREATE CARDS FUNCTION
function deal() {
  grid.setAttribute("class", "grid");
  main.appendChild(grid);
  cardArray.sort(() => 0.5 - Math.random());
  // ^^^^ SHUFFLE RANDOMIZER ^^^^
  cardArray.forEach((item) => {
    // CARD
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.value;
    grid.append(card);
    // CARD FRONT (COVERED)
    const card2 = document.createElement("div");
    card2.classList.add("cardFront");
    card2.style.backgroundImage = `url(${item.img})`;
    card.appendChild(card2);
    // CARD BACK (SHOWING)
    const card3 = document.createElement("div");
    card3.classList.add("cardBack");
    card.appendChild(card3);
  });
}

// CARD MATCH CHECK FUNCTIONS
const match = () => {
  let selected = document.querySelectorAll(".selected");
  grid.classList.add("lock");
  moves++;
  movesCounter.innerHTML = "Moves: " + moves;
  console.log(moves);
  selected.forEach((card) => {
    setTimeout(() => {
      grid.classList.remove("lock");
      card.classList.add("match");
    }, 700);
  });
  firstGuess = 0;
  secondGuess = 0;
  counter = 0;
  matchedCount++;
};

const noMatch = () => {
  let selected = document.querySelectorAll(".selected");
  grid.classList.add("lock");
  moves++;
  movesCounter.innerHTML = "Moves: " + moves;
  selected.forEach((card) => {
    setTimeout(() => {
      card.classList.remove("selected");
      grid.classList.remove("lock");
    }, 700);
  });
  firstGuess = 0;
  secondGuess = 0;
  counter = 0;
};

// END OF GAME FUNCTION
function gameEnd() {
  if (matchedCount === 6) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    console.log(finalTime);
    let pTime = document.querySelector(".pTime");
    let pMoves = document.querySelector(".pMoves");
    let winningTime = `${minute} minutes & ${second} seconds`;
    let winningMoves = `${moves} moves`;
    if (minute < 1) {
      winningTime = `${second} seconds`;
    } else if (minute === 1) {
      winningTime = `${minute} minute & ${second} seconds`;
    }
    pTime.innerHTML = winningTime;
    pMoves.innerHTML = winningMoves;
    let winWindow = document.querySelector(".winWindow");
    setTimeout(() => {
      winWindow.style.display = "flex";
    }, 1000);
  } else {
    return;
  }
}

// MAIN GAME LOGIC
// TO VOID CLICKING ANYTHING THAT ISN'T A CARD
grid.addEventListener("click", function (e) {
  const clicked = e.target;
  if (
    clicked.nodeName === "SECTION" ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

// ADDING CLICKS TO COUNTER  
  if (counter < 2) {
    counter++;
    totalClicks++;
    console.log(totalClicks + "hey");
    if (counter === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        match();
        gameEnd();
      } else {
        noMatch();
      }
    }
  }
  // STARTS TIMER ON FIRST CLICK OF CARD
  if (totalClicks === 1) {
    startTimer();
  }
});

// RESET BOARD FUNCTION
function reset() {
  const cards = document.querySelectorAll(".card");
  totalClicks =
    second =
    minute =
    matchedCount =
    moves =
    counter =
    firstGuess =
    secondGuess =
    finalTime =
      0;
  movesCounter.innerHTML = "Moves: " + moves;
  clearInterval(interval);
  timer.innerHTML = "0:00";
  cards.forEach((card) => {
    card.remove();
  });
  grid.remove();
  deal();
  let winWindow = document.querySelector(".winWindow");
  winWindow.style.display = "none";
}

// TIMER
function startTimer() {
  interval = setInterval(function () {
    if (second < 10) {
      timer.innerHTML = minute + ":0" + second;
    } else {
      timer.innerHTML = minute + ":" + second;
    }
    second++;
    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute === 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}
