const quizData = [
  {
    type: "single",
    question: "1. What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    type: "single",
    question: "2. Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    type: "multi",
    question: "3. Which of the following are programming languages?",
    options: ["Python", "HTML", "Java", "CSS"],
    answer: ["Python", "Java"]
  },
  {
    type: "fill",
    question: "4. Fill in the blank: JavaScript is a ____ side scripting language.",
    answer: "client"
  },
  {
    type: "single",
    question: "5. Which tag is used to define a hyperlink in HTML?",
    options: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;", "&lt;hyper&gt;"],
    answer: "&lt;a&gt;"
  },
  {
    type: "multi",
    question: "6. Which are JavaScript frameworks?",
    options: ["React", "Vue", "Bootstrap", "Angular"],
    answer: ["React", "Vue", "Angular"]
  },
  {
    type: "fill",
    question: "7. Fill in the blank: CSS stands for Cascading Style ____.",
    answer: "sheets"
  },
  {
    type: "single",
    question: "8. Inside which HTML element do we put the JavaScript?",
    options: ["&lt;script&gt;", "&lt;js&gt;", "&lt;javascript&gt;", "&lt;code&gt;"],
    answer: "&lt;script&gt;"
  },
  {
    type: "multi",
    question: "9. Select all HTML semantic tags.",
    options: ["&lt;div&gt;", "&lt;section&gt;", "&lt;footer&gt;", "&lt;span&gt;"],
    answer: ["&lt;section&gt;", "&lt;footer&gt;"]
  },
  {
    type: "fill",
    question: "10. Fill in the blank: The 'console.log()' is used to ____ in JavaScript.",
    answer: "debug"
  }
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
  const q = quizData[currentQuestion];
  const container = document.getElementById("quiz-box");
  container.innerHTML = "";

  const questionEl = document.createElement("div");
  questionEl.className = "question";
  questionEl.innerHTML = q.question;
  container.appendChild(questionEl);

  if (q.type === "single") {
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="option" value="${opt}"> ${opt}
      `;
      optionsDiv.appendChild(label);
    });
    container.appendChild(optionsDiv);
  } else if (q.type === "multi") {
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="checkbox" name="option" value="${opt}"> ${opt}
      `;
      optionsDiv.appendChild(label);
    });
    container.appendChild(optionsDiv);
  } else if (q.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "fill-blank";
    input.placeholder = "Type your answer here...";
    container.appendChild(input);
  }

  document.getElementById("next-btn").style.display =
    currentQuestion < quizData.length - 1 ? "inline-block" : "none";
  document.getElementById("submit-btn").style.display =
    currentQuestion === quizData.length - 1 ? "inline-block" : "none";
}

function nextQuestion() {
  saveAnswer();
  currentQuestion++;
  loadQuestion();
}

function saveAnswer() {
  const q = quizData[currentQuestion];
  let answer = null;

  if (q.type === "single") {
    const selected = document.querySelector('input[name="option"]:checked');
    answer = selected ? selected.value : null;
  } else if (q.type === "multi") {
    const selected = document.querySelectorAll('input[name="option"]:checked');
    answer = Array.from(selected).map(cb => cb.value);
  } else if (q.type === "fill") {
    const input = document.getElementById("fill-blank");
    answer = input.value.trim().toLowerCase(); // Normalize case and trim
  }

  userAnswers[currentQuestion] = answer;
}

function submitQuiz() {
  saveAnswer();
  let score = 0;

  quizData.forEach((q, i) => {
    const correct = q.answer;
    const userAns = userAnswers[i];

    if (q.type === "single") {
      if (userAns === correct) {
        score++;
      }
    } else if (q.type === "multi") {
      if (
        Array.isArray(userAns) &&
        Array.isArray(correct) &&
        userAns.length === correct.length &&
        userAns.sort().join(",") === correct.sort().join(",")
      ) {
        score++;
      }
    } else if (q.type === "fill") {
      if (
        typeof userAns === "string" &&
        userAns.trim().toLowerCase() === correct.trim().toLowerCase()
      ) {
        score++;
      }
    }
  });

  document.getElementById("quiz-box").innerHTML = "";
  document.querySelector(".navigation").style.display = "none";
  document.getElementById("score-box").textContent =
    `🎉 Your score is ${score} out of ${quizData.length}`;
}

// Load first question
loadQuestion();
