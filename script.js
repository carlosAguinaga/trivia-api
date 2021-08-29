// selectores
const selectCategory = document.getElementById("trivia_category");
const form = document.getElementById("form");
const trivia_amount = document.getElementById("trivia_amount");
const trivia_category = document.getElementById("trivia_category");
const trivia_difficulty = document.getElementById("trivia_difficulty");
const trivia_type = document.getElementById("trivia_type");

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

  console.log(data)
};

getCategories();

// listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const params = {};
  params.amount = trivia_amount.value;
  if (trivia_category.value !== "any") params.category = trivia_category.value;
  if (trivia_difficulty.value !== "any")
    params.difficulty = trivia_difficulty.value;
  if (trivia_type.value !== "any") params.type = trivia_type.value;


  getQuestions(params)
});
