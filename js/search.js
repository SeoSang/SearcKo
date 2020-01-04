const searchForm = document.getElementById("searchForm"),
  searchInput = searchForm.querySelector("input")

const POSTIT_LS = "postits"
const POSTIT_COUNT = 8
let postits = []

document.getElementById("search_contain_input").onclick = function() {
  search_contain_input.style.display = "none"
  search_contain.value = ""
}
document.getElementById("search_except_input").onclick = function() {
  search_except_input.style.display = "none"
  search_except.value = ""
}
document.getElementById("search_synonym_input").onclick = function() {
  search_synonym_input.style.display = "none"
  search_synonym.value = ""
}
document.getElementById("search_filetype_input").onclick = function() {
  search_filetype_input.style.display = "none"
  search_filetype.value = ""
}
document.getElementById("search_site_input").onclick = function() {
  search_site_input.style.display = "none"
  search_site.value = ""
}

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

document.getElementById("search_input").onkeyup = function() {
  if (search_input.value) {
    search_input_fake.style.display = "inline-block"

    var searchBasic = $(search_input).val()
    $(document.body).append('<div id="virtual_dom">' + searchBasic + "</div>")

    search_input_fake.value = search_input.value
    search_input_fake.size = search_input_fake.value.length
  } else {
    search_input_fake.style.display = "none"
  }
}

// width 설정
// http://vnthf.logdown.com/posts/2016/05/18/front-input-box

document.getElementById("search_contain").onkeyup = function() {
  if (search_contain.value) {
    search_contain_input.style.display = "inline-block"
    search_contain_input.value = search_contain.value
    search_contain_input.style.zIndex = 100
  } else {
    search_contain_input.style.display = "none"
  }
}

document.getElementById("search_except").onkeyup = function() {
  if (search_except.value) {
    search_except_input.style.display = "inline-block"
    search_except_input.value = search_except.value
    search_except_input.style.zIndex = 100
  } else {
    search_except_input.style.display = "none"
  }
}

document.getElementById("search_synonym").onkeyup = function() {
  if (search_synonym.value) {
    search_synonym_input.style.display = "inline-block"
    search_synonym_input.value = search_synonym.value
    search_synonym_input.style.zIndex = 100
  } else {
    search_synonym_input.style.display = "none"
  }
}

document.getElementById("search_filetype").onkeyup = function() {
  if (search_filetype.value) {
    search_filetype_input.style.display = "inline-block"
    search_filetype_input.value = search_filetype.value
    search_filetype_input.style.zIndex = 100
  } else {
    search_filetype_input.style.display = "none"
  }
}

document.getElementById("search_site").onkeyup = function() {
  if (search_site.value) {
    search_site_input.style.display = "inline-block"
    search_site_input.value = search_site.value
    search_site_input.style.zIndex = 100
  } else {
    search_site_input.style.zIndex = 1
  }
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
  delBtn.setAttribute("class", "btn_custom button_green pull-right centered")
  span.innerText = contents
  // POSTIT_DIV.appendChild(postitTitle)
  POSTIT_DIV.appendChild(span)
  POSTIT_DIV.appendChild(delBtn)
  const postitObj = {
    text: contents,
    id: POSTIT_ID
  }
  postits.push(postitObj)
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
    saveURL()
  }
  searchInput.value = ""
}

function init() {
  loadPostit()
  searchForm.addEventListener("submit", handleSubmit)
}
init()
