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

// cardArray.sort(() => 0.5 - Math.random());

const start = document.getElementById("start");
const startBtn = document.getElementById("startBtn");
const main = document.getElementById("main");
const grid = document.createElement("section");
const startContainer = document.getElementById("startContainer");
const header = document.getElementById("header");
const movesCounter = document.getElementById("moves");

grid.setAttribute("class", "grid");

main.appendChild(grid);

startBtn.addEventListener("click", () => {
  start.remove();
  startContainer.remove();
  header.style.display = "flex";
  startTimer();
});

function reset() {
  location.reload();
}

// TIMER
let second = 0;
let minute = 0;
let timer = document.querySelector("#timer");
let matchedCount = 0;
let interval;
function startTimer() {
  interval = setInterval(function () {
    if (minute === 0) {
      timer.innerHTML = minute + ":" + second;
    }
    // else {
    //   timer.innerHTML = minute + " minutes " + second + " seconds";
    // }
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

//MOVES
let moves = 0;

// CREATE CARDS
const scene = document.querySelector(".scene");
const cardFront = document.querySelector(".cardFront");
const cardBack = document.querySelector(".cardBack");

cardArray.forEach((item) => {
  // CARD
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = item.value;
  grid.append(card);
  // CARD FRONT
  const card2 = document.createElement("div");
  card2.classList.add("cardFront");
  card2.style.backgroundImage = `url(${item.img})`;
  card.appendChild(card2);
  // CARD BACK
  const card3 = document.createElement("div");
  card3.classList.add("cardBack");
  card.appendChild(card3);
});

let counter = 0;
let firstGuess = 0;
let secondGuess = 0;

const match = () => {
  let selected = document.querySelectorAll(".selected");
  // let match = document.querySelectorAll(".match");
  grid.classList.add("lock");
  moves++;
  movesCounter.innerHTML = "Moves: " + moves;
  console.log(moves);
  selected.forEach((card) => {
    setTimeout(() => {
      grid.classList.remove("lock");
      card.classList.add("match");
    }, 1000);
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
  // selected.forEach((card) => {
  //   setTimeout(() => {
  //     card.classList.add("noMatch");
  //   }, 500);
  // });
  selected.forEach((card) => {
    setTimeout(() => {
      card.classList.remove("selected");
      grid.classList.remove("lock");
    }, 1000);
  });
  firstGuess = 0;
  secondGuess = 0;
  counter = 0;
};

grid.addEventListener("click", function (e) {
  const clicked = e.target;
  if (
    clicked.nodeName === "SECTION" ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

  if (counter < 2) {
    counter++;
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
});

let finalTime = 0;

function gameEnd() {
  if (matchedCount === 6) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    console.log(finalTime);
    let para2 = document.querySelector(".para2");
    let winningText = `It took you ${finalTime} to complete the game.`;
    para2.innerHTML = winningText;
    let winWindow = document.querySelector(".winWindow");
    setTimeout(() => {
      winWindow.style.display = "flex";
    }, 1500);
  } else {
    return;
  }
}
