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
        question: "String values must be enclosed within __________ when being assigned to variables",
        option: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. paranthesis"],
        answer: "3. quotes"    
    },
    {
        question: "A very useful tool used for developing and debugging for printing content to the debugger is?",
        option: [
            "1. JavaScript",
            "2. terminal / bash",
            "3. for loops",
            "4. console log"],
        answer: "4. console log"    
        
    }
]

// element ref
let timer = document.getElementById("timer");
let timeLeft = document.getElementById("timeLeft");
let timesUp = document.getElementById("timesUp");

let startBox = document.getElementById("startBox");
let startQuiz = document.getElementById("startQuiz");

let questionBox = document.getElementById("questionBox");
let questionsState = document.getElementById("questionState");
let alpha = document.getElementById("btn0");
let bravo = document.getElementById("btn1");
let charlie = document.getElementById("btn2");
let delta = document.getElementById("btn3");
let checkAnswer = document.getElementById("checkAnswer");

let finishBox = document.getElementById("finishBox");
let finalScore = document.getElementById("finalScore");

// let inLine = document.getElementById("inLine");

// variables
let questionIndex = 0;
let correct = 0;
let questionNumber = 0;

// event listeners


startQuizBtn.addEventListener("click", start);
alpha.addEventListener("click", chooseAlpha);
bravo.addEventListener("click", chooseBravo);
charlie.addEventListener("click",chooseCharlie);
delta.addEventListener("click", chooseDelta);


let totalTime = 91

function start() {
    questionIndex = 0;
    totalTime = 90;
    timeLeft.textContent = totalTime;
    // initialInput.textContent = "";
    
    startBox.style.display = "none";
    questionBox.style.display = "block";
    timer.style.display = "block";

    let myTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(myTimer);
            if (questionIndex < questions.length -1) {
                gameOver();

            }
        }
    },1000);

    showQuiz();

};

function showQuiz() {
    nextQuestion();
}

function nextQuestion () {
    questionsState.textContent = questions[questionIndex].question;
    alpha.textContent = questions[questionIndex].option[0];
    bravo.textContent = questions[questionIndex].option[1];
    charlie.textContent = questions[questionIndex].option[2];
    delta.textContent = questions[questionIndex].option[3];
}

function verifyAnswer(answer) {

    // let inLine = document.getElementById("inLine");
    // inLine.style.display = "block";
    checkAnswer.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].option[answer]) {
        correct++;
        checkAnswer.textContent = "Correct!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        checkAnswer.textContent = "wrong!";

    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
};
       
function chooseAlpha() {verifyAnswer(0);}
function chooseBravo() {verifyAnswer(1);}
function chooseCharlie() {verifyAnswer(2);}
function chooseDelta() {verifyAnswer(3);}

function gameOver() {
    questionBox.style.display = "none";
    finishBox.style.display = "block";
    timeLeft.style.display = "none";
    timesUp.style.display = "none";

    finalScore.textContent = correct;

    // local storage



}
