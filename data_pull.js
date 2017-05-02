// // parameters
// //-------------------------------------------------//
var maps_key = "ABQIAAAATfHumDbW3OmRByfquHd3SRTRERdeAiwZ9EeJWta3L_JZVS0bOBRQeZgr4K0xyVKzUdnnuFl8X9PX0w";
var maps_key_place = "AIzaSyBC2vfZJ2z373zbPf5-9rEwirwHXIwqGcQ"

// //----------------------------------------------------------------------------//
// //                                 Functions                                  //
// //----------------------------------------------------------------------------//

// // gclient_geocode
// //----------------------------------------------------------------------------//

Array.prototype.flatten = function() {
  return this.reduce(function(prev, cur) {
    var more = [].concat(cur).some(Array.isArray);
    return prev.concat(more ? cur.flatten() : cur);
  },[]);
};

function gclient_geocode(address, text_arg, address_geo) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            encodeURIComponent(address) + '&sensor=false';
  
  var request = new XMLHttpRequest();
 
  var latlng_temp=address_geo[1] + ',' + address_geo[0];
  var url_search= "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
  latlng_temp + "&radius=2000&keyword=gym&key=" + maps_key_place;

  var request_temp = new XMLHttpRequest();

  request_temp.open('GET', url_search, true);
  request.open('GET', url_search, true);
  request.onreadystatechange = function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        console.log(json);
        var latlng = json.results[0].geometry.location;
        latlng = latlng.lat + ',' + latlng.lng;
        latlng = address_geo[1] + ',' + address_geo[0];
        latlng_marker = json.results[1].geometry.location.lat + ',' + 
          json.results[1].geometry.location.lng;
        latlng_marker_2 = json.results[1].geometry.location.lat + ',' + 
          json.results[1].geometry.location.lng;
        var src = "https://maps.google.com/maps/api/staticmap?center=" + latlng + 
          "&zoom=12&size=512x512&maptype=roadmap&sensor=false&markers=color:green%7Clabel:HOME%7C"+ 
          latlng + "&markers=color:blue%7Clabel:Gym%7C"+ 
          latlng_marker + "&markers=color:blue%7Clabel:Gym%7C"+ latlng_marker_2 + "&key=" + maps_key;
        var map = document.getElementById("map");
        map.src = src;

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

// vars
var address=[];
var url=[];
var id=[];

// pull data
chrome.tabs.query({ highlighted: true, lastFocusedWindow: true }, function(tabs){
    
    for (var i=0 ; i < tabs.length; i++) {
      
      // id
      // console.log(tabs[i].id);
      id.push(tabs[i].id);
      // chrome.storage.local.set({'id': id}, function () {});
 
      // url
      // console.log(tabs[i].url);
      url.push(tabs[i].url);
      // chrome.storage.local.set({'url': url}, function () {});


      // address
      var j=tabs[i].id;
      chrome.tabs.executeScript(j, {file: 'content.js'},function() {
    
          chrome.storage.local.get('address_name', function (data) {
           var temp=[data.address_name[0],data.address_name[1] ]
              address.push(temp);
              // console.log(data.address_name);
              console.log(address["0"]);
              console.log(url["0"]);
              gclient_geocode(address, "tct", address["0"]);

          });
                  
      });

    }

})





