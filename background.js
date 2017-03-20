// Called when the user clicks on the browser action.

var address_list=[10,20];

// chrome.tabs.query({currentWindow: true, lastFocusedWindow: true}, function(tab) {

// chrome.browserAction.onClicked.addListener(function(tab) {
	
//   // Send a message to the active tab
//   chrome.tabs.query({currentWindow: true, lastFocusedWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.pageAction.show(activeTab.id);
//     chrome.tabs.sendMessage(activeTab.id, {}, function(address) {
//     // address_list.push(address);
//     address_list=address;
//     // address_list="fdsafds";
//     	});
//   });
// // });



// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//    chrome.pageAction.show(tabs[0].id);
//    ensureSendMessage(tabs[0].id, {greeting: "hello"});

// });

// function ensureSendMessage(tabId, message, callback){
	
//   chrome.tabs.sendMessage(tabId, {ping: true}, function(response){
//     if(response.pong) { // Content script ready
//              chrome.tabs.sendMessage(tabId, {}, function(address) {
//     // address_list.push(address);
//     // address_list=address;
//     address_list="fdsafds";
//     	});
//     } else { // No listener on the other end
//       chrome.tabs.executeScript(tabId, {file: "content_script.js"}, function(){
//         if(chrome.runtime.lastError) {
//           console.error(chrome.runtime.lastError);
//           throw Error("Unable to inject script into tab " + tabId);
//         }
//         // OK, now it's injected and ready
//         chrome.tabs.sendMessage(tabId, {}, function(address) {
//     // address_list.push(address);
//     // address_list=address;
//     address_list="fdsfdsfghhh";
//     	});
//       });
//     }
//   });
// }

var active_tab=null;
var test=[10,20];

chrome.tabs.query({currentWindow: true, lastFocusedWindow: true}, function(tabs){
     active_tab=tabs[0].url
  });

chrome.tabs.query({}, function(tabs) {



  for(var i in tabs) {
  	chrome.pageAction.show(tabs[i].id);
    // if (tabs[i].url=="https://www.airbnb.com/rooms/1012597") {
    	   if (tabs[i].url==active_tab) {

	// console.log("ddd");

    // Filter by url if needed; that would require "tabs" permission
    // Note that injection will simply fail for tabs that you don't have permissions for
    chrome.tabs.executeScript(tabs[i].id, {file: "content.js"}, function() {
       	// console.log("fdsafds");
       		chrome.storage.local.get('address_name', function (data) {
    address_list.push(data);
});
      // if (tabs[i].id==active_tab) {
    chrome.tabs.sendMessage(tabs[i].id, {}, function(address) {
    	// console.log("lll");
    	// console.log(tabs[i].id);
    	// 	console.log(test);
    	// console.log(address);
    // address_list.push(address);
    // address_list=address;
    // address_list="fdsfdsfghhh";
    	});
 


      // }
    });
  }
}
});
