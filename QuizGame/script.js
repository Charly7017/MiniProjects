const answersList = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Mark Twain", "Charles Dickens", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Which language is primarily spoken in Brazil?",
        options: ["Spanish", "Portuguese", "English", "French"],
        answer: "Portuguese"
    }
];

let questionsCount = 0;
let questionsScore = 0;
let quizQuestionsContainer;
const generalContainer = document.querySelector(".container");
const startQuizContainer = document.querySelector(".startQuiz");
const btnStartQuiz = document.querySelector(".startQuiz__button");
const countDownContainer = document.querySelector(".countDownContainer");

const quizResultContainer = document.querySelector(".quiz-results");
const btnRestartQuiz = document.querySelector(".quiz-results__restartButton");

btnStartQuiz.addEventListener("click",startQuiz);
btnRestartQuiz.addEventListener("click",restartQuiz)
function startQuiz(){
    dissapearElement(startQuizContainer);
    showElement(countDownContainer); 
    let countdown = 3;
    const interval = setInterval(() => {
        countDownContainer.textContent = --countdown;
        if(countdown === 0){
            clearInterval(interval);
            dissapearElement(countDownContainer);
            quizQuestionsContainer = createQuizContainerQuestions();
            showElement(quizQuestionsContainer);
        }

    }, 1000); 
}

function restartQuiz(){
    location.reload();
}

function dissapearElement(element){
    element.style.display = "none";
}

function showElement(element){
    if(element.classList.contains("quizQuestions")){
        element.classList.add("quizQuestionsFlex");
    }
    else if(element.classList.contains("quiz-results")){
        element.classList.add("quiz-resultsFlex");
    }
    else if(element.classList.contains("startQuiz")){
        element.style.display = "flex";
    }
    else{
        element.style.display = "block";
    }
}

function createQuizContainerQuestions(){
    const container = document.querySelector(".quizQuestions");
    container.innerHTML = '';

    if(questionsCount === 5){
        showMessageFinish();
        return;
    }

    const h2 = document.createElement("h2");
    h2.classList.add("quizQuestions__title");
    h2.innerText = answersList[questionsCount].question;

    const divScoreAndCount = document.createElement("div");
    divScoreAndCount.classList.add("quizQuestions__scoreAndcount");

    const spanCount = document.createElement("span");
    spanCount.innerText = `Question ${questionsCount + 1} of 5`;

    const spanScore = document.createElement("span");
    spanScore.innerText = `Score: ${questionsScore}`;

    divScoreAndCount.appendChild(spanCount);
    divScoreAndCount.appendChild(spanScore);


    const ul = document.createElement("ul");
    ul.classList.add("quizQuestions__list");

    answersList[questionsCount].options.forEach(element => {
        const li = document.createElement("li"); 
        li.addEventListener("click",checkResult);
        li.classList.add("quizQuestions__option");
        li.innerText = element;
        ul.appendChild(li);
    });

    const progressBar = document.createElement("progress");
    progressBar.classList.add("quizQuestions__progressBar");
    progressBar.max = "5";
    progressBar.value = questionsScore; 
    container.appendChild(h2);
    container.appendChild(divScoreAndCount);
    container.appendChild(ul);
    container.appendChild(progressBar);
    
    return container;

}

function checkResult(e){
    const selectedResult = e.target.innerText
    if(answersList[questionsCount].answer === selectedResult){
        questionsCount++;
        questionsScore++;
    }
    else{
        questionsCount++;
    }
    createQuizContainerQuestions();
}

function showMessageFinish(){
    const textScore = document.querySelector(".quiz-results__text");
    const textMessage = document.querySelector(".quiz-results__message");
    textScore.innerText = `You scored ${questionsScore} out of 5`;
    showElement(quizResultContainer);
    switch(questionsScore){
        case 0: textMessage.innerText = "Keep studying! You'll get better!"
        break;
        case 1: textMessage.innerText = "Not bad! Try again to improve!"
        break;
        case 2: textMessage.innerText = "You're improving! Keep going!"
        break;
        case 3: textMessage.innerText = "Good effort! Keep learning!"
        break;
        case 4: textMessage.innerText = "Great job! You know your stuff!"
        break;
        case 5: textMessage.innerText = "Perfect! You're a genius!"    
        break;              
    }
}

