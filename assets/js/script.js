// quiz questions array
const questions = [
    {
        question: "Commonly used Data Types do NOT Include?",
        option: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within __________.",
        option: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store __________.",
        option: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"],
        answer: "4. all of the above"
    },

    {
        question: "You can use the __________ function to find out if an expression is ture or false.",
        option: [
            "1. boolean()",
            "2. focus()",
            "3. matches()",
            "4. remove()"],
        answer: "1. boolean()"
    },

    {
        question: "A very useful tool used for developing and debugging for printing content to the debugger is?",
        option: [
            "1. JavaScript",
            "2. terminal / bash",
            "3. for loops",
            "4. console log"],
        answer: "4. console log"

    },
    {
        question: "Who originally wrote JavaScript?",
        option: [
            "1. Håkon Wium Lie",
            "2. Brendan Eich",
            "3. Tim Berners-Lee",
            "4. Rosemary Leith"],
        answer: "2. Brendan Eich"
    },

    {
        question: "What are containers that store values?",
        option: [
            "1. variables",
            "2. script",
            "3. string",
            "4. object"],
        answer: "1. variables"
    },

    {
        question: "Conitionals are code structures used to test if an expression returns __________ or not?",
        option: [
            "1. false",
            "2. right",
            "3. true",
            "4. if ... else"],
        answer: "3. true"
    },

    {
        question: "What method removes focus from the current window",
        option: [
            "1. close()",
            "2. moveTo()",
            "3. scrollTo()",
            "4. focus()"],
        answer: "4. focus()"
    },

    {
        question: "String values must be enclosed within __________ when being assigned to variables",
        option: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. paranthesis"],
        answer: "3. quotes"

    },
]

// element ref
let highScoreList = document.getElementById("highScoreList");
let timer = document.getElementById("timer");
let timeLeft = document.getElementById("timeLeft");
let timesUp = document.getElementById("timesUp");

let startBox = document.getElementById("startBox");
let startQuiz = document.getElementById("startQuiz");

let questionBox = document.getElementById("questionBox");
let questionState = document.getElementById("questionState");
let alpha = document.getElementById("btn0");
let bravo = document.getElementById("btn1");
let charlie = document.getElementById("btn2");
let delta = document.getElementById("btn3");

let finishBox = document.getElementById("finishBox");
let finalScore = document.getElementById("finalScore");
let userIdInput = document.getElementById("userIdInput")
let highScoreSubmit = document.getElementById("highScoreSubmit");

let highScoreBox = document.getElementById("highScoreBox");
let listOfScores = document.getElementById("listOfScores");



// variables
let questionIndex = 0;
let correct = 0;
let questionNumber = 0;

// event listeners
startQuizBtn.addEventListener("click", start);
alpha.addEventListener("click", chooseAlpha);
bravo.addEventListener("click", chooseBravo);
charlie.addEventListener("click", chooseCharlie);
delta.addEventListener("click", chooseDelta);

// clear high scores
clearBtn.addEventListener("click", function () {
    localStorage.removeItem("high scores")
});


highScoreSubmit.addEventListener("click", function (event) {
    highScores(event);
});

// view high scores
highScoreList.addEventListener("click", function () {
    highScoreBox.style.display = "block";
    startBox.style.display = "none";

    let savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }

    let storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        let eachHighScore = document.createElement("p");
        eachHighScore.innerHTML = storedHighScores[i].initials + "; " + storedHighScores[i].score;
        listOfScores.appendChild(eachHighScore);
    }
});



// quiz start
function start() {
    questionIndex = 0;
    totalTime = 30;
    timeLeft.textContent = totalTime;

    startBox.style.display = "none";
    questionBox.style.display = "block";
    timer.style.display = "block";
    highScoreList.style.display = "none"

    let myTimer = setInterval(function () {
        totalTime--;
        timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(myTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();

            }
        }
    }, 1000);

    showQuiz();

};
// quiz array is passed through
function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionState.textContent = questions[questionIndex].question;
    alpha.textContent = questions[questionIndex].option[0];
    bravo.textContent = questions[questionIndex].option[1];
    charlie.textContent = questions[questionIndex].option[2];
    delta.textContent = questions[questionIndex].option[3];
}

function verifyAnswer(answer) {


    if (questions[questionIndex].answer === questions[questionIndex].option[answer]) {
        totalTime += 5;
        correct++;
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;

    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
};

function chooseAlpha() { verifyAnswer(0); }
function chooseBravo() { verifyAnswer(1); }
function chooseCharlie() { verifyAnswer(2); }
function chooseDelta() { verifyAnswer(3); }

function gameOver() {
    questionBox.style.display = "none";
    finishBox.style.display = "block";
    timeLeft.style.display = "none";
    timesUp.style.display = "none";

    finalScore.textContent = correct;

}

function highScores(event) {
    event.preventDefault();



    finishBox.style.display = "none";
    highScoreBox.style.display = "block";
    highScoreList.style.display = "none";

    // local storage


    let savedHighScores = localStorage.getItem("high scores");
    let scoreArray;

    if (savedHighScores === null) {
        scoreArray = [];
    } else {
        scoreArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: userIdInput.value,
        score: finalScore.textContent,

    };

    scoreArray.push(userScore);

    let scoreArrayString = JSON.stringify(scoreArray);
    window.localStorage.setItem("high scores", scoreArrayString);

    showHighScores()

}

var i = 0;
function showHighScores() {

    startBox.style.display = "none";
    questionBox.style.display = "none";
    finishBox.style.display = "none";
    highScoreBox.style.display = "block";

    let savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }

    let storedHighScores = [JSON.parse(savedHighScores),
        result]

    for (; i < storedHighScores.length; i++) {
        let eachHighScore = document.createElement("p");
        eachHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfScores.appendChild(eachHighScore);
    }
};






