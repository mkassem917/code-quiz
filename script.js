// ID Elements
var startQuiz = document.getElementById("startquiz");
var startQuizBtn = document.getElementById("startbtn");
var highScoreBtn = document.getElementById("homePageHighScore");
var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var btnA = document.getElementById("a")
var btnB = document.getElementById("b")
var btnC = document.getElementById("c")
var btnD = document.getElementById("d")
var resultsEL = document.getElementById("results");
var gameOverDiv = document.getElementById("gameOver");
var finalScoreEl = document.getElementById("finalScore");
var highScoreInputName = document.getElementById("name");
var submitScoreBtn = document.getElementById("submitScore");
var highScoreContainer = document.getElementById("highScoreContainer");
var highScorePage = document.getElementById("highScorePage");
var highScoreHeader = document.getElementById("highScoreHeader");
var highScoreDisplayName = document.getElementById("highScoreName");
var highScoreDisplayScore = document.getElementById("highScore-Score");
var endGameBtn = document.getElementById("endButtons");


//Quiz Questions
var quizQuestions = [{
        question: "An array’s length can be evaluated with the what property?",
        pickA: ".length",
        pickB: ".log",
        pickC: "the console",
        pickD: ".loop",
        correctAnswer: "a"
    },

    {
        question: "What HTML attribute references an external JavaScript file?",
        pickA: "href",
        pickB: "src",
        pickC: "class",
        pickD: "index",
        correctAnswer: "b"
    },

    {
        question: "The condition in an if/else statement is enclosed within ______.",
        pickA: "quotes",
        pickB: "curly brackets",
        pickC: "parentheses",
        pickD: "square brackets",
        correctAnswer: "c"
    },

    {
        question: "Which type of pop up box will allow a user to type a response?",
        pickA: "input",
        pickB: "prompt",
        pickC: "alert",
        pickD: "confirm",
        correctAnswer: "b"
    },

    {
        question: "Is JS case-sensitive??",
        pickA: "sometimes",
        pickB: "no",
        pickC: "yes",
        pickD: "not sure",
        correctAnswer: "c"
    },
];

//timer object variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

//function containing generated quiz questions
function generateQuizQuestion() {
    gameOverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnA.innerHTML = currentQuestion.pickA;
    btnB.innerHTML = currentQuestion.pickB;
    btnC.innerHTML = currentQuestion.pickC;
    btnD.innerHTML = currentQuestion.pickD;
}

//Start Quiz function, hides start button and displays first quiz question.
function startQuizQuestions() {
    gameOverDiv.style.display = "none";
    startQuiz.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time Remaining " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizEl.style.display = "block";
}

//Function to end the page screen that displays your score.
function showScore() {
    quizEl.style.display = "none";
    gameOverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highScoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//On click of submit we'll run the function high score
submitScoreBtn.addEventListener("click", function highScore() {
    if (highScoreInputName.value === "") {
        alert("Name can't be blank");
        return false;
    } else {
        var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        var currentUser = highScoreInputName.value.trim();
        var currentHighScore = {
            name: currentUser,
            score: score
        };

        gameOverDiv.style.display = "none";
        highScoreContainer.style.display = "flex";
        highScorePage.style.display = "block";
        endGameBtn.style.display = "flex";

        savedHighScores.push(currentHighScore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
        generateHighScores();

    }

});

//This function clears the list for the high scores and generates a new high score list from local storage
function generateHighScores() {
    highScoreDisplayName.innerHTML = "";
    highScoreDisplayScore.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i = 0; i < highScores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highScores[i].name;
        newScore.textContent = highScores[i].score;
        highScoreDisplayName.appendChild(newName);
        highScoreDisplayScore.appendChild(newScore);
    }
}

// This function displays the high scores page while hiding all of the other pages
function highScore() {
    startQuiz.style.display = "none"
    gameOverDiv.style.display = "none";
    highScoreContainer.style.display = "flex";
    highScorePage.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighScores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highScoreDisplayName.textContent = "";
    highScoreDisplayScore.textContent = "";
}

//This function sets all the variables back to their original values and let's you replay the quiz
function replayQuiz() {
    highScoreContainer.style.display = "none";
    gameOverDiv.style.display = "none";
    startQuiz.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

// This button starts the quiz!
startQuizBtn.addEventListener("click", startQuizQuestions);