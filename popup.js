// //----------------------------------------------------------------------------//

// // Purpose:     Popup.js
// // Project:     Mapping chrome extension
// // Author:      Clara Marquardt
// // Date:        2017

// //----------------------------------------------------------------------------//

// //----------------------------------------------------------------------------//
// //                               Control Section                              //
// //----------------------------------------------------------------------------//

// // parameters
// //-------------------------------------------------//
var maps_key = "ABQIAAAATfHumDbW3OmRByfquHd3SRTRERdeAiwZ9EeJWta3L_JZVS0bOBRQeZgr4K0xyVKzUdnnuFl8X9PX0w";
var maps_key_place = "AIzaSyBC2vfZJ2z373zbPf5-9rEwirwHXIwqGcQ"

// //----------------------------------------------------------------------------//
// //                                 Functions                                  //
// //----------------------------------------------------------------------------//

// // gclient_geocode
// //----------------------------------------------------------------------------//

function gclient_geocode(address, text_arg, address_geo) {
  
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            encodeURIComponent(address) + '&sensor=false';
  
  var request = new XMLHttpRequest();
 
 var latlng_temp=address_geo[1] + ',' + address_geo[0];
 // console.log(latlng_temp);
  var url_search= "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
  latlng_temp + "&radius=2000&keyword=gym&key=" + maps_key_place;

 var request_temp = new XMLHttpRequest();

 request_temp.open('GET', url_search, true);
 // console.log(request_temp);



 // console.log(address_geo);
  request.open('GET', url_search, true);
  // console.log(url);
  request.onreadystatechange = function (e) {
    // console.log(request, e);
    if (request.readyState == 4) {
      if (request.status == 200) {
      	 // console.log(request.responseText);
        var json = JSON.parse(request.responseText);
        // console.log(json);


 for (var i = 1; i < json.results.length; ++i) {
// console.log(json.results[i].geometry.location)
}


        var latlng = json.results[0].geometry.location;
        latlng = latlng.lat + ',' + latlng.lng;
 // console.log(address_geo);
    	latlng = address_geo[1] + ',' + address_geo[0];
    	latlng_marker = json.results[1].geometry.location.lat + ',' + json.results[1].geometry.location.lng;
    	  latlng_marker_2 = json.results[2].geometry.location.lat + ',' + json.results[2].geometry.location.lng;

      console.log(latlng);
      console.log(latlng_marker);
      console.log(json.results[1].name);
      console.log(latlng_marker_2);
           console.log(json.results[2].name);
        var src = "https://maps.google.com/maps/api/staticmap?center=" + latlng + 
          "&zoom=12&size=512x512&maptype=roadmap&sensor=false&markers=color:green%7Clabel:HOME%7C"+ latlng + "&markers=color:blue%7Clabel:Gym%7C"+ 
          latlng_marker + "&markers=color:blue%7Clabel:Gym%7C"+ latlng_marker_2 + "&key=" + maps_key;
        var map = document.getElementById("map");
        map.src = src;

        // temp - subtext
        // var text=document.getElementById("test");
        // text.innerHTML=text_arg;

        map.addEventListener('click', function () {
          window.close();
        });
      } else {
        console.log('Unable to resolve address into lat/lng');
      }
    }
  };
  request.send(null);
}


// // map 
// //----------------------------------------------------------------------------//

function map() {
 
  // get and print current tab url
  var url = [];
  chrome.tabs.query({currentWindow: true, lastFocusedWindow: true}, function(tabs){
     console.log(tabs[0].url);
     // console.log(tabs[0].id);
     url.push(tabs[0].url)
  });

  // TEMP - test feedback from background js
  var address = chrome.extension.getBackgroundPage().address_list;
  // console.log(address[2].address_name);
  
  // TEMP - hardcode address
  var address_geo=address[2].address_name;
    var address ="rose street 5 02413 Somerville";

 // console.log(address_geo);
  // if address exists - geocode
   // if (address) gclient_geocode(address, url);

  if (address) gclient_geocode(address, url, address_geo);

}


//----------------------------------------------------------------------------//
//                                    Code                                    //
//----------------------------------------------------------------------------//

// execute function - onload

window.onload = map;


// //----------------------------------------------------------------------------//
// //                                    End                                     //
// //----------------------------------------------------------------------------//







