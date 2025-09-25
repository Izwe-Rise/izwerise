const quizTitle = document.getElementById("quizTitle");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const scoreText = document.getElementById("scoreText");
const progressBar = document.getElementById("progressBar");
const timerDisplay = document.getElementById("timer");

let quizData = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 300; // 5 min countdown

// Get paper title from URL
function getQueryParam(name){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const selectedPaperTitle = getQueryParam("paper");

// Dummy questions
function generateQuestions(paperTitle){
  return [
    {question:`Sample Q1 for ${paperTitle}`, options:["A","B","C","D"], answer:"A", hint:"Think carefully!"},
    {question:`Sample Q2 for ${paperTitle}`, options:["A","B","C","D"], answer:"B", hint:"Eliminate wrong options."},
    {question:`Sample Q3 for ${paperTitle}`, options:["A","B","C","D"], answer:"C", hint:"Check formulas."},
  ];
}

// Timer
function startTimer(){
  timeLeft=300;
  timerDisplay.textContent=formatTime(timeLeft);
  timer = setInterval(()=>{
    timeLeft--;
    timerDisplay.textContent=formatTime(timeLeft);
    if(timeLeft<=0){
      clearInterval(timer);
      alert(`Time's up! Your score: ${score} / ${quizData.length}`);
      location.href="student.html";
    }
  },1000);
}

function formatTime(sec){
  const m=Math.floor(sec/60);
  const s=sec%60;
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// Initialize Quiz
if(selectedPaperTitle){
  quizTitle.textContent=`Quiz: ${selectedPaperTitle}`;
  quizData = generateQuestions(selectedPaperTitle);
  currentQuestion=0;
  score=0;
  renderQuestion();
  startTimer();
}

// Render Question
function renderQuestion(){
  const q=quizData[currentQuestion];
  questionText.textContent=`${currentQuestion+1}. ${q.question} (Hint: ${q.hint})`;
  optionsList.innerHTML="";
  q.options.forEach(opt=>{
    const li=document.createElement("li");
    li.textContent=opt;
    li.addEventListener("click",()=>checkAnswer(opt,li));
    optionsList.appendChild(li);
  });
  scoreText.textContent=`Score: ${score} / ${quizData.length}`;
  progressBar.style.width=`${((currentQuestion)/quizData.length)*100}%`;
  prevBtn.style.display=currentQuestion===0?"none":"inline-block";
  nextBtn.style.display=currentQuestion===quizData.length-1?"none":"inline-block";
}

function checkAnswer(selected, li){
  const correct=quizData[currentQuestion].answer;
  if(selected===correct){li.classList.add("correct"); score++;} 
  else {li.classList.add("wrong");}
  Array.from(optionsList.children).forEach(opt=>opt.style.pointerEvents="none");
}

nextBtn.addEventListener("click",()=>{
  currentQuestion++;
  if(currentQuestion<quizData.length) renderQuestion();
});

prevBtn.addEventListener("click",()=>{
  currentQuestion--;
  if(currentQuestion>=0) renderQuestion();
});
