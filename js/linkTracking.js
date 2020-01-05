console.log("hello");

const candidateURL = document.querySelector("a");
const POSTIT_LS = "postits";

function init(){
  candidateURL.addEventListener("click", getURL);
}
init();

function getURL(event){
  const objectURL = event.target.href;
  console.log({objectURL});
//  localStorage.setitem(POSTIT_LS.)
}
