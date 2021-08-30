// selectores
// const selectCategory = document.getElementById("trivia_category");
const form = document.getElementById("form");
const trivia_amount = document.getElementById("trivia_amount");
const trivia_category = document.getElementById("trivia_category");
const trivia_difficulty = document.getElementById("trivia_difficulty");
const trivia_type = document.getElementById("trivia_type");
const questionsContent = document.getElementById("questionsContent");

const btn1 = document.getElementById("1");
const btn2 = document.getElementById("2");
const btn3 = document.getElementById("3");
const btn4 = document.getElementById("4");
const btn_confirm = document.getElementById("btn-confirm");

// generales
let iterator = {};
const triviaState = {
  totalQuestions: null,
  correctAnswers: 0,
};

let currentQuestion = null;
let currentOption = null;

// funciones
const randomNumTop = (top) => Math.floor(Math.random() * top) + 1;

const getCategories = async () => {
  const res = await fetch("https://opentdb.com/api_category.php");
  const { trivia_categories } = await res.json();
  const arrOptions = trivia_categories.map((e) => {
    const option = document.createElement("option");
    option.value = e.id;
    option.text = e.name;
    return option;
  });
  trivia_category.append(...arrOptions);
};
const startGame = async (params) => {
  const url = new URL("https://opentdb.com/api.php");
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const res = await fetch(url);
  const data = await res.json();
  triviaState.totalQuestions = data.results.length;
  showQuestionsSection(data);
};
const showQuestionsSection = ({ results }) => {
  form.style.display = "none";
  questionsContent.style.display = "flex";
  iterator = results[Symbol.iterator]();
  initQuestion();
};

const initQuestion = () => {
  const item = iterator.next();
  if (item.done) {
    // finalizar trivia
    console.log("finalizo la trivia");
    return null;
  }

  currentQuestion = item.value;
  document.getElementById("questionName").innerText = currentQuestion.question;
  cleanOptionSelected();
  if (currentQuestion.type === "boolean") {
    btn1.innerText = "True";
    btn2.innerText = "False";
    btn3.style.display = "none";
    btn4.style.display = "none";
  } else {
    btn3.style.display = "inline";
    btn4.style.display = "inline";
    let iCount = 0;
    const num = randomNumTop(4);
    const nodeList = document.getElementById("question_items").children;
    const btnList = [...nodeList];
    btnList.forEach((el) => {
      if (el.id == num) {
        el.innerText = currentQuestion.correct_answer;
      } else {
        el.innerText = currentQuestion.incorrect_answers[iCount++];
      }
    });
  }
};

const cleanOptionSelected = () => {
  btn1.classList.remove("btn-active");
  btn2.classList.remove("btn-active");
  btn3.classList.remove("btn-active");
  btn4.classList.remove("btn-active");
};

// listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const params = {};
  params.amount = trivia_amount.value;
  if (trivia_category.value !== "any") params.category = trivia_category.value;
  if (trivia_difficulty.value !== "any")
    params.difficulty = trivia_difficulty.value;
  if (trivia_type.value !== "any") params.type = trivia_type.value;

  startGame(params);
});

btn1.addEventListener("click", () => {
  cleanOptionSelected();
  btn1.classList.add("btn-active");
  currentOption = btn1.textContent;
});

btn2.addEventListener("click", () => {
  cleanOptionSelected();
  btn2.classList.add("btn-active");
  currentOption = btn2.textContent;
});

btn3.addEventListener("click", () => {
  cleanOptionSelected();
  btn3.classList.add("btn-active");
  currentOption = btn3.textContent;
});

btn4.addEventListener("click", () => {
  cleanOptionSelected();
  btn4.classList.add("btn-active");
  currentOption = btn4.textContent;
});

btn_confirm.addEventListener("click", () => {
  if (currentOption) {
    currentOption == currentQuestion.correct_answer
      ? triviaState.correctAnswers++
      : null;
  }
  currentOption = null;
  currentQuestion = null;
  console.log(triviaState)
  initQuestion();
});

getCategories();
