// // content.js
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//       // sendResponse(findAddress());
//         sendResponse("dfdsfdsdf");

//     }
// );

// alert("fdsafds");

var address=findAddress();
 // alert(address);


chrome.storage.local.set({'address_name': address}, function () {
   // alert(address);
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//  	test=["fdsddd"]

		sendResponse("hhhhhfdsafdsfdsa3333333h"); 
			// sendResponse(findAddress()); 
// return true;

		// return("fdsddd");
 return true;
});



function findAddress() {
  var long=0;
  var lat=0;
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
