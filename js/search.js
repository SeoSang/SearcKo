const search = document.getElementById("search_input"),
  searchContents = search.value,
  searchForm = document.getElementById("searchForm"),
  postitList = document.querySelector(".js-postitList")

function saveURL() {
  search_content = "https://www.google.com/search?q=" + search.value;
  if(search_contain.value) {
    search_content = search_content + ' "' + search_contain.value + '"'
    search_input.value = search_input.value + " " + search_contain.value;
  }
  if(search_except.value)
    search_content = search_content + ' -' + search_except.value
  if(search_synonym.value)
    search_content = search_content + ' ~' + search_synonym.value
  if(search_site.value)
    search_content = search_content + ' site:' + search_site.value
  if(search_filetype.value)
    search_content = search_content + ' filetype:' + search_filetype.value

  location.href = search_content;
}

document.getElementById("search_input").onblur = function() {
  searchBasic = search_input.value;
}

document.getElementById("search_contain").onblur = function() {
  search_input.value = searchBasic + " " + search_contain.value;
}

function saveKeyWord() {

}

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
  searchForm.addEventListener("submit", saveURL)
  searchForm.addEventListener("submit", paintPostit)
}
init()
