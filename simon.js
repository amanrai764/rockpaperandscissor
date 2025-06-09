let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector('h2');

// Start the game when any key is pressed
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

// Go to the next level
function levelUp() {
    userSeq = []; // Reset user sequence for the new level
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // 0 to 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    btnFlash(randBtn);
    gameSeq.push(randColor);

    console.log("Game sequence:", gameSeq);
}

// Flash a button for game-generated sequence
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash a button to indicate user interaction
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

// Check the user's answer
function checkAns() {
    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Correct so far");
        if (userSeq.length === gameSeq.length) {
            // Full correct sequence, go to next level
            setTimeout(levelUp, 1000);
        }
    } else {
        // Wrong input
        h2.innerText = 'Game over: Press any key to restart';
        console.log("Wrong input, game over");
        reset();
    }
}

// Handle user's button press
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns();
}

// Add click event to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset the game state
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
