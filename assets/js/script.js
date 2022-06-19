const quiz = document.getElementById("quiz");
const inform = document.getElementById("inform");
const time = document.getElementById("time");
const nav = document.body.querySelector("nav");
const container = document.getElementById("container");
const alrt = document.getElementById("alert");
const viewScores = document.querySelector("a");
const title = document.querySelector("h1");

// let randomKey;
// let keys;
let ind;
let timeLeft = 100;
let timer;
let choices = [];
let question;
let answer;
let ol;
let score = 0;
let fadeOut;
let currScore;
let timeBonus;
const lightGreen = "#d5f4e6";
let darkGreen = "#618685";
const blue = "#80ced6";
const yellow = "#fefbd8";

let questions = [
  ["HTML consists of a series of __________.", "elements"],
  ["HTML is used mostly to __________ a web page", "structure"],
  ["<!DOCTYPE html> is used ot difine a document as __________", "HTML5"],
  [
    "Stylesheet importing should be done in the __________ of an HTML document",
    "head",
  ],
  ["#'s are used to label __________", "id's"],
  [
    "__________ HTML tags clearly define the its meaning to both the browser and the developor",
    "semantic",
  ],
];
let answerArr = [
  "elements",
  "id's",
  "head",
  "semantic",
  "HTML5",
  "structure",
  "answer6",
  "answer8",
  "answer9",
  "answer10",
  "answer11",
  "answer12",
  "answer13",
  "answer14",
  "answer15",
  "answer16",
  "answer17",
  "answer18",
  "answer19",
  "answer20",
];

document.body.style.margin = "0";
document.body.style.backgroundColor = yellow;

title.style.color = darkGreen;
title.style.textShadow = "0 0 0 black";

nav.style.display = "flex";
nav.style.justifyContent = "space-between";
nav.style.borderBottom = `1px solid ${darkGreen}`;
nav.style.padding = "20px";
nav.style.backgroundColor = lightGreen;
nav.style.color = darkGreen;
nav.style.fontSize = "18pt";

viewScores.style.textDecoration = "none";
viewScores.style.color = darkGreen;
viewScores.onmouseover = () => (viewScores.style.color = "#9fa9a3");
viewScores.onmouseout = () => (viewScores.style.color = darkGreen);

container.style.display = "flex";
container.style.flexFlow = "column wrap";
container.style.alignItems = "center";
container.style.marginTop = "20px";

quiz.style.display = "flex";
quiz.style.flexFlow = "column wrap";
quiz.style.border = `2px solid ${darkGreen}`;
quiz.style.borderRadius = "6px";
quiz.style.padding = "10px";
quiz.style.width = "500px";
quiz.style.backgroundColor = lightGreen;
quiz.style.color = darkGreen;
quiz.style.boxShadow = "0 0 10px grey";

alrt.width = "100px";
alrt.style.borderRadius = "3px";
alrt.style.padding = "10px";
alrt.style.position = "absolute";
alrt.style.top = "25px";
alrt.style.left = "47vw";
alrt.style.boxShadow = "0 0 5px grey";
alrt.style.display = 'none'

time.textContent = timeLeft;

const showScores = () => {
  quiz.innerHTML = "";
  let highScores = JSON.parse(localStorage.getItem("highScores"));
  console.log(highScores);
  const h2 = document.createElement("h2");
  h2.textContent = "Highscores";
  const keys = Object.keys(highScores);
  keys.sort().reverse();
  let ol = document.createElement("ol");
  keys.forEach((prop) => {
    let thisScore = highScores[prop];
    let li = document.createElement("li");
    li.textContent = `${prop}: ${thisScore}`;
    ol.append(li);
  });
  quiz.append(h2);
  quiz.append(ol);
};

viewScores.onclick = showScores;

const startPrompt = () => {
  const intro = document.createElement("h3");
  intro.textContent = "Time to test your coding knowledge!";
  quiz.append(intro);
  const scoring = document.createElement("p");
  scoring.innerHTML =
    "<b><u>Scoring:</u></b><br><b>Correct Answer:</b> + 500 points<br><b>Wrong Answer:</b> - 15 seconds<br><b>Time:</b> 100 points per remaining second";
  quiz.append(scoring);
  let start = document.createElement("button");
  start.textContent = "Start Quiz";
  start.onclick = startQuiz;
  start.style.backgroundColor = blue;
  start.style.borderRadius = "3px";
  start.style.boxShadow = "0 3px 3px grey";
  quiz.append(start);
};

const startQuiz = () => {
  startTimer();
  generateQuestion();
  let scoreCard = document.createElement("section");
  scoreCard.innerHTML = `<h1>Score:</h1> <span id=currScore>${score}</span>`;
  scoreCard.style.marginTop = "20px";
  scoreCard.style.color = darkGreen;
  scoreCard.style.textShadow = "0 0 0 grey";
  scoreCard.style.textAlign = "center";
  container.append(scoreCard);
  currScore = document.getElementById("currScore");
  currScore.style.fontSize = "18pt";
  timeBonus = timeLeft * 100;
  currScore.textContent = score + timeBonus;
};

const startTimer = () => {
  timer = setInterval(() => {
    timeLeft--;
    time.textContent = timeLeft;
    timeBonus = timeLeft * 100;
    currScore.textContent = score + timeBonus;
    if (timeLeft <= 0) clearInterval(timer);
  }, 1000);
};

const generateQuestion = () => {
  quiz.innerHTML = "";
  let choiceArr = [...answerArr];
  let questArr = randomQuestion(questions);
  question = questArr[0];
  answer = questArr[1];
  choices = [];

  questions.splice(ind, 1);
  console.log(questions);

  for (let i = 0; i < 4; i++) {
    let index =
      i == 0
        ? choiceArr.indexOf(answer)
        : (Math.random() * choiceArr.length) << 0;
    choices.push(choiceArr[index]);
    choiceArr.splice(index, 1);
  }

  addQuestion();
  addListeners();
};

const randomQuestion = (questions) => {
  // keys = Object.keys(questions);
  // randomKey = (keys.length * Math.random()) << 0;
  // return questions[keys[randomKey]];
  ind = (questions.length * Math.random()) << 0;
  return questions[ind];
};

const addQuestion = () => {
  const h3 = document.createElement("h3");
  quiz.append(h3);
  h3.textContent = question;
  for (let i = 0; i < 4; i++) {
    let index = (Math.random() * choices.length) << 0;
    let choice = choices[index];
    const li = document.createElement("li");
    const btn = document.createElement("button");
    if (i === 0) {
      ol = document.createElement("ol");
      quiz.append(ol);
    }

    li.style.listStyle = "none";
    li.style.marginTop = "5px";

    btn.classList.add("choice");
    btn.style.borderRadius = "3px";
    btn.style.backgroundColor = blue;
    btn.textContent = `${i + 1}. ${choice}`;

    li.append(btn);
    ol.append(li);
    choices.splice(index, 1);
  }
};

const addListeners = () => {
  ol.addEventListener("mouseover", (e) => {
    if (e.target.classList[0] !== "choice") return;
    e.target.style.backgroundColor = darkGreen;
    e.target.style.color = "white";
  });

  ol.addEventListener("mouseout", (e) => {
    if (e.target.classList[0] !== "choice") return;
    e.target.style.backgroundColor = blue;
    e.target.style.color = "black";
  });

  ol.addEventListener("click", (e) => {
    clearInterval(fadeOut);
    if (e.target.classList[0] !== "choice") return;
    if (e.target.textContent.indexOf(answer) > -1) {
      score += 500;
      alrt.textContent = "Correct!";
      alrt.style.border = "1px solid green";
      alrt.style.backgroundColor = "lightgreen";
    } else {
      alrt.style.border = "1px solid red";
      alrt.style.backgroundColor = "pink";
      alrt.textContent = "Wrong!";
      timeLeft -= 15;
      time.textContent = timeLeft <= 0 ? 0 : timeLeft;
      if (timeLeft <= 0) clearInterval(timer);
    }
    currScore.textContent = score + timeBonus;
    alrt.style.display = "";
    fadeOut = setTimeout(() => {
      alrt.style.display = "none";
    }, 3000);
    if (questions.length - 1 > 0) generateQuestion();
    else recordScore();
  });
};

const recordScore = () => {
  clearInterval(timer);
  quiz.innerHTML = "";
  const form = document.createElement("form");
  const initials = document.createElement("input");
  const submit = document.createElement("input");
  const label = document.createElement("label");
  initials.type = "text";
  initials.name = "initials";
  initials.id = "initials";
  initials.style.display = "block";
  initials.style.margin = "5px";
  label.for = "initials";
  label.textContent = "Enter Initials To Record Score:";
  label.style.display = "block";
  label.style.margin = "5px";
  submit.type = "submit";
  submit.style.display = "block";
  submit.style.margin = "5px";
  quiz.append(form);
  form.append(label);
  form.append(initials);
  form.append(submit);
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("initials").value;
    let myScore = currScore.textContent;
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(highScores);
    if (!!highScores) {
      highScores[name] = myScore;
      localStorage.setItem("highScores", JSON.stringify(highScores));
    } else {
      highScores = {};
      highScores[name] = myScore;
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
  });
};

startPrompt();
