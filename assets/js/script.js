const quiz = document.getElementById("quiz");
const inform = document.getElementById("inform");
const time = document.getElementById("time");
const nav = document.body.querySelector("nav");
const container = document.getElementById("container");
const alrt = document.getElementById("alert");

nav.style.display = "flex";
nav.style.justifyContent = "space-between";
nav.style.borderBottom = "1px solid black";
nav.style.padding = "20px";

container.style.display = "flex";
container.style.flexFlow = "column wrap";
container.style.alignItems = "center";
container.style.marginTop = "20px";

quiz.style.display = "flex";
quiz.style.flexFlow = "column wrap";
quiz.style.border = "2px solid black";
quiz.style.borderRadius = "6px";
quiz.style.padding = "10px";
quiz.style.width = "500px";

alrt.width = "50px";
alrt.style.borderRadius = "3px";
alrt.style.padding = "6px";
alrt.style.position = "absolute";
alrt.style.top = "0";
alrt.style.left = "48vw";

let questions = {
  q1: ["question1", "answer1"],
  q2: ["question2", "answer2"],
  q3: ["question3", "answer3"],
  q4: ["question4", "answer4"],
  q5: ["question5", "answer5"],
};
let answerArr = [
  "answer1",
  "answer2",
  "answer3",
  "answer21",
  "answer4",
  "answer5",
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

let randomKey;
let keys;
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

time.textContent = timeLeft;

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
  quiz.append(start);
};

const startQuiz = () => {
  startTimer();
  generateQuestion();
  let scoreCard = document.createElement("section");
  scoreCard.innerHTML = `<h3>Score:</h3> <span id=currScore>${score}</span>`;
  scoreCard.style.marginTop = "20px";
  container.append(scoreCard);
  currScore = document.getElementById("currScore");
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

  delete questions[keys[randomKey]];

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
  keys = Object.keys(questions);
  randomKey = (keys.length * Math.random()) << 0;
  return questions[keys[randomKey]];
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
    btn.style.backgroundColor = "lightblue";
    btn.textContent = `${i + 1}. ${choice}`;

    li.append(btn);
    ol.append(li);
    choices.splice(index, 1);
  }
};

const addListeners = () => {
  ol.addEventListener("mouseover", (e) => {
    if (e.target.classList[0] !== "choice") return;
    e.target.style.backgroundColor = "teal";
  });

  ol.addEventListener("mouseout", (e) => {
    if (e.target.classList[0] !== "choice") return;
    e.target.style.backgroundColor = "lightblue";
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
    if (keys.length - 1 > 0) generateQuestion();
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
};

startPrompt();
