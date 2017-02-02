// 
// const googleMapsClient = require('@google/maps').createClient({
//   key: 'AIzaSyD6q3h49p_htm4_dL0_HAJsBsoTCiXRTfk'
// });
//
//
// googleMapsClient.geocode({
//   address: '46 Spadina, Toronto, ON, Canada'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results[0].geometry.location);
//   }
// });
//
//
// //getting geolocation coordinates




// initializing map
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.latLng(43.6446249, -79.39519729999999),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  const infoWindow = new google.maps.InfoWindow({
    map: map
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('<b>You are here.</b>');
      map.setCenter(pos);

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

// defining the working object that is passed to the database upon saving
const markers = {};

// marker generating event listener on double click
map.addListener('dblclick', function(event) {
  addMarker(event.latLng);
});

// add marker to map and push to object - account for delete case figure

function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map

    // add in title, description image from customizable infoWindow

    })

    // click on marker displays infoWindow
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
  });

markers[JSON.stringify(location)] = marker;

}

let contentString = '<div>Hello World!</div>';

let infoWindow = new google.maps.InfoWindow({
  content: contentString;
});
