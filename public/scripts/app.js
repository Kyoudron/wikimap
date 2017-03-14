$(() => {

  $.ajax({
    method: "GET",
    url: "/api/maps"
    })
    .done((maps) => {
    html = '';
    for (let map of maps) {
      html += createMapElement(map);
    }
    $('.map-list').html(html);
  });

$.ajax({
    method: "GET",
    url: "/api/profilemaps"
    })
    .done((maps) => {
    html = '';
    for(let map of maps) {
      html += profileMapElement(map);
    }
    $('.maprow').html(html);
  });

$.ajax({
    method: "GET",
    url: "/api/profilefav"
    })
    .done((maps) => {
    html = '';
    for(let map of maps) {
      html += faveMapElement(map);
    }
    $('.favrow').html(html);
  });

$.ajax({
    method: "GET",
    url: "/api/getmarkers"
    })
    .done((markers) => {
    html = '';
    markerMapElement(markers)
    $('.maplatlng').html(html);
  });



function markerMapElement(markers){
  console.log(markers)
    var mapOptions = {
      zoom: 12,
      center: {lat: 43.6532, lng: -79.3832},
      disableDoubleClickZoom: true
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    let infoWindow = new google.maps.InfoWindow({map: map
    });

    for (i =0; i < markers.length; i++) {
      let lat = markers[i].latitude;
      let lng = markers[i].longitude;
      let myLatLng = new google.maps.LatLng(lat, lng);

      (function() {
        var marker = new google.maps.Marker({
          position: myLatLng,
          map:map
        // title: markers[i].title;
        });

        marker.info = new google.maps.InfoWindow({
          content: ((markers[i].title).replace(/[^a-z]/gmi, " ").replace(/\s+/g, " "))
        });

        google.maps.event.addListener(marker, 'click', function() {
          marker.info.open(map, marker)
        });

      })();

      // marker.setMap(map);
    }


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
        $(".markerSubmit").click(() => userInfoWindow.close());
      })
    }
    addMarker(event.latLng);
  });
    let html = `<h3>${lat} ${lng}</h3>`
    return html;
}


// favorites
  function faveMapElement(map){
    let title = map.title;
    let id = map.id;

    let html = `<h3><a href="/maps/${id}">${title}</a></h3>`
    return html;
  }

//a href is going to be to the map/:id page

  function profileMapElement(map){
    let title = map.title;
    let id = map.id;

    let html = `<h3><a href="/maps/${id}">${title}</a></h3>`
    return html;
  }

//a href is going to be to the map/:id page

  function createMapElement(map){
    let title = map.title;
    let id = map.id

    let html = `<h3><a href="/maps/${id}">${title}</a></h3>`
    return html;
  }

})
