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

//a href is going to be to the map/:id page

  function profileMapElement(map){
    let title = map.title;

    let html = `
            <div class="col-md-4 portfolio-item">
                <a href="#">
                    <img class="img-responsive" src="http://placehold.it/700x400" alt="">
                </a>
                <h3>
                    <a href="maps/<%mapId%>">${title}</a>
                </h3>
                <p></p>
            </div>`

    return html;
  }

//a href is going to be to the map/:id page

  function createMapElement(map){
    let title = map.title;

    let html = `
            <div class="col-md-4 portfolio-item">
                <a href="#">
                    <img class="img-responsive" src="http://placehold.it/700x400" alt="">
                </a>
                <h3>
                    <a href="maps/<%mapId%>">${title}</a>
                </h3>
                <p></p>
            </div>`

    return html;
  }

})
