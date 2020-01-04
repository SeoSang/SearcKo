const search = document.getElementById("search_input"),
  searchContents = search.value,
  searchForm = document.getElementById("searchForm"),
  postitList = document.querySelector(".js-postitList")

function saveURL() {}

function saveKeyWord() {}

function paintPostit() {
  const span = document.createElement("span")
  const postitContent = searchContents
  console.log(postitContent)
  console.log(search)
  span.innerText = postitContent
  postitList.appendChild(span)
  console.log("paintPostit")
}

function searchFunction() {}
function init() {
  searchForm.addEventListener("submit", paintPostit)
}
init()
