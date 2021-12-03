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

cardArray.sort(() => 0.5 - Math.random());

const start = document.getElementById("start");
const startBtn = document.getElementById("startBtn");
const main = document.getElementById("main");
const grid = document.createElement("section");

grid.setAttribute("class", "grid");

main.appendChild(grid);

startBtn.addEventListener("click", () => {
  start.remove();
});

const scene = document.querySelector(".scene");
// const cardContainer = document.querySelector(".cardContainer");
const cardFront = document.querySelector(".cardFront");
const cardBack = document.querySelector(".cardBack");

// ADDING PARENT CONTAINER SCENE
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
  //   card2.dataset.name = item.value;
  card.appendChild(card2);
  // CARD BACK
  const card3 = document.createElement("div");
  card3.classList.add("cardBack");
  //   card3.dataset.name = item.value;
  //   card3.style.backgroundColor = "red";
  card.appendChild(card3);
});

// cardArray.forEach((item) => {
//   const card = document.createElement("div");
//   card.classList.add("card");
//   card.dataset.name = item.value;
//   card.style.backgroundImage = `url(${item.img})`;
//   grid.appendChild(card);
// });

let counter = 0;
let firstGuess = 0;
let secondGuess = 0;

const match = () => {
  let selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
  });
  firstGuess = 0;
  secondGuess = 0;
  counter = 0;
};

const noMatch = () => {
  let selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
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
      } else {
        noMatch();
      }
    }
  }
});
