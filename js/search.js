const searchForm = document.getElementById("searchForm"),
  searchInput = searchForm.querySelector("input")

const POSTIT_LS = "postits"
const POSTIT_COUNT = 8
let postits = []

function saveURL() {
  search_content = "https://www.google.com/search?q=" + searchInput.value
  console.log(search_except)
  if (search_contain.value) {
    search_content = search_content + ' "' + search_contain.value + '"'
    search_input.value = search_input.value + " " + search_contain.value
  }
  if (search_except.value) search_content = search_content + " -" + search_except.value
  if (search_synonym.value) search_content = search_content + " ~" + search_synonym.value
  if (search_site.value) search_content = search_content + " site:" + search_site.value
  if (search_filetype.value) search_content = search_content + " filetype:" + search_filetype.value

  location.href = search_content
}

document.getElementById("search_input").onblur = function() {
  searchBasic = search_input.value
}

document.getElementById("search_contain").onblur = function() {
  search_input.value = searchBasic + " " + search_contain.value
}

function deletePostit(postitNum) {
  console.log("deletePositit")
  const POSTIT_ID = `postit${postitNum}`
  const POSTIT_DIV = document.getElementById(POSTIT_ID)
  while (POSTIT_DIV.firstChild) {
    POSTIT_DIV.removeChild(POSTIT_DIV.firstChild)
  }
  const postitTitle = document.createElement("h4")
  postitTitle.setAttribute("class", "card-title")
  postitTitle.innerText = "Postit"
  POSTIT_DIV.appendChild(postitTitle)
  const cleanPostits = postits.filter(function(postit) {
    return postit.id !== POSTIT_ID
  })
  console.log(cleanPostits)
  postits = cleanPostits
  savePostits()
}

function savePostits() {
  localStorage.setItem(POSTIT_LS, JSON.stringify(postits))
}

function paintPostit(postitNum, contents) {
  deletePostit(postitNum)
  const POSTIT_ID = `postit${postitNum}`
  const POSTIT_DIV = document.getElementById(POSTIT_ID)
  const postitTitle = document.createElement("h4")
  const delBtn = document.createElement("button")
  const span = document.createElement("span")
  postitTitle.setAttribute("class", "card-title")
  postitTitle.innerText = "Postit"
  delBtn.innerText = "❌"
  delBtn.addEventListener("click", function() {
    deletePostit(postitNum)
  })
  delBtn.setAttribute("class", "btn-sm btn-dark pull-right col-md-6 col-md-offset-3 centered")
  span.innerText = contents
  //   POSTIT_DIV.appendChild(postitTitle)
  POSTIT_DIV.appendChild(span)
  POSTIT_DIV.appendChild(delBtn)
  const postitObj = {
    text: contents,
    id: POSTIT_ID
  }
  postits.unshift(postitObj)
  console.log(postits)
  savePostits()
  console.log("paintPostit")
}

function loadPostit() {
  const loadedPostits = localStorage.getItem(POSTIT_LS)
  if (loadedPostits !== null) {
    const parsedPostits = JSON.parse(loadedPostits)
    var postitIndex = 1
    parsedPostits.forEach(function(postit) {
      paintPostit(postitIndex, postit.text)
      postitIndex += 1
    })
    console.log("loadPostit")
  }
}

function searchFunction() {}

function handleSubmit() {
  event.preventDefault()
  const currentValue = searchInput.value
  var currentPostitNum = postits.length
  console.log(currentValue)
  if (currentValue !== "") {
    console.log("currentPostitNum = ", currentPostitNum)
    currentPostitNum = (currentPostitNum % POSTIT_COUNT) + 1
    paintPostit(currentPostitNum, currentValue)
    // 검색 시작
    // saveURL()
  }
  searchInput.value = ""
}

function init() {
  loadPostit()
  searchForm.addEventListener("submit", handleSubmit)
}
init()
