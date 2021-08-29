// selectores
const selectCategory = document.getElementById("trivia_category");
const form = document.getElementById("form");
const trivia_amount = document.getElementById("trivia_amount");
const trivia_category = document.getElementById("trivia_category");
const trivia_difficulty = document.getElementById("trivia_difficulty");
const trivia_type = document.getElementById("trivia_type");
const questionsContent = document.getElementById("questionsContent");

const bnt1 = document.getElementById('btn1')
const bnt2 = document.getElementById('btn2')
const bnt3 = document.getElementById('btn3')
const bnt4 = document.getElementById('btn3')


// generales
const triviaState = {
  totalQuestions: null,
  currentQuestion: 0,
  correctAnswers: 0
};

// funciones
const getCategories = async () => {
  const res = await fetch("https://opentdb.com/api_category.php");
  const { trivia_categories } = await res.json();
  const arrOptions = trivia_categories.map((e) => {
    const option = document.createElement("option");
    option.value = e.id;
    option.text = e.name;
    return option;
  });
  selectCategory.append(...arrOptions);
};
const getQuestions = async (params) => {
  var url = new URL("https://opentdb.com/api.php");
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const res = await fetch(url);
  const data = await res.json();

  startGame(data)
};
const setQuestion =(iterator) => {
  const item = iterator.next();
  if (item.done) {
    // finalizar trivia
    return null
  }

  const question = item.value
  document.getElementById("questionName").innerText = question.question;
  if (question.type === 'boolean') {
    btn1.innerText = "True";
    btn2.innerText = "False";
    btn3.style.display = "none";
    btn4.style.display = "none";
  }else{
    btn1.style.display = "Block";
    btn2.style.display = "Block";
    btn3.style.display = "Block";
    btn4.style.display = "Block";
  }
}
const startGame = ({results}) => {
  // ocutar configuración inicial
  form.style.display = 'none'
  questionsContent.style.display = 'flex'
  // results[triviaState.currentQuestion].incorrect_answers.length === 1 // V o F

  const iterator = results[Symbol.iterator]();
    setQuestion(iterator)
 



}


// listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();

  const params = {};
  params.amount = trivia_amount.value;
  if (trivia_category.value !== "any") params.category = trivia_category.value;
  if (trivia_difficulty.value !== "any") params.difficulty = trivia_difficulty.value;
  if (trivia_type.value !== "any") params.type = trivia_type.value;

  getQuestions(params)
});


getCategories();