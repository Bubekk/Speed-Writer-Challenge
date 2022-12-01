/* ******************************************* Declarations ********************************************* */

let min = document.getElementById("minutes");
let mins = 00;
let sec = document.getElementById("seconds");
let secs = 00;
let msec = document.getElementById("miliseconds");
let msecs = 00;
let Interval;
let intervalText;

let startTimerCount = document.getElementById("start");
let resetTimer = document.getElementById("reset-time");

let textToWrite = document.getElementById("text-to-write");
let resetText = document.getElementById("reset-text");
let textArrEasy = ["Text to write", 
                "Peter Piper picked a peck of pickled peppers", 
                "How can a clam cram in a clean cream can?",
                "I thought I thought of thinking of thanking you",
                "Wayne went to wales to watch walruses",
                "Eddie edited it",
                "Eleven benevolent elephants"];

let input = document.getElementById("write-input");

let scrBtn = document.getElementById("score-btn");
let scrDiv = document.getElementById("score-div");
let username = document.getElementById("username");
let scoreList = document.getElementById("score-list");
let scoreCount = 0;

let inpDiv = document.getElementById("userform");
let inpBtn = document.getElementById("user-btn");
let usernameInput = document.getElementById("username-input");
let alert = document.getElementById("alert");

let instructions = document.getElementById("instructions");
let instructionsBtn = document.getElementById("instructions-btn");

/* ****************************************** Timer functions ****************************************** */

function startTimer() {
    msecs++
    msec.innerHTML = msecs;
    sec.innerHTML = secs;
    min.innerHTML = mins;

    if (msecs <= 9) {
        msec.innerHTML = "0" + msecs;
    };

    if (secs <= 9) {
        sec.innerHTML = "0" + secs;
    };

    if (mins <= 9) {
        min.innerHTML = "0" + mins;
    };

    if (msecs > 99) {
        secs++;
        msecs = 00;
    };

    if (secs > 59) {
        mins++;
        secs = 00;
    };

};

startTimerCount.addEventListener ("click", function () {
    Interval = setInterval(startTimer, 10);
});

resetTimer.addEventListener("click", function () {
    clearInterval(Interval);
    msecs = "00";
    secs = "00";
    msec.innerHTML = msecs;
    sec.innerHTML = secs;
    textAnimateReset();
    input.value = "";
});

function start() {
    if (inpDiv.classList != "unactive") {
      moveInput();
    } else if (inpDiv.classList == "unactive") {
        clearInterval(Interval);
        msecs = "00";
        secs = "00";
        msec.innerHTML = msecs;
        sec.innerHTML = secs;
        Interval = setInterval(startTimer, 10);
        intervalText = setInterval(textCheck, 10);
        textAnimateReset();
    };
};

document.addEventListener("keydown", event => {
    if (event.code === "Enter") {
        start();
    };
  })

  document.addEventListener("keydown", event => {
    if (event.code === "Escape") {
        clearInterval(Interval);
        msecs = "00";
        secs = "00";
        msec.innerHTML = msecs;
        sec.innerHTML = secs;
        clearInterval(intervalText);
        randomizeText();
        textAnimateReset();
        input.value = "";
    };
  })

/* **************************************** Text to write randomize ************************************* */

function randomizeText() {
    textToWrite.innerHTML = textArrEasy[Math.floor(Math.random() * textArrEasy.length)];
    textAnimateReset();
};

window.onload = randomizeText();

resetText.addEventListener("click", function () {
    randomizeText();
    input.value = "";
});

/* ******************************************* Text validation ******************************************* */

function textCheck () {
    if (input.value !== textToWrite.innerHTML) {
        console.log("it's not Ok");
        return;
    } else {
        clearInterval(Interval);
        clearInterval(intervalText);
        textAnimate();
        addScore(min, sec, msec);
        return console.log("OK");
    };
};

/* ******************************************* Text decorations ******************************************* */

function textAnimate() {
    textToWrite.style.color = "rgb(24, 134, 13)";
    textToWrite.style.fontSize = "3em";
};

function textAnimateReset() {
    textToWrite.style.color = "white";
    textToWrite.style.fontSize = "2.5em";
};

/* ********************************************* Score board ********************************************* */

function moveBoard() {
    if(scrDiv.classList == "unactive") {
        scrDiv.style.transform = "translate(0, 0)";
        scrDiv.classList = "active";
    } else if (scrDiv.classList == "active") {
        scrDiv.style.transform = "translate(-550px, -550px)";
        scrDiv.classList = "unactive";
    };
    
};

scrBtn.addEventListener("click", moveBoard);

function addScore(m, s, ms) {
    scoreCount++;
    scoreList.innerHTML += `<li>` + "Score " + scoreCount + ": " + m.innerHTML + ":" + s.innerHTML + ":" + ms.innerHTML + `</li>`;
};

/* ********************************************* Input board ********************************************* */

function moveInput() {
    if (usernameInput.value !== "") {
        inpDiv.style.transform = "translateX(100vw)"
        inpDiv.classList = "unactive";
        getUsername();
        moveInstructions();
    } else {
        alert.innerHTML = "Hey! Where you going? Write your name"
    };
};

function getUsername() {
    username.innerHTML = usernameInput.value;
};

inpBtn.addEventListener("click", moveInput);

/* ****************************************** Instructions board ***************************************** */

function moveInstructions() {
    if(instructions.classList == "unactive") {
        instructions.style.transform = "translateX(35vw)";
        instructions.classList = "active";
    } else if (instructions.classList == "active") {
        instructions.style.transform = "translateX(100vw)";
    };
};

instructionsBtn.addEventListener("click", moveInstructions);