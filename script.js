let cardArray = [
  { name: "crocodile", img: "assets/crocodile.png" },
  { name: "crocodile", img: "assets/crocodile.png" },
  { name: "dog", img: "assets/dog.png" },
  { name: "dog", img: "assets/dog.png" },
  { name: "elephant", img: "assets/elephant.png" },
  { name: "elephant", img: "assets/elephant.png" },
  { name: "monkey", img: "assets/monkey.png" },
  { name: "monkey", img: "assets/monkey.png" },
  { name: "shark", img: "assets/shark.png" },
  { name: "shark", img: "assets/shark.png" },
  { name: "tiger", img: "assets/tiger.png" },
  { name: "tiger", img: "assets/tiger.png" },
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

cardArray.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = item.name;
  card.style.backgroundImage = `url(${item.img})`;
  grid.appendChild(card);
});

// for (i = 0; i < 12; i++) {
//   let newCard = document.createElement("div");
//   newCard.className = "card";
//   newCard.addEventListener("click", () => {
//     newCard.style.backgroundColor = "lightgrey";
//   });
//   main.append(newCard);
// }

/*
for (i = 0; i < animals.length * 2; i++) {
    console.log(animals);
};
*/
