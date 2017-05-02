

var address=findAddress();

chrome.storage.local.set({'address_name': address}, function () {
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

		sendResponse("hhhhhfdsafdsfdsa3333333h"); 
 return true;
});



function findAddress() {
  var long=10;
  var lat=15;
  var node = document.head;
 

 for (var i = 1; i < node.children.length; ++i) {

 	if (node.children[i].getAttribute('property')=="airbedandbreakfast:location:longitude") {
 		console.log("long")
  		console.log(node.children[i].getAttribute('content'));
  		long=node.children[i].getAttribute('content');
   }

   if (node.children[i].getAttribute('property')=="airbedandbreakfast:location:latitude") {
  		console.log("lat")
  		console.log(node.children[i].getAttribute('content'));
  		lat=node.children[i].getAttribute('content')
   }

  }

  return([long,lat]);


};
