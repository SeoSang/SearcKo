const searchForm = document.getElementById("searchForm"),
  searchInput = searchForm.querySelector("input")

function saveURL() {
  search_content = "https://www.google.com/search?q=" + search_input.value;
  if(search_contain.value)
    search_content = search_content + ' "' + search_contain.value + '"'
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

function appendHtml(el, str) {
  var div = document.createElement('div')
  div.innerHTML = str;
  
  while(div.childeren.length > 0) {
    el.appendChild(div.children[0])
  }
}

document.getElementById("search_input").onblur = function() {
  searchBasic = search_input.value;

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
  if(search_contain.value) {
    search_contain_input.value = search_contain.value

    // width 차후 수정
    // http://vnthf.logdown.com/posts/2016/05/18/front-input-box

    len = search_contain.value.length
    console.log(len)

    search_contain_input.size = len
    console.log(search_contain_input.size)

    search_contain_input.style.zIndex = 100;
//    alert(document.getElementById("search_contatin_input").style.zIndex)
  }
  else {
    search_contain_input.style.zIndex = 1;
  }
}

document.getElementById("search_except").onblur = function() {
  if(search_except.value) {
    search_except_input.value = search_except.value
//    search_except_input.size = search_except.value.length
    search_except_input.style.zIndex = 100;
  }
  else {
    search_except_input.style.zIndex = 1;
  }
}

document.getElementById("search_synonym").onblur = function() {
  if(search_synonym.value) {
    search_synonym_input.value = search_synonym.value
    search_synonym_input.size = search_synonym.value.length
    search_synonym_input.style.zIndex = 100;
  }
  else {
    search_synonym_input.style.zIndex = 1;
  }
}

document.getElementById("search_filetype").onblur = function() {
  if(search_filetype.value) {
    search_filetype_input.value = search_filetype.value
    search_filetype_input.size = search_filetype.value.length
    search_filetype_input.style.zIndex = 100;
  }
  else {
    search_filetype_input.style.zIndex = 1;
  }
}

document.getElementById("search_site").onblur = function() {
  if(search_site.value) {
    search_site_input.value = search_site.value
    search_site_input.size = search_site.value.length
    search_site_input.style.zIndex = 100;
  }
  else {
    search_site_input.style.zIndex = 1;
  }
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
