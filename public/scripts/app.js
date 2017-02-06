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
    for(let marker of markers) {
      html += markerMapElement(marker);
    }
    $('.maplatlng').html(html);
  });



function markerMapElement(marker){
    let lat = marker.latitude;
    let lng = marker.longitude;

    let html = `
                <h3>
                    ${lat} ${lng}
                </h3>
          `
    return html;
  }


  function faveMapElement(map){
    let title = map.title;
    let id = map.id;

    let html = `
                <h3>
                    <a href="/maps/${id}">${title}</a>
                </h3>
          `

    return html;
  }




//a href is going to be to the map/:id page

  function profileMapElement(map){
    let title = map.title;
    let id = map.id;

    let html = `
                <h3>
                    <a href="/maps/${id}">${title}</a>
                </h3>
          `

    return html;
  }

//a href is going to be to the map/:id page

  function createMapElement(map){
    let title = map.title;
    let id = map.id

    let html = `
                <h3>
                    <a href="/maps/${id}">${title}</a>
                </h3>
`

    return html;
  }

})
