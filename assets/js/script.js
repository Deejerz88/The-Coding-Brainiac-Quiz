const quiz = document.getElementById("quiz");
const inform = document.getElementById("inform");
const time = document.getElementById("time");
const nav = document.body.querySelector("nav");
const container = document.getElementById("container");
const alrt = document.getElementById("alert");
const viewScores = document.querySelector("a");
const title = document.querySelector("h1");

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
const start = document.createElement("button");
const aStyl = alrt.style;
const nStyl = nav.style;
const cStyl = container.style;
const stStyl = start.style

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


nStyl.display = "flex";
nStyl.justifyContent = "space-between";
nStyl.borderBottom = `1px solid ${darkGreen}`;
nStyl.padding = "20px";
nStyl.backgroundColor = lightGreen;
nStyl.color = darkGreen;
nStyl.fontSize = "18pt";
nStyl.boxShadow = `inset 0px 0px 3px ${darkGreen}, 0px 2px 2px grey`;

viewScores.style.textDecoration = "none";
viewScores.style.color = darkGreen;
viewScores.onmouseover = () => (viewScores.style.color = "#9fa9a3");
viewScores.onmouseout = () => (viewScores.style.color = darkGreen);

cStyl.display = "flex";
cStyl.flexFlow = "column wrap";
cStyl.alignItems = "center";
cStyl.marginTop = "20px";

const qStyl = quiz.style;
qStyl.display = "flex";
qStyl.flexFlow = "column wrap";
qStyl.border = `2px solid ${darkGreen}`;
qStyl.borderRadius = "6px";
qStyl.padding = "20px";
qStyl.width = "500px";
qStyl.backgroundColor = lightGreen;
qStyl.color = darkGreen;
qStyl.boxShadow = "0 0 10px grey";

alrt.width = "100px";
aStyl.borderRadius = "6px";
aStyl.padding = "10px";
aStyl.position = "absolute";
aStyl.top = "25px";
aStyl.left = "47vw";
aStyl.boxShadow = "0 0 5px grey";
aStyl.display = "none";
aStyl.color = "grey";

time.textContent = timeLeft;

start.textContent = "Start Quiz";
stStyl.backgroundColor = blue;
stStyl.borderRadius = "6px";
stStyl.boxShadow = "0 3px 3px grey";
stStyl.marginTop = '15px'
start.classList.add("choice");

const showScores = () => {
  quiz.innerHTML = "";
  const highScores = JSON.parse(localStorage.getItem("highScores"));
  const h2 = document.createElement("h2");
  h2.textContent = "Highscores";
  quiz.append(h2);
  const entries = Object.entries(highScores)
  entries.sort((a, b) => { return b[1] - a[1] })
  entries.forEach((entry, i) => {
    const thisScore = entry[1];
    const thisName = entry[0]
    const span = document.createElement("span");
    span.textContent = `${i + 1}. ${thisName}: ${thisScore}`;
    if (i % 2 === 0) span.style.backgroundColor = blue;
    span.style.padding = "5px";
    span.style.fontWeight = "bold";
    start.onclick = () => location.reload()
    quiz.append(span);
    quiz.append(start)
  });
};

viewScores.onclick = showScores;

const startPrompt = () => {
  quiz.innerHTML = ''
  const intro = document.createElement("h3");
  intro.textContent = "Time to test your coding knowledge!";
  quiz.append(intro);
  const scoring = document.createElement("p");
  scoring.innerHTML =
    "<b><u>Scoring:</u></b><br><b>Correct Answer:</b> + 500 points<br><b>Wrong Answer:</b> - 15 seconds<br><b>Time:</b> 100 points per remaining second";
  start.onclick = startQuiz;
  quiz.append(scoring);
  quiz.append(start);
  addListeners();
};

const startQuiz = () => {
  startTimer();
  generateQuestion();
  const scoreCard = document.createElement("section");
  const scStyl = scoreCard.style;
  scoreCard.innerHTML = `<h1>Score:</h1> <span id=currScore>${score}</span>`;
  scStyl.marginTop = "20px";
  scStyl.color = darkGreen;
  scStyl.textShadow = "0 0 0 grey";
  scStyl.textAlign = "center";
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
    if (timeLeft <= 0) {
      clearInterval(timer);
      recordScore();
    }
  }, 1000);
};

const generateQuestion = () => {
  quiz.innerHTML = "";
  const choiceArr = [...answerArr];
  const questArr = randomQuestion(questions);
  question = questArr[0];
  answer = questArr[1];
  choices = [];

  questions.splice(ind, 1);
  // console.log(questions);

  for (let i = 0; i < 4; i++) {
    let index =
      i == 0
        ? choiceArr.indexOf(answer)
        : (Math.random() * choiceArr.length) << 0;
    choices.push(choiceArr[index]);
    choiceArr.splice(index, 1);
  }

  addQuestion();
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
  h3.style.wordBreak = "word";
  for (let i = 0; i < 4; i++) {
    const index = (Math.random() * choices.length) << 0;
    const choice = choices[index];
    const btn = document.createElement("button");
    const bStyl = btn.style;
    bStyl.marginTop = "10px";
    bStyl.padding = "5px";
    bStyl.borderRadius = "6px";
    bStyl.backgroundColor = blue;
    bStyl.width = "200px";
    bStyl.textAlign = "left";
    bStyl.boxShadow = "0 3px 3px grey";
    btn.classList.add("choice");
    btn.textContent = `${i + 1}. ${choice}`;

    // li.append(btn);
    // ol.append(li);
    quiz.append(btn);
    choices.splice(index, 1);
  }
};

const recordScore = () => {
  const myScore = currScore.textContent;
  const highScores = JSON.parse(localStorage.getItem("highScores"));
  const form = document.createElement("form");
  const initials = document.createElement("input");
  const submit = document.createElement("input");
  const label = document.createElement("label");
  const iStyl = initials.style;
  let sStyl = submit.style;

  clearInterval(timer);
  quiz.innerHTML = "";

  initials.type = "text";
  initials.name = "initials";
  initials.id = "initials";

  iStyl.display = "block";
  iStyl.margin = "10px";
  iStyl.borderRadius = "6px";
  iStyl.backgroundColor = yellow;
  iStyl.padding = "5px";
  label.for = "initials";
  label.textContent = "Enter Initials To Record Score:";
  label.style.display = "block";
  label.style.margin = "5px";
  label.style.fontWeight = "bold";
  submit.type = "submit";
  submit.value = "Submit Score";

  sStyl.display = "block";
  sStyl.margin = "5px";
  sStyl.padding = "5px";
  sStyl.borderRadius = "6px";
  sStyl.backgroundColor = blue;
  sStyl.textAlign = "left";
  sStyl.boxShadow = "0 0 4px grey";
  submit.classList.add("choice");
  quiz.append(form);
  form.append(label);
  form.append(initials);
  form.append(submit);
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("initials").value;
    if (!name) {
      aStyl.left = '45vw'
      showAlert("Please Enter Your Initials", "pink");
      recordScore();
      return;
    }
    // console.log(highScores);
    if (!!highScores) {
      if (highScores[name] > myScore) {
        showScores()
        return
      }
      highScores[name] = myScore;
      localStorage.setItem("highScores", JSON.stringify(highScores));
    } else {
      highScores = {};
      highScores[name] = myScore;
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    showScores();
  });
};

const addListeners = () => {
  quiz.addEventListener("mouseover", (e) => {
    if (e.target.classList[0] !== "choice") return;
    const styl = e.target.style;
    styl.backgroundColor = darkGreen;
    styl.color = "white";
    styl.transform = "translateY(-2px)";
    styl.boxShadow = "0 5px 5px grey";
  });

  quiz.addEventListener("mouseout", (e) => {
    if (e.target.classList[0] !== "choice") return;
    const styl = e.target.style;
    styl.backgroundColor = blue;
    styl.color = "black";
    styl.transform = "translateY(2px)";
    styl.boxShadow = "0 3px 3px grey";
  });

  quiz.addEventListener("click", (e) => {
    const tgt = e.target;
    if (
      tgt.classList[0] !== "choice" ||
      tgt.textContent === "Start Quiz" ||
      tgt.value === "Submit Score"
    )
      return;
    if (tgt.textContent.indexOf(answer) > -1) {
      score += 500;
      showAlert("Correct!", "green");
    } else {
      showAlert("Wrong!", "pink");
      timeLeft -= 15;
      time.textContent = timeLeft <= 0 ? 0 : timeLeft;
      if (timeLeft <= 0) clearInterval(timer);
    }

    if (questions.length > 0) generateQuestion();
    else recordScore();
  });

  quiz.addEventListener("mousedown", (e) => {
    const tgt = e.target;
    if (tgt.classList[0] !== "choice") return;
    tgt.style.transform = "translateY(2px)";
    tgt.style.boxShadow = "0 1px 1px grey";
  });
};

const showAlert = (message, color) => {
  aStyl.border = `1px solid ${color}`;
  aStyl.backgroundColor = `light${color}`;
  alrt.textContent = message;
  aStyl.display = "";
  if (!!fadeOut) clearInterval(fadeOut);
  fadeOut = setTimeout(() => {
    aStyl.display = "none";
  }, 3000);
};


startPrompt();
