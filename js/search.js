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

function appendHtml(el, str) {
  var div = document.createElement("div")
  div.innerHTML = str

  while (div.childeren.length > 0) {
    el.appendChild(div.children[0])
  }
}

document.getElementById("search_input").onblur = function() {
  searchBasic = search_input.value

  // var html = '<div id="search_fake_input">' + searchBasic + '</div>'
  // appendHtml(document.body, html)

  // var inputLength = search_fake_input.width + 10

  // search_input_fake.style.width = inputLength;

  // var rm = document.querySelector("search_fake_input");
  // rm.parentNode.removeChild(rm)

  search_input_fake.value = search_input.value
  search_input_fake.size = search_input_fake.value.length
}

document.getElementById("search_contain").onblur = function() {
  if (search_contain.value) {
    search_contain_input.value = search_contain.value

    // width 차후 수정
    // http://vnthf.logdown.com/posts/2016/05/18/front-input-box

    len = search_contain.value.length
    console.log(len)

    search_contain_input.size = len
    console.log(search_contain_input.size)

    search_contain_input.style.zIndex = 100
    //    alert(document.getElementById("search_contatin_input").style.zIndex)
  } else {
    search_contain_input.style.zIndex = 1
  }
}

document.getElementById("search_except").onblur = function() {
  if (search_except.value) {
    search_except_input.value = search_except.value
    //    search_except_input.size = search_except.value.length
    search_except_input.style.zIndex = 100
  } else {
    search_except_input.style.zIndex = 1
  }
}

document.getElementById("search_synonym").onblur = function() {
  if (search_synonym.value) {
    search_synonym_input.value = search_synonym.value
    search_synonym_input.size = search_synonym.value.length
    search_synonym_input.style.zIndex = 100
  } else {
    search_synonym_input.style.zIndex = 1
  }
}

document.getElementById("search_filetype").onblur = function() {
  if (search_filetype.value) {
    search_filetype_input.value = search_filetype.value
    search_filetype_input.size = search_filetype.value.length
    search_filetype_input.style.zIndex = 100
  } else {
    search_filetype_input.style.zIndex = 1
  }
}

document.getElementById("search_site").onblur = function() {
  if (search_site.value) {
    search_site_input.value = search_site.value
    search_site_input.size = search_site.value.length
    search_site_input.style.zIndex = 100
  } else {
    search_site_input.style.zIndex = 1
  }
}

function deletePostit(event) {
  console.log("deletePositit")
  const div = event.target.parentNode
  div.parentNode.removeChild(div)
  const cleanPostits = postits.filter((_, index) => index !== 0)
  console.log(cleanPostits)
  postits = cleanPostits
  savePostits()
}

function savePostits() {
  localStorage.setItem(POSTIT_LS, JSON.stringify(postits))
}

// function paintPostit(postitNum, contents) {
//   const POSTIT_ID = `postit${postitNum}`
//   const POSTIT_DIV = document.getElementById(POSTIT_ID)
//   const postitTitle = document.createElement("h4")
//   const delBtn = document.createElement("button")
//   const span = document.createElement("span")
//   postitTitle.setAttribute("class", "card-title")
//   postitTitle.innerText = "Postit"
//   delBtn.innerText = "❌"
//   delBtn.addEventListener("click", deletePostit)
//   delBtn.setAttribute("class", "btn-sm btn-dark pull-right col-md-6 col-md-offset-3 centered")
//   span.innerText = contents
//   //   POSTIT_DIV.appendChild(postitTitle)
//   POSTIT_DIV.appendChild(span)
//   POSTIT_DIV.appendChild(delBtn)
//   const postitObj = {
//     text: contents,
//     id: POSTIT_ID
//   }
//   postits.push(postitObj)
//   console.log(postits)
//   savePostits()
//   console.log("paintPostit")
// }

function loadPostit() {
  const loadedPostits = localStorage.getItem(POSTIT_LS)
  if (loadedPostits !== null) {
    //   string을 배열로
    const parsedPostits = JSON.parse(loadedPostits)
    console.log({ parsedPostits })
    renderPostitList(parsedPostits)
    console.log("loadPostit")
  }
}

function addPostit(postit) {
  const addedPostits = localStorage.getItem(POSTIT_LS)
  const parsedAddedPostits = JSON.parse(addedPostits)
  console.log({ addedPostits })
  console.log({ parsedAddedPostits })
  postits = parsedAddedPostits.push(postit)
  savePostits()
}

// 멘토링
function renderPostit(postit) {
  const POSTIT_DIV = document.createElement("div")
  const postitTitle = document.createElement("h4")
  const delBtn = document.createElement("button")
  const span = document.createElement("span")
  const newID = postits.length + 1
  postitTitle.setAttribute("class", "card-title")
  postitTitle.innerText = "Postit"
  delBtn.innerText = "❌"
  // TODO: 삭제버튼 이벤트 만들어야함
  delBtn.addEventListener("click", deletePostit)
  delBtn.setAttribute("class", "btn-sm btn-dark pull-right col-md-6 col-md-offset-3 centered")
  span.innerText = postit.text
  POSTIT_DIV.setAttribute("id", newID)
  POSTIT_DIV.setAttribute("class", "card py-4 h-100")
  POSTIT_DIV.appendChild(postitTitle)
  POSTIT_DIV.appendChild(span)
  POSTIT_DIV.appendChild(delBtn)
  return POSTIT_DIV
}

function renderPostitList(postits) {
  const reversedPostitElements = postits.reverse()
  //   local 내용을 div묶음으로 전부 만들어 배열로 리턴
  const postitElements = reversedPostitElements.map(renderPostit)
  console.log({ reversedPostitElements, postitElements })
  const postitListElement = document.getElementById("postit-list")
  //   removePostitListAll(postitListElement)
  postitElements.forEach(element => {
    // TODO: appendChild가 아니라 postitListElement의 child자체를 바꿔서 쌓이지 않도록 해야함.
    postitListElement.appendChild(element)
  })
}

function removePostitListAll(postitListElement) {
  while (postitListElement.hasChildNodes()) {
    postitListElement.removeChild()
  }
}

function searchFunction() {}

function handleSubmit() {
  event.preventDefault()
  const currentValue = searchInput.value
  const currentPostit = { text: currentValue, id: 0 }
  console.log(currentValue)
  if (currentValue !== "") {
    loadPostit()
    addPostit(currentPostit)
    // saveURL()
  }
  searchInput.value = ""
}

function init() {
  loadPostit()
  searchForm.addEventListener("submit", handleSubmit)
}
init()
