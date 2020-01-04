const searchForm = document.getElementById("searchForm"),
  searchInput = searchForm.querySelector("input")

const POSTIT_LS = "postits"
let postits = []

function saveURL() {}

function saveKeyWord() {}

function savePostits() {
  localStorage.setItem(POSTIT_LS, JSON.stringify(postits))
}

function paintPostit(postitNum, contents) {
  const POSTIT_ID = `postit${postitNum}`
  const POSTIT_DIV = document.getElementById(POSTIT_ID)
  console.log(POSTIT_DIV)
  const span = document.createElement("span")
  span.innerText = contents
  POSTIT_DIV.appendChild(span)
  const postitObj = {
    text: contents,
    id: POSTIT_ID
  }
  postits.push(postitObj)
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
  const currentPostitNum = postits.length
  console.log(currentValue)
  if (currentValue !== "") paintPostit(currentPostitNum + 1, currentValue)
  searchInput.value = ""
}

function init() {
  loadPostit()
  searchForm.addEventListener("submit", handleSubmit)
}
init()
