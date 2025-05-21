// Quiz Data
const quizData = [
  {
    question: "Which language is used for web apps?",
    answers: ["Python", "Java", "PHP", "All"],
    correct: "All"
  },
  {
    question: "What does HTML stand for?",
    answers: ["HyperText Markup Language", "HighText Machine Language", "HyperTabular Markup Language", "None"],
    correct: "HyperText Markup Language"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    answers: ["<a>", "<link>", "<href>", "<url>"],
    correct: "<a>"
  },
  {
    question: "What does CSS stand for?",
    answers: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "What year was JavaScript created?",
    answers: ["1996", "1995", "1994", "1997"],
    correct: "1995"
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Mozilla", "Netscape", "Google", "Microsoft"],
    correct: "Netscape"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    answers: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: "<script>"
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      'let colors = "red", "green", "blue"',
      'let colors = (1:"red", 2:"green", 3:"blue")',
      'let colors = ["red", "green", "blue"]',
      'let colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'
    ],
    correct: 'let colors = ["red", "green", "blue"]'
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    answers: [
      'msg("Hello World")',
      'alertBox("Hello World")',
      'alert("Hello World")',
      'msgBox("Hello World")'
    ],
    correct: 'alert("Hello World")'
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "<!-- -->", "#", "**"],
    correct: "//"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// Shuffle function for array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// DOM Elements
const container = document.getElementById("quiz-container");

// Create timer element
const timerDiv = document.createElement("div");
timerDiv.id = "timer";
timerDiv.innerHTML = `Time Left: <span id="time">30</span>s`;
container.appendChild(timerDiv);

// Create question element
const questionDiv = document.createElement("div");
questionDiv.id = "question";
container.appendChild(questionDiv);

// Create answers container
const answersDiv = document.createElement("div");
answersDiv.id = "answers";
container.appendChild(answersDiv);

// Create Next button
const nextButton = document.createElement("button");
nextButton.id = "next-btn";
nextButton.innerText = "Next";
nextButton.style.display = "none";
container.appendChild(nextButton);

// Create result display
const resultDiv = document.createElement("div");
resultDiv.id = "result";
container.appendChild(resultDiv);

// Show one question
function showQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("time").textContent = timeLeft;

  const currentData = quizData[currentQuestionIndex];
  questionDiv.textContent = currentData.question;
  answersDiv.innerHTML = "";

  // Shuffle answers
  const shuffledAnswers = [...currentData.answers];
  shuffleArray(shuffledAnswers);

  shuffledAnswers.forEach(answer => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(btn, currentData.correct);
    answersDiv.appendChild(btn);
  });

  nextButton.style.display = "none";
  resultDiv.textContent = "";

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      showCorrectAnswer(currentData.correct);
      disableOptions();
      nextButton.style.display = "block";
    }
  }, 1000);
}

function selectAnswer(selectedBtn, correctAnswer) {
  clearInterval(timer);
  disableOptions();
  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.style.backgroundColor = "#d4edda"; // green
    score++;
  } else {
    selectedBtn.style.backgroundColor = "#f8d7da"; // red
    showCorrectAnswer(correctAnswer);
  }
  nextButton.style.display = "block";
}

function disableOptions() {
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach(btn => btn.disabled = true);
}

function showCorrectAnswer(correctAnswer) {
  const allOptions = document.querySelectorAll(".option-btn");
  allOptions.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "#d4edda";
    }
  });
}

nextButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
    startTimer();
  } else {
    showFinalScore();
  }
};

function startTimer() {
  timeLeft = 30;
  document.getElementById("time").textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
      showCorrectAnswer(quizData[currentQuestionIndex].correct);
      nextButton.style.display = "block";
    }
  }, 1000);
}

function showFinalScore() {
  questionDiv.style.display = "none";
  answersDiv.style.display = "none";
  timerDiv.style.display = "none";
  nextButton.style.display = "none";
  resultDiv.innerText = `You scored ${score} out of ${quizData.length}!`;
}

// Start the quiz with shuffled questions
shuffleArray(quizData);
startQuiz();

function startQuiz() {
  showQuestion();
  startTimer();
}
