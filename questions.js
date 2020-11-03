var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        Choices: ["string", 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        title: "The condition in an if / else statment is enclosed within ____.",
        Choices: ["quotes", 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses'
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        Choices: ["numbers and strings", 'other arrays', 'booleans', 'all of the above'],
        answer: 'alerts'
    },
    {
        title: "String value must be enclosed within ___ when being assigned to variables.",
        Choices: ["commas", 'curly brackets', 'quotes', 'parenthesis'],
        answer: 'quotes'
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        Choices: ["JavaScript", 'Terminal / Bash', 'for loops', 'console log'],
        answer: 'console log'
    },
];

var score = 0;
var questionIndex = 0;

var curentTime = document.querySelector('#currentTime');
var timer = document.querySelector('#startTime');
var questionsDiv = document.querySelector('#questionsDiv');
var wrapper = document.querySelector('#wrapper');

var secondsleft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function (){
    if (holdInterval === 0){
        holdInterval = setInterval(function(){
            secondsleft--;
            curentTime.textContent = "Time: " + secondsleft;

            if (secondsleft <= 0){
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!"
            }
        }, 1000)
    }
    render(questionIndex);
});

function render(questionIndex){
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++){
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].Choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem){
        var listItem = document.createElement("li");
        listItem.textContent= newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")){

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer){
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsleft = secondsleft - penalty;
            createDiv.textContent = "wrong! The correct answer is: " + questions[questionIndex].answer;
        }
    }

    questionIndex++;

    if (questionIndex >= questions.length){
        allDone();
        createDiv.textContent = "Quiz Completed!" + " " + "You got " + score + "/" +questions.length + " Correct!!!";
    } else {
        reder(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
function allDone(){
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document. createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsleft >= 0){
        var timeRemaining = secondsleft;
        var createP = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    //label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your Initials: ";

    questionsDiv.appendChild(createLabel);

    //input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);


    createSubmit.addEventListener("click", function (){
        var initials = createInput.value;

        if(initials === null){
            console.log("No value entered!");

        }else{
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage = setItem("allScores", newScore);
            window.location.replace("./HighScore.html");
        }
    });

}