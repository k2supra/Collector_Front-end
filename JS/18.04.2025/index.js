const questions = 
[
    {question: '1+1=', options: ["1", "2", "3", "4"], correctAnswer: 1},
    {question: '2+2=', options: ["1", "2", "3", "4"], correctAnswer: 3},
    {question: '3+3=', options: ["4", "6", "8", "9"], correctAnswer: 1},
    {question: '4+4=', options: ["7", "8", "9", "10"], correctAnswer: 1},
    {question: '5+5=', options: ["10", "20", "30", "40"], correctAnswer: 0}
]

const modalWindow = document.getElementsByClassName("quiz-over-modal")[0];
const correctAnswer = document.getElementById("correct-answers");
const numberOfQuestion = document.getElementById("number-questions");
const numberOfAllQuestions = document.querySelectorAll("#all-questions");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");

let indexOfQuestion = 0, indexOfPage = 1;

const buttonNext = document.getElementById("next-button");
const answerTracker = document.getElementById("answer-tracker");
const buttonTryAgain = document.getElementById("try-again-button");
let answered = false;

numberOfAllQuestions.forEach(el=>el.textContent=questions.length);

const load = ()=>
{
    question.innerHTML = questions[indexOfQuestion].question;
    for (let index = 0; index < questions[indexOfQuestion].options.length; index++) {
        options[index].textContent = questions[indexOfQuestion].options[index];
    }
    numberOfQuestion.innerHTML = indexOfPage;
    indexOfPage++;
    answered = false;
    clearBg();
}


let completedQuestions = [];
let correctAnswers = [];
let wrongAnswers = -1;

const randomQuestion = ()=>
{
    let randomNumber = Math.floor(Math.random()*questions.length);    
    let dublicate = false;
    if (indexOfPage == questions.length + 1) {
        quizOver()
    }
    else
    {
        if (completedQuestions.length >= 0) {
            completedQuestions.forEach(el=>
            {
                if (el == randomNumber) {
                    dublicate = true;
                }
            }
            )
         
            if (dublicate) {
                randomQuestion();
            }
            else
            {
                indexOfQuestion = randomNumber;
                completedQuestions.push(indexOfQuestion);
                load();
                return;
            }
        }
    }
}
randomQuestion();

const quizOver = ()=>
{
    modalWindow.style.display = "flex";
    correctAnswer.textContent = correctAnswers.length;
}

options.forEach(item =>
{
    item.addEventListener("click", (event)=>
    {
        if (answered) {
            return;
        }
        if (event.target.id - 1 == questions[indexOfQuestion].correctAnswer) {
            event.target.style.background = "rgb(89, 185, 113)"; //green
            correctAnswers.push(indexOfQuestion);
        }
        else
        {
            event.target.style.background = "rgb(255, 138, 138)"; //red
            wrongAnswers++;
            colorTracker(wrongAnswers);
            checkTracker();
        }
        answered = true;
    })
}
)

function colorTracker(index) {
    answerTracker.children[index].style.backgroundColor = "rgb(255, 138, 138)";
}
function resetColorTracker() {
    for (let index = 0; index < 3; index++) {
        answerTracker.children[index].style.backgroundColor = "lightgrey";
    }
}

function clearBg() {
    options.forEach(el => el.style.backgroundColor = "lightgrey");
}
function checkTracker() {
    if (answerTracker.children[2].style.backgroundColor == "rgb(255, 138, 138)") {
        quizOver();
    }
    else return;
}

function reset() {
    indexOfQuestion = 0;
    indexOfPage = 1;
    completedQuestions = [];
    correctAnswers = [];
    wrongAnswers = -1
    resetColorTracker();
}
function tryAgain() {
    modalWindow.style.display = "none";
    reset();
    randomQuestion();
}

buttonNext.addEventListener("click", ()=>
{
    randomQuestion();
})
modalWindow.addEventListener("click", ()=>
{
    tryAgain();
})
buttonTryAgain.addEventListener("click", tryAgain());