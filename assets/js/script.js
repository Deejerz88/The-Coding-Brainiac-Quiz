//define elements
const quiz = document.getElementById("quiz");
const inform = document.getElementById("inform");
const time = document.getElementById("time");
const nav = document.body.querySelector("nav");
const container = document.getElementById("container");
const alrt = document.getElementById("alert");
const viewScores = document.querySelector("a");
const title = document.querySelector("h1");
const start = document.createElement("button");

//initiate variables
const lightGreen = "#d5f4e6";
const darkGreen = "#618685";
const blue = "#80ced6";
const yellow = "#fefbd8";
const aStyl = alrt.style;
const nStyl = nav.style;
const cStyl = container.style;
const stStyl = start.style;
const qStyl = quiz.style;
const answerArr = []

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

//define questions & answers
const questions = [
  ["HTML consists of a series of __________.", "Elements"],
  ["HTML is used mostly to __________ a web page.", "Structure"],
  ["<!DOCTYPE html> is used ot define a document as __________.", "HTML5"],
  [
    "Stylesheet importing should be done in the __________ of an HTML document.",
    "Head",
  ],
  ["'#' is used used to identify a(n) __________.", "Id"],
  [
    "__________ HTML tags clearly define the its meaning to both the browser and the develepor.",
    "Semantic",
  ],
  ["CSS is mostly used to __________ a web page.", "Style"],
  ["'.' is used to identify a(n) _______________.", "Class"],
  [
    "A CSS _______________ targets the HTML element(s) you want to style.",
    "Selector",
  ],
  [
    "_______________ selectors select elements based on a specific relationship between them.",
    "Combinator",
  ],
  [
    "_______________ selectors select elements based on a certain state.",
    "Psuedo-class",
  ],
  [
    "_______________ selectors select and style a part of an element.",
    "Pseudo-element",
  ],
  [
    "_______________ selectors select elements based on an attribute or attribute value.",
    "Attribute",
  ],
  [
    "_______________ is a score/rank that determines which style declaration are ultimately applied to an element.",
    "Specificity",
  ],
  [
    "_______________ is the world's most popular programming language.",
    "JavaScript",
  ],
  [
    "In HTML, JavaScript code is inserted between <_________> and </_________> tags.",
    "Script",
  ],
  [
    "_______________ will display an alert box to display data.",
    "Window.alert()",
  ],
  [
    "For debugging purposes, you can call the _______________ method in the browser to display data.",
    "Console.log()",
  ],
  [
    "A _______________ is a list of 'instructions' to be 'executed' by a computer.",
    "Statement",
  ],
  ["_______________ separate JavaScript statements.", "Semicolons"],
  ["In JavaScript, single line comments start with _______________", "//"],
  [
    "In JavaScript, multi-line comments start with ___* and end with *___.",
    "/",
  ],
  [
    "_______________ are containers for storing data (storing data values).",
    "Variables",
  ],
  [
    "A JavaScript _______________ is a block of code designed to perform a particular task.",
    "Function",
  ],
  [
    "Function _______________ are listed inside the parentheses () in the function definition.",
    "Parameters",
  ],
  [
    "Function _______________ are the values received by the function when it is invoked.",
    "Arguments",
  ],
];

//create answer array
questions.forEach((q) => {
  answerArr.push(q[1])
})

//perform initial styling
document.body.style.margin = "0";
document.body.style.backgroundColor = yellow;

//Quiz Titel
title.style.color = darkGreen;
title.style.textShadow = "0 0 0 black";

//navbar
nStyl.display = "flex";
nStyl.justifyContent = "space-between";
nStyl.borderBottom = `1px solid ${darkGreen}`;
nStyl.padding = "20px";
nStyl.backgroundColor = lightGreen;
nStyl.color = darkGreen;
nStyl.fontSize = "18pt";
nStyl.boxShadow = `inset 0px 0px 3px ${darkGreen}, 0px 2px 2px grey`;

//highscores
viewScores.style.textDecoration = "none";
viewScores.style.color = darkGreen;
viewScores.onmouseover = () => (viewScores.style.color = "#9fa9a3");
viewScores.onmouseout = () => (viewScores.style.color = darkGreen);

//container
cStyl.display = "flex";
cStyl.flexFlow = "column wrap";
cStyl.alignItems = "center";
cStyl.marginTop = "20px";

//quiz dialogue
qStyl.display = "flex";
qStyl.flexFlow = "column wrap";
qStyl.border = `2px solid ${darkGreen}`;
qStyl.borderRadius = "6px";
qStyl.padding = "20px";
qStyl.width = "500px";
qStyl.backgroundColor = lightGreen;
qStyl.color = darkGreen;
qStyl.boxShadow = "0 0 10px grey";

//alert box
alrt.width = "100px";
aStyl.borderRadius = "6px";
aStyl.padding = "10px";
aStyl.position = "absolute";
aStyl.top = "25px";
aStyl.marginLeft = 'auto'
aStyl.boxShadow = "0 0 5px grey";
aStyl.display = "none";
aStyl.color = "grey";

time.textContent = timeLeft;

//start button
start.textContent = "Start Quiz";
stStyl.backgroundColor = blue;
stStyl.borderRadius = "6px";
stStyl.boxShadow = "0 3px 3px grey";
stStyl.marginTop = "15px";
start.classList.add("choice");

//show highscores
const showScores = () => {
  quiz.innerHTML = "";
  const highScores = JSON.parse(localStorage.getItem("highScores"));
  
  const h2 = document.createElement("h2");
  if (!highScores) {
    h2.textContent = "No scores yet. This is your chance!"
    quiz.append(h2)
    quiz.append(start)
    return
  }
  h2.textContent = "Highscores";
  quiz.append(h2);
  const entries = Object.entries(highScores);
  entries.sort((a, b) => { //sort scores descending
    return b[1] - a[1];
  });
  entries.forEach((entry, i) => { //generate scoreboard
    const thisScore = entry[1];
    const thisName = entry[0];
    const span = document.createElement("span");
    span.textContent = `${i + 1}. ${thisName}: ${thisScore}`;
    if (i % 2 === 0) span.style.backgroundColor = blue;
    span.style.padding = "5px";
    span.style.fontWeight = "bold";
    start.onclick = () => location.reload();
    quiz.append(span);
    quiz.append(start);
  });
};

viewScores.onclick = showScores;

//Initial dialogue
const startPrompt = () => {
  quiz.innerHTML = "";
  const intro = document.createElement("h2");
  intro.textContent = "Time to test your coding knowledge!";
  quiz.append(intro);
  const scoring = document.createElement("p");
  scoring.style.fontSize = '14pt'
  scoring.innerHTML =
    "<b><u>Scoring:</u></b><br><b>Correct Answer:</b> + 500 points<br><b>Wrong Answer:</b> - 15 seconds<br><b>Time:</b> 100 points per remaining second";
  start.onclick = startQuiz;
  quiz.append(scoring);
  quiz.append(start);
  addListeners();
};

//initiate quiz
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

//countdown and calculate score
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

//create question variables and remove choices
const generateQuestion = () => {
  quiz.innerHTML = "";
  const choiceArr = [...answerArr];
  const questArr = randomQuestion(questions);
  question = questArr[0];
  answer = questArr[1];
  choices = [];
  questions.splice(ind, 1);
  for (let i = 0; i < 4; i++) { //get random choices
    let index =
      i == 0
        ? choiceArr.indexOf(answer)
        : (Math.random() * choiceArr.length) << 0;
    choices.push(choiceArr[index]);
    choiceArr.splice(index, 1);
  }

  addQuestion();
};

//get a random question
const randomQuestion = (questions) => {
  ind = (questions.length * Math.random()) << 0;
  return questions[ind];
};

//add question and choices to dialogue
const addQuestion = () => {
  const h3 = document.createElement("h3");
  quiz.append(h3);
  h3.textContent = question;
  h3.style.wordBreak = "word";
  for (let i = 0; i < 4; i++) { //shuffle choices and add to list
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
    quiz.append(btn);
    choices.splice(index, 1);
  }
};

//request initials and store high score
const recordScore = () => {
  const myScore = currScore.textContent;
  let highScores = JSON.parse(localStorage.getItem("highScores"));
  const form = document.createElement("form");
  const initials = document.createElement("input");
  const submit = document.createElement("input");
  const label = document.createElement("label");
  const iStyl = initials.style;
  const sStyl = submit.style;

  clearInterval(timer);
  quiz.innerHTML = "";

  //name input
  initials.type = "text";
  initials.name = "initials";
  initials.id = "initials";
  iStyl.display = "block";
  iStyl.margin = "10px";
  iStyl.borderRadius = "6px";
  iStyl.backgroundColor = yellow;
  iStyl.padding = "5px";

  //name label
  label.for = "initials";
  label.textContent = "Enter Initials To Record Score:";
  label.style.display = "block";
  label.style.margin = "5px";
  label.style.fontWeight = "bold";
  submit.type = "submit";
  submit.value = "Submit Score";

  //submit button
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

  submit.onclick = (e) => {
    e.preventDefault();
    const name = document.getElementById("initials").value;
    if (!name) { //prevent blank name entry
      showAlert("Please Enter Your Initials", "pink");
      recordScore();
      return;
    }
    if (!!highScores) {
      if (highScores[name] > myScore) { //don't record lower score
        showScores();
        return;
      }
      highScores[name] = myScore;
      localStorage.setItem("highScores", JSON.stringify(highScores));
    } else {
      highScores = {};
      highScores[name] = myScore;
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    showScores();
  };
};
 //add event listeners
const addListeners = () => {
  quiz.onmouseover = (e) => {
    if (e.target.classList[0] !== "choice") return;
    const styl = e.target.style;
    styl.backgroundColor = darkGreen;
    styl.color = "white";
    styl.transform = "translateY(-2px)";
    styl.boxShadow = "0 5px 5px grey";
  };

  quiz.onmouseout = (e) => {
    if (e.target.classList[0] !== "choice") return;
    const styl = e.target.style;
    styl.backgroundColor = blue;
    styl.color = "black";
    styl.transform = "translateY(2px)";
    styl.boxShadow = "0 3px 3px grey";
  };

  quiz.onclick = (e) => {
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
    }
    if (timeLeft <= 0) {
      clearInterval(timer);
      recordScore();
      return
    }
    if (questions.length > 0) generateQuestion();
    else recordScore();
  };

  quiz.onmousedown = (e) => {
    const tgt = e.target;
    if (tgt.classList[0] !== "choice") return;
    tgt.style.transform = "translateY(2px)";
    tgt.style.boxShadow = "0 1px 1px grey";
  };
};
//calculate alert position
const alrtPos = (w) => {
  w = Number(w.substring(0, w.indexOf('p')))
  vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  return (vw / 2) - (w/2) + "px";
};

//show alert
const showAlert = (message, color) => {
  aStyl.left = alrtPos(alrt.width);
  aStyl.border = `1px solid ${color}`;
  aStyl.backgroundColor = `light${color}`;
  alrt.textContent = message;
  aStyl.display = "";
  if (!!fadeOut) clearTimeout(fadeOut);
  fadeOut = setTimeout(() => {
    aStyl.display = "none";
  }, 3000);
};


//initiate starting dialogue on page load
startPrompt();
