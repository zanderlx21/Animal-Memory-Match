const animals = [
    "elephant",     // 0
    "crocodile",    // 1
    "tiger",        // 2
    "shark",        // 3
    "dog",          // 4
    "monkey"        // 5
]

const start = document.getElementById("start");
const startBtn = document.getElementById("startBtn");
const main = document.getElementById("main");

startBtn.addEventListener("click", () => {
    start.remove();
} );

for (i=0 ;i < 12; i++) {
let newCard = document.createElement("div");
newCard.className = "card";
newCard.addEventListener("click", () => {
    newCard.style.backgroundColor = "lightgrey";
})
main.append(newCard);
};



