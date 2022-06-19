const quiz = document.getElementById("quiz");

let questions = {
  q1: ["question1", "answer"],
  q2: ["question2", "answer"],
  q3: ["question3", "answer"],
  q4: ["question4", "answer"],
  q5: ["question5", "answer"],
};
let answerArr = [
  "answer1",
  "answer2",
  "answer3",
  "answer",
  "answer4",
  "answer5",
  "answer6",
  "answer7",
];

let randomKey;
let keys

const randomQuestion = (questions) => {
  keys = Object.keys(questions);
  randomKey = keys.length * Math.random() << 0;
  return questions[keys[randomKey]];
};
// console.log(randomQuestion(questions))

const generateQuestion = () => {
  let questArr = randomQuestion(questions);
  delete questions[keys[randomKey]]
  console.log(questions)
  let question = questArr[0];
  let answer = questArr[1];
  let choices = [];
  for (let i = 0; i < 4; i++) {
    let index =
      i == 0
        ? answerArr.indexOf(answer)
        : (Math.random() * answerArr.length) << 0;
    console.log(index);
    choices.push(answerArr[index]);
    answerArr.splice(index, 1);
    console.log(answerArr);
  }
  console.log(choices);
  let h3 = document.createElement('h3')
  quiz.append(h3)
  h3.textContent = question;
  let ol;
  for (let i = 0; i < 4; i++) {
    let index = (Math.random() * choices.length) << 0;
    let choice = choices[index];
    if (i === 0) {
      ol = document.createElement("ol");
      quiz.append(ol);
    }
    let li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.marginTop = "5px";
    let btn = document.createElement('button')
    btn.classList.add('choice')
    btn.style.borderRadius = '3px'
    btn.style.backgroundColor = 'lightblue'
    
    btn.textContent = `${i+1}. ${choice}`
    li.append(btn)
    ol.append(li);
    choices.splice(index, 1);
  }
  ol.addEventListener("mouseover", (e) => {
    if (e.target.classList[0] !== 'choice') return
    e.target.style.backgroundColor = "teal";
  });
  ol.addEventListener("mouseout", (e) => {
    if (e.target.classList[0] !== "choice") return;
    e.target.style.backgroundColor = "lightblue";
  });
};

generateQuestion()