// $(document).ready(function(){
//
//     $('a[href^="https://"]').click(function(e){
//
//       console.log("SSS");
//     });
//
// });


chrome.tabs.query(object queryInfo, function callback)


$(function() {

 chrome.tabs.query({highlighted: true}, function(tabs) {
   var activeTab = tabs[0];
   chrome.tabs.sendMessage(activeTab.id, {"message": "fetch_top_domains"});
 });
});

chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
});
