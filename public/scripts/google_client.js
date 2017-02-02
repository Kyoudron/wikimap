
// initializing map

const markers = {};

function initMap() {

  // defining the working object that is passed to the database upon saving

  let lighthouse = {lat: 43.6446249, lng: -79.39519729999999};
  let map = new google.maps.Map(document.getElementById('map'), {
    center: lighthouse,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  let infoWindow = new google.maps.InfoWindow({
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

  // marker generating event listener on double click

  map.addListener('dblclick', function(event) {
    function addMarker(location) {
      let marker = new google.maps.Marker({
        position: location,
        map: map
        })

// let newMarker = function(location)

        marker.addListener('click', function(event) {


          let userHTML = "<table>" +
                 "<tr><td>Title:</td> <td><input type='text' id='title'/> </td> </tr>" +
                 "<tr><td>Description:</td> <td><input type='text' id='description'/></td> </tr>" +
                 "<tr><td>Image:</td> <td><input type='file' id='image'/></td> </tr>" +
                 "<tr><td></td><td><input class='markerSubmit' type='button' value='Save & Close'/></td></tr>" + "</table>";
         let userInfoWindow = new google.maps.InfoWindow({
            content: userHTML
          })
          userInfoWindow.open(map, marker);

          $(".markerSubmit").click(() => saveData(location));
      })



    }
    addMarker(event.latLng);
  });

  // add marker to map and push to object - account for delete case figure


  // add in title, description image from customizable infoWindow




      // click on marker displays infoWindow

  //   markers[JSON.stringify(location)] = marker;
  //
  // }
  //
  //



}

function saveData(location) {
  let title = escape(document.getElementById('title').value);
  let description = escape(document.getElementById('description').value);
  let image = escape(document.getElementById('image').value);
  let latlng = location;
  markers[JSON.stringify(latlng)] = {markerTitle: title, markerDescription: description, markerImage: image, markerCoordinates: latlng.toJSON()};
}  //

$(function() {
  initMap();
});
