
// initializing map

function initMap() {
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
  // defining the working object that is passed to the database upon saving
  let markers = {};

  // marker generating event listener on double click

  map.addListener('dblclick', function(event) {
    function addMarker(location) {
      let marker = new google.maps.Marker({
        position: location,
        map: map
        })

        marker.addListener('click', function() {
          let contentString = '<div>Hello World!</div>';
          let infoWindow = new google.maps.InfoWindow({
            content: contentString
          })
          infoWindow.open(map, marker);

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
  //



}

$(function() {
  initMap();
});
